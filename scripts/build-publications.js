const fs = require('node:fs/promises');
const path = require('node:path');
const { Cite } = require('@citation-js/core');
require('@citation-js/plugin-bibtex');
const bibtexParse = require('../assets/js/vendor/bibtexParse.js');

const BIB_URLS = [
  'https://raw.githubusercontent.com/atlas-brown/bib/main/atlas.bib'
];

const TYPE_LABELS = {
  article: 'Article',
  inproceedings: 'Conference',
  inbook: 'Book Chapter',
  book: 'Book',
  phdthesis: 'PhD Thesis',
  mastersthesis: 'Masters Thesis'
};

function first(value) {
  if (Array.isArray(value)) {
    return value[0] || '';
  }
  return value || '';
}

function clean(value) {
  return String(value || '').replace(/[{}]/g, '').replace(/\s+/g, ' ').trim();
}

function formatAuthors(authors) {
  if (!Array.isArray(authors) || authors.length === 0) {
    return '';
  }

  return authors
    .map((author) => [author.given, author.family].filter(Boolean).join(' ').trim())
    .filter(Boolean)
    .join(', ');
}

function parseTags(rawValue) {
  const value = Array.isArray(rawValue) ? rawValue.join(', ') : rawValue;
  const text = clean(value);
  if (!text) {
    return [];
  }

  const seen = new Set();
  const out = [];
  for (const keyword of text.split(/\s*[;,]\s*/).map(clean).filter(Boolean)) {
    const key = keyword.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(keyword);
    }
  }

  return out;
}

function getYear(item, rawTags) {
  const cslYear = item.issued && item.issued['date-parts'] && item.issued['date-parts'][0] && item.issued['date-parts'][0][0];
  if (cslYear) {
    return Number.parseInt(cslYear, 10) || 0;
  }

  return Number.parseInt(clean(rawTags.year), 10) || 0;
}

function typeInfo(rawType, cslType, rawTags) {
  const raw = String(rawType || '').toLowerCase();
  if (raw) {
    if (raw === 'misc') {
      return { key: 'misc', label: 'Misc' };
    }
    return { key: raw, label: TYPE_LABELS[raw] || raw };
  }

  if (cslType === 'paper-conference') return { key: 'inproceedings', label: TYPE_LABELS.inproceedings };
  if (cslType === 'article-journal') return { key: 'article', label: TYPE_LABELS.article };
  if (cslType === 'chapter') return { key: 'inbook', label: TYPE_LABELS.inbook };
  if (cslType === 'book') return { key: 'book', label: TYPE_LABELS.book };

  if (cslType === 'thesis') {
    const genre = clean(rawTags.type || rawTags.document_type || rawTags.genre).toLowerCase();
    if (genre.includes('phd')) return { key: 'phdthesis', label: TYPE_LABELS.phdthesis };
    return { key: 'mastersthesis', label: TYPE_LABELS.mastersthesis };
  }

  return { key: 'misc', label: 'Misc' };
}

function toBibtex(rawEntry, fallbackId) {
  const entryType = clean(rawEntry.entryType || 'misc').toLowerCase() || 'misc';
  const citationKey = clean(rawEntry.citationKey || fallbackId || 'entry');
  const tags = rawEntry.entryTags || {};

  const lines = Object.entries(tags)
    .filter(([, value]) => String(value || '').trim() !== '')
    .map(([key, value]) => `  ${key} = {${String(value).trim()}}`);

  if (lines.length === 0) {
    return `@${entryType}{${citationKey}\n}`;
  }

  return `@${entryType}{${citationKey},\n${lines.join(',\n')}\n}`;
}

async function fetchBib(url) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
  }
  return response.text();
}

function parseSource(bibText) {
  const cslItems = new Cite(bibText).data;
  const rawItems = bibtexParse.toJSON(bibText);
  const rawById = new Map(rawItems.map((entry) => [entry.citationKey, entry]));

  return cslItems.map((item, index) => {
    const id = item.id || item['citation-key'] || `entry-${index}`;
    const raw = rawById.get(id) || {};
    const rawTags = raw.entryTags || {};
    const info = typeInfo(raw.entryType, item.type, rawTags);

    const doi = clean(item.DOI || rawTags.doi).replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '');
    const url = clean(item.URL || rawTags.url) || (doi ? `https://doi.org/${doi}` : '');
    const year = getYear(item, rawTags);

    return {
      id,
      year,
      type: info.key,
      type_label: info.label,
      title: clean(item.title || rawTags.title) || 'Untitled',
      authors: clean(formatAuthors(item.author)) || clean(rawTags.author).replace(/\s+and\s+/gi, ', '),
      venue: clean(first(item['container-title']) || first(item['collection-title']) || rawTags.booktitle || rawTags.journal || rawTags.school || rawTags.publisher),
      abstract: clean(item.abstract || rawTags.abstract),
      thesis_type: clean(rawTags.type),
      school: clean(rawTags.school || rawTags.institution),
      tags: parseTags(rawTags.tags),
      pdf: clean(rawTags.pdf),
      code: clean(rawTags.code || rawTags.artifact),
      doi,
      url,
      bibtex: toBibtex(raw, id)
    };
  });
}

async function main() {
  const sources = await Promise.all(BIB_URLS.map(fetchBib));

  const dedup = new Map();
  for (const sourceText of sources) {
    const parsed = parseSource(sourceText);
    for (const entry of parsed) {
      if (!entry.year || entry.type === 'misc') {
        continue;
      }

      const key = `${entry.id}|${entry.year}`;
      if (!dedup.has(key)) {
        dedup.set(key, entry);
      }
    }
  }

  const entries = [...dedup.values()].sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }
    return a.title.localeCompare(b.title);
  });

  const output = {
    generated_at: new Date().toISOString(),
    sources: BIB_URLS,
    entries
  };

  const outPath = path.join(__dirname, '..', 'data', 'publications_generated.json');
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

  console.log(`Wrote ${entries.length} publications to ${outPath}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
