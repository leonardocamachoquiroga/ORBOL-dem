from pathlib import Path
import sys
import pypdfium2 as pdfium
from pypdf import PdfReader

pdf_path=Path(sys.argv[1]);out=Path(sys.argv[2])
pdf=pdfium.PdfDocument(str(pdf_path))
for i,page in enumerate(pdf):
    image=page.render(scale=1.6).to_pil()
    image.save(out/f'page-{i+1}.png')
reader=PdfReader(pdf_path)
for i,page in enumerate(reader.pages):
    text=page.extract_text()
    lines=[line.strip() for line in text.splitlines() if line.strip()]
    print(i+1, ' | '.join(lines[:3]), '...', ' | '.join(lines[-4:]))
print('Páginas renderizadas:',len(pdf))
