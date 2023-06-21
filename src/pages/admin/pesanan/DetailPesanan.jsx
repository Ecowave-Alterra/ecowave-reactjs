import { useParams, Link } from 'react-router-dom';
import { useGetData } from '../../../hooks/FetchDataMockServer';

import {
  TruckIcon,
  MapPinIcon,
  BuildingStorefrontIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import Back from '../../../assets/img/Vector.png';
import media from '../../../assets/img/media.png';

import ErrorPage from '../../../components/ErrorPage';

function DetailPesanan() {
  let { id } = useParams();

  //ganti
  const swrKey = `admin/orders/${id}`;

  const { data, isLoading, error } = useGetData(swrKey);
  if (error) return <ErrorPage />;
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          className="h-16 w-16"
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
          alt=""
        />
      </div>
    );
  console.log(data);

  // Handle Status Pengiriman
  const statusPengiriman = () => {
    const infoStatus = data.Status;

    switch (infoStatus) {
      case 'Dikemas':
        return (
          <p className="text-green-500">
            Pesanan sedang dikemas |{' '}
            <span className="font-semibold">Dikemas</span>
          </p>
        );
      case 'Dikirim':
        return (
          <p className="text-green-500">
            Pesanan dalam pengiriman |{' '}
            <span className="font-semibold">Dikirim</span>
          </p>
        );
      case 'Selesai':
        return (
          <p className="text-green-500">
            Pesanan telah diterima oleh yang bersangkutan |{' '}
            <span className="font-semibold">Selesai</span>
          </p>
        );
      case 'Belum Bayar':
        return (
          <p className="text-error-500">
            Pesanan menunggu pembayaran |{' '}
            <span className="font-semibold cursor-pointer">Belum Bayar</span>
          </p>
        );
      case 'Dibatalkan':
        return (
          <p className="text-error-500">
            <span className="font-semibold cursor-pointer">Dibatalkan</span>
          </p>
        );
      default:
        return (
          <p className="text-error-500">
            <span className="font-semibold">Data Eror</span>
          </p>
        );
    }
  };

  return (
    <div className="py-12 px-10">
      {/* Back */}
      <div className="flex justify-start items-center mb-14 ">
        <Link to={'/admin/pesanan'}>
          <img src={Back} className="h-3 mr-7 cursor-pointer" />
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
          <p>Reguler</p>
          <div>{statusPengiriman()}</div>
        </div>
        <p>J&T Express : 251372563213</p>
      </div>

      <div className="flex items-center mb-5">
        <MapPinIcon className="h-6 w-7 mr-3" />
        <div className="text-p1 font-bold">Alamat Pengirim</div>
      </div>
      <div className="flex-row space-y-3 mb-14">
        <p>{data.Name}</p>
        <p>(+62) 81123456789</p>
        <p>Jl Asia Afrika No 123 Kota Bandung 40526</p>
      </div>
      <div className="flex items-center text-green-500 mb-7">
        <BuildingStorefrontIcon className="h-6 w-7 mr-2" />
        <div className="text-p2">EcoShop</div>
      </div>
      <div className="flex justify-between items-center border-b-2 border-b-gray-300 mb-7">
        <div className="flex items-center">
          <img src={media} className="w-28" />
          <p>Totebag Tas belanja serbaguna</p>
        </div>
        <p>x1</p>
      </div>

      <div className="flex items-center mb-14">
        <ShoppingBagIcon className="h-6 w-7 mr-3" />
        <div className="text-p1 font-bold">Detail Pembayaran</div>
      </div>
      <div className="flex-row border-b-2 border-gray-300 space-y-5 pb-5 mb-5 ">
        <div className="flex justify-between">
          <p>Harga</p>
          <span>Rp.5.000</span>
        </div>
        <div className="flex justify-between">
          <p>Ongkos Kirim</p>
          <span>Rp.5.000</span>
        </div>
        <div className="flex justify-between">
          <p>Promo yang digunakan</p>
          <span>-</span>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-p1 font-bold border-b-2 border-gray-300 pb-5 mb-5">
          <p>Total Pesanan</p>
          <p>Rp.20.000</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p>Metode Pembayaran</p>
        <p>Bca Virtual Account</p>
      </div>
    </div>
  );
}

export default DetailPesanan;
