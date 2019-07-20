var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');

var fs = require('fs');
var path = require('path');

//Load the docx file as a binary
const writeData = (data) => {
	var content = fs
		.readFileSync(path.resolve(__dirname, 'templates_kwitansi_pembayara.docx'), 'binary');

	var zip = new JSZip(content);

	var doc = new Docxtemplater();
	doc.loadZip(zip);

	//set the templateVariables
	doc.setData({
		no_bayar: data.no_bayar,
		tgl_bayar: data.tgl_bayar,
		keterangan: data.keterangan,
		nis: data.nis,
		nama: data.nama,
		jurusan: data.jurusan,
		kelas: data.kelas
	});

	try {
		// render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
		doc.render()
	}
	catch (error) {
		var e = {
			message: error.message,
			name: error.name,
			stack: error.stack,
			properties: error.properties,
		}
		console.log(JSON.stringify({ error: e }));
		// The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
		throw error;
	}

	var buf = doc.getZip()
		.generate({ type: 'nodebuffer' });

	// buf is a nodejs buffer, you can either write it to a file or do anything else with it.
	fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);

}

module.exports = {
	writeData
}