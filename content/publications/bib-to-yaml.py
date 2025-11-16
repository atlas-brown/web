#!/usr/bin/env python3
import bibtexparser
import yaml
from collections import defaultdict

# Load your .bib file
with open("content/publications/publications.bib") as bibtex_file:
    bib_database = bibtexparser.load(bibtex_file)

# Group entries by year
grouped = defaultdict(list)
for entry in bib_database.entries:
    year = entry.get('year', 'Unknown')
    grouped[year].append(entry)

# Sort years descending and convert to a list
sorted_grouped = sorted(grouped.items(), key=lambda x: int(x[0]), reverse=True)

# Build list-of-dicts structure
yaml_list = []
for year, entries in sorted_grouped:
    yaml_list.append({
        "year": int(year),
        "entries": entries
    })

# Write to data/publications.yaml
with open("themes/blowfish/data/publications.yaml", "w") as out_file:
    yaml.dump(yaml_list, out_file, sort_keys=False)
