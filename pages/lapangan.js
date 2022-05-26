import Head from 'next/head'
import Image from 'next/image'
import Helmet from 'react-helmet'
import Carousel from 'react-bootstrap/Carousel'
import CardRekomendasi from '../components/user/lapangan/CardRekomendasi'
import CardKategori from '../components/user/lapangan/CardKategori'
import Pagination from '../components/Pagination'


export default function Lapangan() {
    return (
        <>
            <div className='container my-4'>
                <h1>Daftar Lapangan</h1>
            </div>
            <div>

                <div className="container my-4">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="btn-group col-md-12">
                            <input type="text" className="form-control col-10 mt-2 col-md-10" placeholder="Cari Lapangan Disini" />
                            <a href='/user/cari-lapangan' className="form-control col-2 mt-2 col-sm-2 btn shadow-sm" style={{ backgroundColor: '#ffbe2e' }}><button ><i className="fa fa-search text-white"></i></button></a>
                        </div>
                    </div>
                </div>
                <div className="container my-4 text-black-50" >
                    <h2 style={{ color: 'black' }}>Rekomendasi Lapangan</h2>
                    <hr></hr>
                    <div className="row row-cols-1 row-cols-md-4 g-4 mt-3">

                        <CardRekomendasi />
                    </div>
                </div>

                <div className='container my-4 text-black-50'>
                    <h2 style={{ color: 'black' }}>Pilih Kategori Olahraga</h2>
                    <select className='form-control form-select mt-4'>
                        <option>Futsal</option>
                        <option>Bulutangkis</option>
                        <option>Voli</option>
                        <option>Basket</option>
                    </select>
                </div>
                <div className='container mt-4 text-black-50'>

                </div>
                <div className='container mt-4 text-black-50 mt-5'>
                    <div className="row row-cols-1 row-cols-md-4 g-4">

                        <CardKategori />
                    </div>

                </div>


            </div>
            <div className='container d-flex mt-4 text-center justify-content-center'>
                <Pagination />
            </div>



        </>
    )
}
