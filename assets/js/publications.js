const q = (s) => document.querySelector(s);
const qa = (s, root = document) => [...root.querySelectorAll(s)];

const TYPE_LABELS = {
  article: 'Journal article',
  inproceedings: 'Conference paper',
  inbook: 'Book chapter',
  book: 'Book',
  phdthesis: 'Ph.D. dissertation',
  mastersthesis: 'Sc.M./B.Sc./M.Eng. thesis',
  preprint: 'Pre-print',
  techreport: 'Technical report',
};

function typeLabel(type) {
  return TYPE_LABELS[type];
}

function renderFilters() {
  const app = q('#publicationsApp');
  const typeFilters = q('#typeFilters');
  const tagFilters = q('#tagFilters');
  const yearFilters = q('#yearFilters');
  const pubs = qa('.pub');

  const types = [...new Set(pubs.map((pub) => pub.dataset.type))].sort();
  const tagMap = new Map();
  pubs.forEach((pub) => {
    String(pub.dataset.tags || '')
      .split('||')
      .map((tag) => tag.trim())
      .filter(Boolean)
      .forEach((tag) => {
        const key = tag.toLowerCase();
        if (!tagMap.has(key)) {
          tagMap.set(key, tag);
        }
      });
  });
  const tags = [...tagMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  const years = [...new Set(pubs.map((pub) => Number.parseInt(pub.dataset.year, 10)).filter(Boolean))].sort((a, b) => b - a);

  const anchorYear = Math.max(new Date().getFullYear(), years[0] || new Date().getFullYear());
  const recentYears = Array.from({ length: 5 }, (_, i) => anchorYear - i);
  const olderCutoff = anchorYear - 5;

  if (app) {
    app.dataset.yearCutoff = String(olderCutoff);
  }

  typeFilters.innerHTML = types
    .map((type) => `<label class="pill cursor-pointer filter-type" data-value="${type}"><span>${typeLabel(type)}</span><span class="pill-x hidden">X</span></label>`)
    .join('');

  tagFilters.innerHTML = tags
    .map(([key, label]) => `<label class="pill cursor-pointer filter-tag" data-value="${key}"><span>${label}</span><span class="pill-x hidden">X</span></label>`)
    .join('');

  yearFilters.innerHTML = recentYears
    .map((year) => `<label class="pill cursor-pointer filter-year" data-value="${year}"><span>${year}</span><span class="pill-x hidden">X</span></label>`)
    .concat(`<label class="pill cursor-pointer filter-year" data-value="older"><span>${olderCutoff} and earlier</span><span class="pill-x hidden">X</span></label>`)
    .join('');
}

function applyFilters() {
  const yearCutoff = Number.parseInt(q('#publicationsApp')?.dataset.yearCutoff || '0', 10);
  const search = String(q('#pubSearch')?.value || '').trim().toLowerCase();
  const selectedTypes = new Set(qa('.filter-type.selected').map((el) => el.dataset.value));
  const selectedTags = new Set(qa('.filter-tag.selected').map((el) => el.dataset.value));
  const selectedYears = new Set(qa('.filter-year.selected').map((el) => el.dataset.value));

  let found = false;

  qa('.year-block').forEach((yearBlock) => {
    let visibleInYear = 0;

    qa('.pub', yearBlock).forEach((pub) => {
      const pubYear = Number.parseInt(pub.dataset.year || '0', 10);
      const pubTags = String(pub.dataset.tags || '')
        .split('||')
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean);
      const yearMatch =
        selectedYears.size === 0 ||
        selectedYears.has(pub.dataset.year) ||
        (selectedYears.has('older') && pubYear <= yearCutoff);
      const tagMatch =
        selectedTags.size === 0 ||
        pubTags.some((tag) => selectedTags.has(tag));

      const visible =
        (selectedTypes.size === 0 || selectedTypes.has(pub.dataset.type)) &&
        tagMatch &&
        yearMatch &&
        (!search || (pub.dataset.search || '').includes(search));

      pub.style.display = visible ? '' : 'none';
      if (visible) {
        visibleInYear += 1;
        found = true;
      }
    });

    yearBlock.style.display = visibleInYear ? '' : 'none';
  });

  q('#pubNoResults')?.classList.toggle('hidden', found);
}

document.addEventListener('DOMContentLoaded', () => {
  const app = q('#publicationsApp');
  if (!app) {
    return;
  }

  renderFilters();
  applyFilters();

  q('#pubSearch')?.addEventListener('input', applyFilters);

  app.addEventListener('click', (event) => {
    const abstractButton = event.target.closest('[data-abs-id]');
    if (abstractButton) {
      q(`#${abstractButton.dataset.absId}`)?.classList.toggle('hidden');
      return;
    }

    const bibButton = event.target.closest('[data-bib-id]');
    if (bibButton) {
      event.preventDefault();
      q(`#${bibButton.dataset.bibId}`)?.classList.toggle('hidden');
      return;
    }

    const pill = event.target.closest('.pill');
    if (!pill) {
      return;
    }

    pill.classList.toggle('selected');
    pill.querySelector('.pill-x')?.classList.toggle('hidden');
    applyFilters();
  });
});
