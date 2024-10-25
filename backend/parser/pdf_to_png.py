import fitz
import easyocr
import sys

# file_name = "BosSci CRTD.pdf"
file_name = sys.argv[1]
doc = fitz.open(file_name)
zoom = 4
mat = fitz.Matrix(zoom, zoom)
count = 0

for p in doc:
    count += 1
for i in range(count):
    val = f"/temp/image_{i+1}.png"
    page = doc.load_page(i)
    pix = page.get_pixmap(matrix=mat)
    pix.save(val)
doc.close()