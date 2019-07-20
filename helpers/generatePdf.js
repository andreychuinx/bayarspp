const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument();
function textInRowFirst(doc, text, heigth, test) {
  doc.y = heigth;
  doc.x = 30;
  doc.fillColor('black')
  doc.text(text, {
    paragraphGap: 5,
		indent: 5,
		continued: test,
    align: 'justify',
    columns: 1,
  });
  return doc
}


function row(doc, heigth) {
  doc.lineJoin('miter')
    .rect(30, heigth, 500, 70)
    .stroke()
  return doc
}
doc.pipe(fs.createWriteStream('output.pdf'));

// Embed a font, set the font size, and render some text

// Add an image, constrain it to a given size, and center it vertically and horizontally
doc.image('public/images/headerPDF.png', {
	fit: [400, 150	],
	align: 'center',
	valign: 'center'
});
doc.lineCap('butt')
	.moveTo(270, 40)
  .stroke()

row(doc, 215);
// row(doc, 110);
// row(doc, 130);
// row(doc, 150);
// row(doc, 170);
// row(doc, 190);
// row(doc, 210);

textInRowFirst(doc, `No. Bayar \u0009\u0009\u0009\u0009`, 220);
textInRowFirst(doc, `No. Bayar 							121239112093`, 240);
textInRowFirst(doc, `No. Bayar 							121239112093`, 260);
// textInRowFirst(doc, 'RUT', 120);
// textInRowFirst(doc, 'Dirección', 140);
// textInRowFirst(doc, 'Comuna', 160);
// textInRowFirst(doc, 'Ciudad', 180);
// textInRowFirst(doc, 'Telefono', 200);
// textInRowFirst(doc, 'e-mail', 220);

doc.text("test1", { continued: true });
doc.x += 50;
doc.text("Test2");
// Finalize PDF file
doc.end();

module.exports = {
	generate: (data) => {

		return 'bla'
	}
}