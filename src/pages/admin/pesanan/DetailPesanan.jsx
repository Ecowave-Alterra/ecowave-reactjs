import { useParams, Link } from 'react-router-dom';
import { useGetData } from '../../../hooks/FetchData';

import {
  TruckIcon,
  MapPinIcon,
  BuildingStorefrontIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import Back from '../../../assets/img/Vector.png';

import ErrorPage from '../../../components/ErrorPage';

function DetailPesanan() {
  let { id } = useParams();

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

  // Handle Status Pengiriman
  const statusPengiriman = () => {
    const infoStatus = detailTransaction.StatusTransaction;

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
            <span className="font-semibold">Belum Bayar</span>
          </p>
        );
      case 'Dibatalkan':
        return (
          <p className="text-error-500">
            <span className="font-semibold">Dibatalkan</span>
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

  // Format angka menjadi format rupiah
  const formatRupiah = (number) => {
    const formattedNumber = Math.floor(number);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(formattedNumber);
  };

  // const detailProduct = data.Orders.Products[0];
  const detailTransaction = data.Orders.Transaction;

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
        <p>
          {detailTransaction.ReceiptNumber
            ? `${
                detailTransaction.ExpeditionName
              } : ${detailTransaction.ReceiptNumber.replace(/\D/g, '')}`
            : detailTransaction.ExpeditionName}
        </p>
      </div>

      <div className="flex items-center mb-5">
        <MapPinIcon className="h-6 w-7 mr-3" />
        <div className="text-p1 font-bold">Alamat Pengirim</div>
      </div>
      <div className="flex-row space-y-3 mb-14">
        <p>{detailTransaction.Name}</p>
        <p>{detailTransaction.PhoneNumber}</p>
        <p>{detailTransaction.Address}</p>
      </div>
      <div className="flex items-center text-green-500 mb-7">
        <BuildingStorefrontIcon className="h-6 w-7 mr-2" />
        <div className="text-p2">EcoShop</div>
      </div>
      {data.Orders.Products.map((item, i) => (
        <div
          key={i}
          className="flex justify-between items-center border-b-2 border-b-gray-300 mb-7"
        >
          <div className="flex items-center">
            <img
              src={item.ProductImageUrl}
              className="w-28 m-3"
              alt="Product Image"
            />
            <p>{item.ProductName}</p>
          </div>
          <p>x{item.Qty}</p>
        </div>
      ))}

      <div className="flex items-center mb-14">
        <ShoppingBagIcon className="h-6 w-7 mr-3" />
        <div className="text-p1 font-bold">Detail Pembayaran</div>
      </div>
      <div className="flex-row border-b-2 border-gray-300 space-y-5 pb-5 mb-5 ">
        <div className="flex justify-between">
          <p>Harga</p>
          <span>{formatRupiah(detailTransaction.TotalProductPrice)}</span>
        </div>
        <div className="flex justify-between">
          <p>Ongkos Kirim</p>
          <span>{formatRupiah(detailTransaction.TotalShippingPrice)}</span>
        </div>
        <div className="flex justify-between">
          <p>Promo yang digunakan</p>
          <span>{detailTransaction.Voucher}</span>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-p1 font-bold border-b-2 border-gray-300 pb-5 mb-5">
          <p>Total Pesanan</p>
          <p>{formatRupiah(detailTransaction.TotalPrice)}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p>Metode Pembayaran</p>
        <p>{detailTransaction.PaymentMethod}</p>
      </div>
    </div>
  );
}

export default DetailPesanan;
