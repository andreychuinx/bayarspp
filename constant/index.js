module.exports = {
	title: 'Pembayaran Management',
	bulanName: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
	getMonth: new Date().getMonth(),
	getYear: new Date().getFullYear(),
	typeTransaksi: ['SPP', 'Praktek'],
	spp: 150000,
	praktek: 100000,
	findDiff: (arr, arr2) => {
		var ret = [];
    for(var i in arr) {   
        if(arr2.indexOf(arr[i]) === -1){
            ret.push(arr[i]);
        }
    }
    return ret;
	}
}