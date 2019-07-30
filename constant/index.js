module.exports = {
	title: 'Pembayaran Management',
	bulanName: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
	getMonth: new Date().getMonth(),
	getYear: new Date().getFullYear(),
	typeTransaksi: ['SPP', 'Praktek'],
	spp: 125000,
	praktek: 100000,
	findDiff: (arr, arr2) => {
		var ret = [];
		for (let i = 0; i < arr.length; i++) {
			if (arr2.indexOf(arr[i]) === -1) {
				ret.push(arr[i])
			}
		}
		return ret;
	},
	templatePenerimaanKas: (data) => {
		return `<!DOCTYPE html>
	<html lang="en">
	
	<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<meta http-equiv="X-UA-Compatible" content="ie=edge">
			<title>Document</title>
	</head>
	
	<body>
			<div>
					<h1>
							<center>Laporan Jurnal ${data.tgl_export_penerimaan}</center>
					</h1>
			</div>
			<table>
					<tr>
							<td colspan="2">
									<h4>Penerimaan Pembayaran</h4>
							</td>
					</tr>
					<tr>
							<td>Kas</td>
							<td>${data.penerimaan_pembayaran.kas}</td>
					</tr>
					<tr>
							<td>Pendapatan</td>
							<td>${data.penerimaan_pembayaran.pendapatan}</td>
					</tr>
					<tr>
							<td>
									<h4>Pada saat Pembayaran Menunggak</h4>
							</td>
					</tr>
					<tr>
							<td>Piutang</td>
							<td>${data.pembayaran_menunggak.piutang}</td>
					</tr>
					<tr>
							<td>Pendapatan</td>
							<td>${data.pembayaran_menunggak.pendapatan}</td>
					</tr>
					<tr>
							<td colspan="2">
									<h4>Pada saat Penerimaan pembayaran menunggak</h4>
							</td>
					</tr>
					<tr>
							<td>Kas</td>
							<td>${data.penerimaan_pembayaran_menunggak.kas}</td>
					</tr>
					<tr>
							<td>Piutang</td>
							<td>${data.penerimaan_pembayaran_menunggak.piutang}</td>
					</tr>
			</table>
	</body>
	
	</html>`},
	templateKwitansi: (data) => {
		return `<!DOCTYPE html>
		<html lang="en">
		
		<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				<title>Document</title>
				<style>
						img {
								display: block;
								margin-left: auto;
								margin-right: auto;
						}
		
						table {
								border: 3px solid #000000;
								background-color: aquamarine;
								width: 100%;
						}
		
						.left {
								width: 30%;
						}
				</style>
		</head>
		
		<body>
				<div>
						<h1>
								<img src="http://localhost:3000/public/images/headerPDF.jpg" />
						</h1>
				</div>
				<table>
						<tr>
								<td class="left">No. Bayar</td>
								<td>: ${data.id}</td>
						</tr>
						<tr>
								<td class="left">Tanggal Pembayaran</td>
								<td>: ${data.tgl_bayar && new Date(data.tgl_bayar).toLocaleDateString()}</td>
						</tr>
						<tr>
								<td class="left">Keterangan</td>
								<td>: Pembayaran ${data.type_transaksi} Bulan ${data.bayar_bulan} Tahun ${data.bayar_tahun}</td>
						</tr>
				</table>
				<br />
				<br />
				<table>
						<tr>
								<td class="left">NIS</td>
								<td>: ${data.dataValues.Siswa.dataValues.nis}</td>
						</tr>
						<tr>
								<td class="left">Nama</td>
								<td>: ${data.dataValues.Siswa.dataValues.nama}</td>
						</tr>
						<tr>
								<td class="left">Jurusan</td>
								<td>: ${data.dataValues.Siswa.dataValues.jurusan}</td>
						</tr>
						<tr>
								<td class="left">Kelas</td>
								<td>: ${data.dataValues.Siswa.dataValues.kelas}</td>
						</tr>
						<tr>
								<td class="left">Total Pembayaran</td>
								<td>: ${data.jumlah}</td>
						</tr>
				</table>
		</body>
		
		</html>`
	}
}