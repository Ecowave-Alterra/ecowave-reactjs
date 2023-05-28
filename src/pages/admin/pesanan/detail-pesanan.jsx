import back from '../../../assets/DetailPemesanan/Vector.png';
import {
  TruckIcon,
  MapPinIcon,
  BuildingStorefrontIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function DetailPesanan() {
  const detail = {
    informasi: {
      tipe: 'Reguler',
      ekspedisi: 'J&T Express : 251372563213',
      status: 'Dikemas',
    },
    alamat: {
      nama: 'Shinta Rachma Shintia',
      nomer: '(+62) 81123456789',
      lokasi: 'Jl Asia Afrika No 123 Kota Bandung 40526',
    },
    produk: {
      img: '/src/assets/DetailPemesanan/media.png',
      namaProduk: 'Totebag Tas belanja serbaguna',
      jumlah: 1,
    },
    pembayaran: {
      harga: 'Rp.5.000',
      ongkos: 'Rp.5.000',
      promo: '-',
      total: 'Rp.20.000',
      metode: 'Bca Virtual Account',
    },
  };

  const statusPengiriman = () => {
    const infoStatus = detail.informasi.status;

    switch (infoStatus) {
      case 'Dikemas':
        return (
          <p className="text-green-500">Pesanan sedang dikemas | Dikemas</p>
        );
      case 'Dikirim':
        return (
          <p className="text-green-500">Pesanan dalam pengiriman | Dikirim</p>
        );
      case 'Selesai':
        return (
          <p className="text-green-500">
            Pesanan telah diterima oleh yang bersangkutan | Selesai
          </p>
        );
      case 'Belum Dibayar':
        return (
          <p className="text-error-500">
            Pesanan menunggu pembayaran | Belum Bayar
          </p>
        );
      default:
        return <p className="text-error-500">Dibatalkan</p>;
    }
  };

  return (
    <div className="py-12 px-10">
      {/* back */}
      <div className="flex justify-start items-center mb-14 ">
        <Link to={'/admin/pesanan'}>
          <img src={back} className="h-3 mr-7 cursor-pointer" />
        </Link>
        <div className="text-h6 font-medium">Detail Pemesanan</div>
      </div>

      {/* content */}
      <div className="flex items-center mb-5">
        <TruckIcon className="h-6 w-7 mr-3" />
        <div className="text-p1 font-bold">Informasi Pengiriman</div>
      </div>
      <div className="flex-row space-y-2 mb-14">
        <div className="flex justify-between">
          <p>{detail.informasi.tipe}</p>
          {statusPengiriman()}
        </div>
        <p>{detail.informasi.ekspedisi}</p>
      </div>

      <div className="flex items-center mb-5">
        <MapPinIcon className="h-6 w-7 mr-3" />
        <div className="text-p1 font-bold">Alamat Pengirim</div>
      </div>
      <div className="flex-row space-y-3 mb-14">
        <p>{detail.alamat.nama}</p>
        <p>{detail.alamat.nomer}</p>
        <p>{detail.alamat.lokasi}</p>
      </div>
      <div className="flex items-center text-green-500 mb-7">
        <BuildingStorefrontIcon className="h-6 w-7 mr-2" />
        <div className="text-p2">EcoShop</div>
      </div>
      <div className="flex justify-between items-center border-b-2 border-b-gray-300 mb-7">
        <div className="flex items-center">
          <img src={detail.produk.img} className="w-28" />
          <p>{detail.produk.namaProduk}</p>
        </div>
        <p>x{detail.produk.jumlah}</p>
      </div>

      <div className="flex items-center mb-14">
        <ShoppingBagIcon className="h-6 w-7 mr-3" />
        <div className="text-p1 font-bold">Detail Pembayaran</div>
      </div>
      <div className="flex-row border-b-2 border-gray-300 space-y-5 pb-5 mb-5 ">
        <div className="flex justify-between">
          <p>Harga</p>
          <span>{detail.pembayaran.harga}</span>
        </div>
        <div className="flex justify-between">
          <p>Ongkos Kirim</p>
          <span>{detail.pembayaran.ongkos}</span>
        </div>
        <div className="flex justify-between">
          <p>Promo yang digunakan</p>
          <span>{detail.pembayaran.promo}</span>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-p1 font-bold border-b-2 border-gray-300 pb-5 mb-5">
          <p>Total Pesanan</p>
          <p>{detail.pembayaran.total}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p>Metode Pembayaran</p>
        <p>{detail.pembayaran.metode}</p>
      </div>
    </div>
  );
}

export default DetailPesanan;
