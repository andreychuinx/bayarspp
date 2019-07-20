const word2pdf = require('word2pdf');
const fs = require('fs');
 
const convert = async () => {
	try {
		const data = await word2pdf('templates/kwitansi_pembayaran_18.docx')
    fs.writeFileSync('test.pdf', data);
	} catch(err) {
		console.log(err)
	}
		
}

convert()