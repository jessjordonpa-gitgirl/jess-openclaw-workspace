#!/bin/bash
DATE=$(date +%Y-%m-%d)
HTML="workspace/daily-jobs-${DATE}.html"
PDF="workspace/daily-jobs-${DATE}.pdf"
if command -v weasyprint; then
  weasyprint "${HTML}" "${PDF}"
elif command -v pandoc; then
  pandoc "${HTML}" -o "${PDF}" --pdf-engine=wkhtmltopdf -V geometry:margin=0.75in --standalone || pandoc "${HTML}" -o "${PDF}" --to pdf
else
  echo "No PDF tool; fallback needed"
fi
echo "PDF: ${PDF}"