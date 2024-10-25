import fitz
import easyocr

doc = fitz.open('Abbott St Jude Pacer.pdf')
zoom = 4
mat = fitz.Matrix(zoom, zoom)
count = 0

for p in doc:
    count += 1
for i in range(count):
    val = f"image_{i+1}.png"
    page = doc.load_page(i)
    pix = page.get_pixmap(matrix=mat)
    pix.save(val)
doc.close()

