
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Addlapangan() {
    let router = useRouter()
    const { namaVenue,
        namaLapangan,
        deskripsi,
        gambar,
        jadwalPagi,
        jadwalMalam,
        hargaPagi,
        hargaMalam } = router.query
    const [_namaVenue, setNamaVenue] = useState('');
    const [_namaLapangan, setNamaLapangan] = useState('');
    const [_deskripsi, setDeskripsi] = useState('');
    const [_jadwalPagi, setJadwalPagi] = useState({});
    const [_jadwalMalam, setJadwalMalam] = useState({});
    const [jadwalTampilan, setJadwalTampilan] = useState([]);
    const [hargaTampilan, setHargaTampilan] = useState([]);
    const [_hargaPagi, setHargaPagi] = useState(hargaPagi);
    const [_hargaMalam, setHargaMalam] = useState(hargaMalam);
    const [updating, setUpdating] = useState(false);
    const [_gambar, setGambar] = useState('');
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');




    useEffect(() => {
        if (typeof namaVenue == 'string') {
            setNamaVenue(namaVenue)

        }
        if (typeof namaLapangan == 'string') {
            setNamaLapangan(namaLapangan)
        }
        if (typeof deskripsi == 'string') {
            setDeskripsi(deskripsi)
        }
        if (typeof gambar == 'string') {
            setGambar(gambar)
        }
        if (typeof jadwalPagi == 'string') {
            setJadwalPagi(Object.assign(_jadwalPagi, JSON.parse(jadwalPagi)))
        }
        if (typeof jadwalMalam == 'string') {
            setJadwalMalam(Object.assign(_jadwalMalam, JSON.parse(jadwalMalam)))
        }
        lihatJadwalOtomatis()
        console.log(_jadwalMalam)
    }, [namaVenue,
        namaLapangan,
        deskripsi,
        gambar,
        jadwalPagi,
        jadwalMalam,
        hargaPagi,
        hargaMalam])

    const handlePost = async (e) => {
        e.preventDefault();
        // reset error and message
        setError('');
        setMessage('');
        // fields check
        try {
            // Update post
            await fetch('/api/lapangandb', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    namaVenue: namaVenue,
                    namaLapangan: _namaLapangan,
                    namaLapanganOld: namaLapangan,
                    deskripsi: _deskripsi,
                    gambar: _gambar,
                    jadwalPagi: _jadwalPagi,
                    jadwalMalam: _jadwalMalam,
                    hargaPagi: _hargaPagi,
                    hargaMalam: _hargaMalam
                }),
            });
            // reload the page
            alert('Data sukses diupdate')
            return router.push('/mitra/home');
        } catch (error) {
            // Stop publishing state
            console.log('Not Working')
            return setUpdating(false);
        }



    };
    const bagiJamPagi = () => {
        let pagiMulai = parseInt(document.getElementById('jamPagiMulai').value);
        let pagiAkhir = parseInt(document.getElementById('jamPagiAkhir').value);
        let selisih = pagiAkhir - pagiMulai
        console.log(`Initial value: ${pagiMulai}`)
        if (Object.keys(jadwalPagi).length > 0) {
            for (let key in _jadwalPagi) {
                delete _jadwalPagi[key]
            }
            for (let i = 0; i < selisih; i++) {
                if (pagiMulai < 10 && (pagiMulai + 1) >= 10) {
                    setJadwalPagi(Object.assign(_jadwalPagi, { [`0${pagiMulai}.00-${pagiMulai + 1}.00`]: 'kosong' }))
                } else if (pagiMulai < 10 && (pagiMulai + 1) < 10) {
                    setJadwalPagi(Object.assign(_jadwalPagi, { [`0${pagiMulai}.00-0${pagiMulai + 1}.00`]: 'kosong' }))
                } else {
                    setJadwalPagi(Object.assign(_jadwalPagi, { [`${pagiMulai}.00-${pagiMulai + 1}.00`]: 'kosong' }))
                }
                pagiMulai = pagiMulai + 1
            }
        } else {
            for (let i = 0; i < selisih; i++) {
                if (pagiMulai < 10 && (pagiMulai + 1) >= 10) {
                    setJadwalPagi(Object.assign(_jadwalPagi, { [`0${pagiMulai}.00-${pagiMulai + 1}.00`]: 'kosong' }))
                } else if (pagiMulai < 10 && (pagiMulai + 1) < 10) {
                    setJadwalPagi(Object.assign(_jadwalPagi, { [`0${pagiMulai}.00-0${pagiMulai + 1}.00`]: 'kosong' }))
                } else {
                    setJadwalPagi(Object.assign(_jadwalPagi, { [`${pagiMulai}.00-${pagiMulai + 1}.00`]: 'kosong' }))
                }
                pagiMulai = pagiMulai + 1
            }
        }

        console.log('Jadwal Pagi Update:')
        console.log(pagiMulai)
        console.log(_jadwalPagi)
        return selisih
    }

    const bagiJamMalam = () => {
        let malamMulai = parseInt(document.getElementById('jamMalamMulai').value);
        let malamAkhir = parseInt(document.getElementById('jamMalamAkhir').value);
        let selisih = malamAkhir - malamMulai
        if (Object.keys(_jadwalMalam).length > 0) {
            for (let key in _jadwalMalam) {
                delete _jadwalMalam[key]
            }
            for (let i = 0; i < selisih; i++) {
                if (malamMulai < 10 && (malamMulai + 1) >= 10) {
                    setJadwalMalam(Object.assign(_jadwalMalam, { [`0${malamMulai}.00-${malamMulai + 1}.00`]: 'kosong' }))
                } else if (malamMulai < 10 && (malamMulai + 1) < 10) {
                    setJadwalMalam(Object.assign(_jadwalMalam, { [`0${malamMulai}.00-0${malamMulai + 1}.00`]: 'kosong' }))
                } else {
                    setJadwalMalam(Object.assign(_jadwalMalam, { [`${malamMulai}.00-${malamMulai + 1}.00`]: 'kosong' }))
                }
                malamMulai = malamMulai + 1
            }
        } else {
            for (let i = 0; i < selisih; i++) {
                if (malamMulai < 10 && (malamMulai + 1) >= 10) {
                    setJadwalMalam(Object.assign(_jadwalMalam, { [`0${malamMulai}.00-${malamMulai + 1}.00`]: 'kosong' }))
                } else if (malamMulai < 10 && (malamMulai + 1) < 10) {
                    setJadwalMalam(Object.assign(_jadwalMalam, { [`0${malamMulai}.00-0${malamMulai + 1}.00`]: 'kosong' }))
                } else {
                    setJadwalMalam(Object.assign(_jadwalMalam, { [`${malamMulai}.00-${malamMulai + 1}.00`]: 'kosong' }))
                }
                malamMulai = malamMulai + 1
            }
        }

        console.log('Jadwal Malam Update:')
        console.log(malamMulai)
        console.log(_jadwalMalam)
        return selisih
    }

    const gabungJadwal = () => {
        let keyJadwalPagi = Object.keys(_jadwalPagi)
        let keyJadwalMalam = Object.keys(_jadwalMalam)
        let gabunganJadwal = keyJadwalPagi.concat(keyJadwalMalam)
        return gabunganJadwal
    }

    const gabungHarga = () => {
        let gabunganHarga = []

        //Pagi
        let pagiMulai = parseInt(document.getElementById('jamPagiMulai').value);
        let pagiAkhir = parseInt(document.getElementById('jamPagiAkhir').value);
        let selisihPagi = pagiAkhir - pagiMulai
        for (let i = 0; i < selisihPagi; i++) {
            gabunganHarga.push(_hargaPagi)
        }

        //Malam
        let malamMulai = parseInt(document.getElementById('jamMalamMulai').value);
        let malamAkhir = parseInt(document.getElementById('jamMalamAkhir').value);
        let selisihMalam = malamAkhir - malamMulai
        for (let i = 0; i < selisihMalam; i++) {
            gabunganHarga.push(_hargaMalam)
        }

        return gabunganHarga
    }

    const gabungHargaOtomatis = () => {
        let gabunganHarga = []
        let keyJadwalPagi = Object.keys(_jadwalPagi)
        let keyJadwalMalam = Object.keys(_jadwalMalam)
        //Pagi
        for (let i = 0; i < keyJadwalPagi.length; i++) {
            gabunganHarga.push(_hargaPagi)
        }

        //Malam
        for (let i = 0; i < keyJadwalMalam.length; i++) {
            gabunganHarga.push(_hargaMalam)
        }
        console.log('Harga On Load')
        console.log(_hargaPagi);
        console.log(_hargaMalam)
        return gabunganHarga
    }

    const lihatJadwal = () => {

        bagiJamPagi()
        bagiJamMalam()
        let gabunganJadwal = gabungJadwal()
        let gabunganHarga = gabungHarga()
        setJadwalTampilan(gabunganJadwal)
        setHargaTampilan(gabunganHarga)

        // console.log('Jadwal Gabung')
        // console.log(gabunganJadwal)
        // console.log('Harga Gabung')
        // console.log(gabunganHarga)

    }

    const lihatJadwalOtomatis = () => {

        let gabunganJadwal = gabungJadwal()
        let gabunganHarga = gabungHargaOtomatis()

        setJadwalTampilan(gabunganJadwal)
        setHargaTampilan(gabunganHarga)
        console.log(hargaTampilan)
        console.log('Gabungan Harga:')
        console.log(gabunganHarga)
        // console.log('Jadwal Gabung')
        // console.log(gabunganJadwal)
        // console.log('Harga Gabung')
        // console.log(gabunganHarga)

    }

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            var x = document.getElementById("image");
            const i = event.target.files[0];
            setGambar(i.name)
            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };
    const uploadToServer = async (event) => {
        const body = new FormData();
        //console.log("file", image)
        body.append("file", image);
        const response = await fetch("/api/upload", {
            method: "POST",
            body
        });
    };

    return (
        <div className="container-xxl mx-auto p-4 header-2-2">
            <h1 style={{ color: 'black' }}>Update Lapangan</h1>

            <div >
                <form className='' onSubmit={handlePost}>
                    {error ? (
                        <div >
                            <h3 >{error}</h3>
                        </div>
                    ) : null}
                    {message ? (
                        <div >
                            <h3 >{message}</h3>
                        </div>
                    ) : null}
                    <div className="col-md-12">
                        <label className="labels">Nama Lapangan</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                        <input type="text" className="form-control"
                            name="namaLapangan"
                            value={_namaLapangan}
                            onChange={(e) => setNamaLapangan(e.target.value)}
                            required />
                    </div>
                    <div className="mt-2 col-md-12"><label className="labels ">Deskripsi Lapangan</label>
                        <i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                        <textarea className="form-control mb-3"
                            id="exampleFormControlTextarea1" rows={3}
                            name="deskripsi"
                            value={_deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            required />
                    </div>
                    <div className="mt-2 col-12 col-md-12"><label className="labels">Foto Lapangan</label>
                        <i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                        <div className="mt-2 col-md-12">
                            <div className="custom-file">
                                <input type="file" onChange={uploadToClient} className="custom-file-input" id="validatedCustomFile" name="myImage" />
                                <label className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
                            </div>
                        </div>
                    </div>
                    <div className="row p-4">
                        <div className='col-6 col-lg-12 mb-4'>
                            <img className='img-fluid rounded d-block' id='image' width={300}
                                height={300} src={createObjectURL === null ? `/uploads/${_gambar}` : createObjectURL} />
                        </div>
                    </div>
                    <div className='card p-3'>
                        <h4 className="labels" style={{ color: 'black' }}>Atur Jadwal dan Harga</h4>
                        <div className=" mt-2 col-md-12" style={{ color: 'black' }}><label className="labels">Jam Operasional</label>
                            <i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                            <div className='row'>
                                <div className='col-3 col-lg-3 mb-2'>
                                    <input type="time" className="form-control " placeholder="Mulai"
                                        id='jamPagiMulai'
                                    />
                                </div>
                                <div className='col-1 col-lg-1 mb-2 text-center'>
                                    <strong>_</strong>
                                </div>
                                <div className='col-3 col-lg-3 mb-2'>
                                    <input type="time" className="form-control" placeholder="Akhir"
                                        id='jamPagiAkhir'
                                    />
                                </div>
                                <div className='col-5 col-lg-5 mb-2'>
                                    <div className='d-flex flex-row'>
                                        <div className='col-2 col-sm-2'>
                                            <input className="form-control" value={'Rp'} readOnly required />
                                        </div>
                                        <div className='col-7 col-sm-6'>
                                            <input type="number" className="form-control" placeholder="Harga Pagi"
                                                required
                                                value={_hargaPagi}
                                                onChange={(e) => setHargaPagi(e.target.value)}
                                            />
                                        </div>
                                        <div className='col-3 col-sm-4'>
                                            <input type="text" className="form-control" value={'.000,-'} readOnly required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3 col-lg-3 mb-2'>
                                    <input type="time" className="form-control "
                                        id='jamMalamMulai'
                                        placeholder="Mulai" /></div>
                                <div className='col-1 col-lg-1 mb-2 text-center'>
                                    <strong>_</strong>
                                </div>
                                <div className='col-3 col-lg-3 mb-2'>
                                    <input type="time"
                                        id='jamMalamAkhir'
                                        className="form-control" placeholder="Akhir" />
                                </div>
                                <div className='col-5 col-lg-5 mb-2'>
                                    <div className='d-flex flex-row'>
                                        <div className='col-2 col-sm-2'>
                                            <input className="form-control" value={'Rp'} readOnly required />
                                        </div>
                                        <div className='col-7 col-sm-6'>
                                            <input type="number" className="form-control"
                                                placeholder="Harga Malam"
                                                value={_hargaMalam}
                                                onChange={(e) => setHargaMalam(e.target.value)}
                                                required />
                                        </div>
                                        <div className='col-3 col-sm-4'>
                                            <input type="text" className="form-control" value={'.000,-'} readOnly required />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='d-flex-end flex-row justify-content-end mt-3'>
                                <input type='button' className='btn-fill text-white' onClick={lihatJadwal} value='CEKJADWAL' />
                            </div>

                        </div>
                    </div>
                    <div className='mt-3'>
                        <h4>Jadwal</h4>
                        <hr></hr>
                        <div className='row' id='divJadwal'>

                            {jadwalTampilan.length === 0 ? (
                                <h2>Daftar Jadwal</h2>
                            ) : (
                                <>

                                    {jadwalTampilan.map((data, i) => (
                                        <div className='col-3 col-sm-3 mb-2'>
                                            <div className='card text-center'>
                                                <div className='card-body'>
                                                    <span>{data}</span><br></br>
                                                    <span>Rp {hargaTampilan[i]}.000</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="container-login100-form-btn">
                                        <button type="submit" className="btn btn-outline-secondary"
                                            style={{
                                                backgroundColor: '#006E61', color: 'rgb(255, 255, 255)',
                                                borderRadius: '5cm', width: 500, height: 50
                                            }}
                                            onClick={uploadToServer}
                                        >UPDATE</button>
                                    </div>
                                </>
                            )}

                        </div>

                    </div>
                </form>

            </div>

        </div>
    )

}