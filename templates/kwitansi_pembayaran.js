var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');
const word2pdf = require('word2pdf');

var fs = require('fs');
var path = require('path');

//Load the docx file as a binary
const writeData = async (data) => {
	var content = fs
		.readFileSync(path.resolve(__dirname, 'templates_kwitansi_pembayaran.docx'), 'binary');

	var zip = new JSZip(content);

	var doc = new Docxtemplater();
	doc.loadZip(zip);

	//set the templateVariables
	doc.setData({
		no_bayar: data.id,
		tgl_bayar: data.tgl_bayar && new Date(data.tgl_bayar).toISOString().slice(0, 10),
		keterangan: `Pembayaran ${data.type_transaksi} Bulan ${data.bayar_bulan} Tahun ${data.bayar_tahun}`,
		nis: data.dataValues.Siswa.dataValues.nis,
		nama: data.dataValues.Siswa.dataValues.nama,
		jurusan: data.dataValues.Siswa.dataValues.jurusan,
		kelas: data.dataValues.Siswa.dataValues.kelas,
		jumlah: data.jumlah
	});

	try {
		// render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
		doc.render()

		var buf = doc.getZip()
			.generate({ type: 'nodebuffer' });
		fs.writeFileSync(`kwitansi_pembayaran_${data.id}.docx`, buf)
		const buffWord = await word2pdf(`kwitansi_pembayaran_${data.id}.docx`)
		fs.writeFileSync(`public/kwitansi_pembayaran_${data.id}.pdf`, buffWord);

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

	// buf is a nodejs buffer, you can either write it to a file or do anything else with it.
	// fs.writeFile(path.resolve(__dirname, `kwitansi_pembayaran_${data.id}.docx`), buf, (err) => {
	// 	convert(`views/data/kwitansi_pembayaran_${data.id}.docx`, data.id)




}

const convert = async (docx, id) => {
	try {
		const data = await word2pdf(docx)
		fs.writeFileSync(`templates/kwitansi_pembayaran_${id}.docx`, data);
	} catch (err) {
		console.log(err)
	}

}

module.exports = {
	writeData
}