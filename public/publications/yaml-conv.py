#!/usr/bin/env python3
import bibtexparser
import yaml
from collections import defaultdict
import subprocess

# Load .bib file
with open("content/publications/publications.bib") as bibtex_file:
    bib_database = bibtexparser.load(bibtex_file)

grouped = defaultdict(list)

for entry in bib_database.entries:
    year = entry.get("year", "Unknown")

    # Build a cleaned copy for YAML (used by Hugo)
    clean_entry = entry.copy()

    # Extract fields we want to keep:
    pdf = entry.get("pdf")
    code = entry.get("code")
    abstract = entry.get("abstract")

    # Create RAW Bib without our added fields
    for field in ["pdf", "code", "abstract"]:
        clean_entry.pop(field, None)

    # Convert cleaned entry to raw BibTeX
    db = bibtexparser.bibdatabase.BibDatabase()
    db.entries = [clean_entry]
    raw = bibtexparser.dumps(db).strip()

    # Use pandoc formatting
    pandoc_proc = subprocess.run(
        ["pandoc", "--from=biblatex", "--to=html5"],
        input=raw,
        text=True,
        capture_output=True
    )
    raw_bib_html = f"<pre class='language-bibtex'>{pandoc_proc.stdout}</pre>"

    # Escape YAML-sensitive characters
    # raw = raw.replace(":", "\\:").replace("{", "\\{").replace("}", "\\}")

    # Add raw_bib + restore display-needed fields
    entry["pdf"] = pdf
    entry["code"] = code
    entry["abstract"] = abstract
    #entry["raw_bib"] = raw
    entry["raw_bib_html"] = raw_bib_html

    print("Pandoc error:", pandoc_proc.stderr)
    print("Input raw:", raw)


    grouped[year].append(entry)

# Convert to sorted YAML format
sorted_grouped = sorted(grouped.items(), key=lambda x: int(x[0]), reverse=True)
yaml_list = [{"year": int(year), "entries": entries} for year, entries in sorted_grouped]

# Save
with open("themes/blowfish/data/publications.yaml", "w") as out:
    yaml.dump(yaml_list, out, sort_keys=False, allow_unicode=True)
