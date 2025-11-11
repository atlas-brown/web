#!/usr/bin/env python3

import bibtexparser
import yaml
from collections import defaultdict
from pygments import highlight
from pygments.lexers import BibTeXLexer
from pygments.formatters import HtmlFormatter

# Load .bib file
with open("content/publications/publications.bib") as bibtex_file:
    bib_database = bibtexparser.load(bibtex_file)

grouped = defaultdict(list)

for entry in bib_database.entries:
    year = entry.get("year", "Unknown")

    # Save original optional fields
    pdf = entry.get("pdf")
    code = entry.get("code")
    abstract = entry.get("abstract")

    # Clean entry for export (exclude optional fields)
    clean_entry = {k: v for k, v in entry.items() if k not in ["pdf", "code", "abstract"]}

    # Convert clean entry back to BibTeX string
    db = bibtexparser.bibdatabase.BibDatabase()
    db.entries = [clean_entry]
    raw_bib = bibtexparser.dumps(db).strip()

    # Use Pygments to create HTML with syntax highlighting
    raw_bib_html = highlight(raw_bib, 
                             BibTeXLexer(), 
                             HtmlFormatter(cssclass="language-bibtex", linenos=False, style="emacs")
                            )

    # Restore optional fields and add HTML version
    entry["pdf"] = pdf
    entry["code"] = code
    entry["abstract"] = abstract
    entry["raw_bib_html"] = raw_bib_html

    grouped[year].append(entry)

# Sort by year descending + write YAML
sorted_grouped = sorted(grouped.items(), key=lambda x: int(x[0]), reverse=True)
yaml_list = [{"year": int(year), "entries": entries} for year, entries in sorted_grouped]

with open("themes/blowfish/data/publications.yaml", "w") as out:
    yaml.dump(yaml_list, out, sort_keys=False, allow_unicode=True)
