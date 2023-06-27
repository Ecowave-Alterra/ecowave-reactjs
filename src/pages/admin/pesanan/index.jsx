import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useGetData } from '../../../hooks/FetchData';
import { mutate } from 'swr';

//Icon & Image
import { EyeIcon, PencilIcon } from '@heroicons/react/24/outline';
import Empty from '../../../assets/img/Empty Cart.png';

//Component
import EditResiModal from '../../../components/EditResiModel';
import ButtonGroup from '../../../components/ButtonGroup';
import Search from '../../../components/Search';
import Pagination from '../../../components/Pagination';
import EmptyData from '../../../components/EmptyData';
import ErrorPage from '../../../components/ErrorPage';
import Alert from '../../../components/Alert';

export default function Pesanan() {
  const [SendModalId, setSendModalId] = useState(null);
  const [ordersId, setordersId] = useState('');
  const [filter, setFilter] = useState('');

  const buttons = [
    'Semua',
    'Belum Bayar',
    'Dikemas',
    'Dikirim',
    'Selesai',
    'Dibatalkan',
  ];

  const columns = [
    { header: 'No.' },
    { header: 'No. Resi' },
    { header: 'Transaksi ID' },
    { header: 'Nama Pembeli' },
    { header: 'Unit' },
    { header: 'Total Pemesanan' },
    { header: 'Tanggal Pesanan' },
    { header: 'Status' },
    { header: 'Action' },
  ];

  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const searchValue = searchParams.get('search') || '';
  const filterValue = searchParams.get('filter') || '';
  const pageValue = searchParams.get('page') || 1;

  //alert fetching data
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');

  //handling alert fetching data
  const openAlert = (variant, message) => {
    setIsAlert(true);
    setVariant(variant);
    setMessage(message);
    setTimeout(closeAlert, 2500);
  };
  const closeAlert = () => {
    setIsAlert(false);
    setVariant('');
    setMessage('');
  };

  //query string dikirim ke halaman tambah dan ubah
  const backValues = {
    search: searchValue,
    filter: filterValue,
    page: pageValue,
  };

  const swrKey = `admin/orders/search?search=${searchValue}&filter=${filterValue}&page=${pageValue}`;
  const { data, isLoading, error } = useGetData(swrKey);
  if (error) return <ErrorPage />;

  // Search
  const updateSearchQuery = (newSearchValue) => {
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params.toString());
      updatedParams.set('search', newSearchValue);
      return updatedParams;
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        updateSearchQuery(event.target.value);
    }
  };

  // Filter
  const updateFilter = (newFilterValue) => {
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params.toString());
      updatedParams.set('filter', newFilterValue);
      updatedParams.set('page', '1');
      return updatedParams;
    });
  };

  const getDataByStatus = async (event) => {
    setFilter(event.target.name);
    if (event.target.name === 'Semua') {
      updateFilter('');
    } else {
      updateFilter(event.target.name);
    }
  };

  // pagination handling
  const prevPage = () => {
    updatePagination(parseInt(pageValue) - 1);
  };
  const nextPage = () => {
    updatePagination(parseInt(pageValue) + 1);
  };
  const changePage = (id) => {
    updatePagination(id);
  };

  const updatePagination = (newPaginationValue) => {
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params.toString());
      updatedParams.set('page', newPaginationValue);
      return updatedParams;
    });
  };

  const updateURL = () => {
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const filter = searchParams.get('filter') || '';
    const pageValue = searchParams.get('page') || 1;
    const newSWRKey = `/api/data?search=${search}&filter=${filter}&page=${pageValue}`;
    if (newSWRKey !== swrKey) {
      mutate(newSWRKey);
    }
    updateURL();

    if (location.search === '') {
      setSearchParams({
        search: '',
        filter: '',
      });
    }
  }, [searchParams, swrKey, location.search]);

  // Send
  const openModalEdit = (isOpenModal, idOrder) => {
    setSendModalId(isOpenModal);
    setordersId(idOrder);
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

  // Format Day
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  return (
    <div className="flex-row sm:ml-[44px] sm:mr-8 mx-4 mt-10">
      {/* header */}
      <div className="text-h5 mb-2">Pesanan</div>
      <div className="text-p3 text-gray-500">
        Pantau pesanan EcoWave di halaman ini
      </div>

      {/* alert fetch api */}
      {isAlert && (
        <Alert variant={variant} message={message} onClose={closeAlert} />
      )}

      {/* Search */}
      <div className="mt-7">
        <Search
          id="search-input"
          placeholder="Cari resi atau nama item"
          handleKeyDown={handleKeyDown}
        />
      </div>

      {/* Button grub */}
      <div className="mt-9 inline-flex flex-row text-p3 gap-1 border-b-[2px] border-green-500 justify-start items-end">
        <ButtonGroup buttons={buttons} getData={getDataByStatus} />
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto mt-3">
        <table className="w-full min-w-[1300px] text-p4 text-left text-black">
          <thead className="text-p3 text-white bg-green-500 ">
            <tr>
              {columns.map((head, i) => (
                <th key={i} className="py-[14px] px-[10px] text-p2 font-medium">
                  {head.header}
                </th>
              ))}
            </tr>
          </thead>

          {isLoading ? (
            <tbody>
              <tr className="">
                <td colSpan={10} className="mx-auto py-40">
                  <img
                    className="h-16 w-16 mx-auto"
                    src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                    alt=""
                  />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {data && data.Status === 200 ? (
                data.Orders.map((item, i) => (
                  <tr key={i} className="even:bg-gray-50 ">
                    <th scope="row" className="text-center font-normal">
                      {10 * (parseInt(data.Page) - 1) + i + 1}
                    </th>
                    <td className="py-[18px] px-[10px]">
                      {item.ReceiptNumber}
                    </td>
                    <td className="py-[18px] px-[10px]">
                      {item.TransactionId}
                    </td>
                    <td className="py-[18px] px-[10px]">{item.Name}</td>
                    <td className="py-[18px] px-[10px]">{item.Unit}</td>
                    <td className="py-[18px] px-[10px]">
                      {formatRupiah(item.TotalPrice)}
                    </td>
                    <td className="py-[18px] px-[10px]">
                      {new Date(item.OrderDate).toLocaleDateString(
                        'id-ID',
                        options
                      )}
                    </td>
                    <td className="py-[18px] px-[10px]">
                      {item.StatusTransaction}
                    </td>
                    <td className="py-[18px] px-[10px] text-center flex space-x-2 justify-center">
                      <button
                        onClick={() =>
                          navigate(
                            '/admin/pesanan/detail/' + item.TransactionId,
                            {
                              state: backValues,
                            }
                          )
                        }
                        className="bg-green-50 rounded-full mx-2 py-[5px] px-[10px]"
                        id="btn_to_detail"
                      >
                        <EyeIcon className="w-7 h-7 p-1 text-green-500 bg-green-50 rounded-full cursor-pointer" />
                      </button>
                      {filterValue === "Dikemas" && (
                        <PencilIcon
                          onClick={() =>
                            openModalEdit(true, item.TransactionId)
                          }
                          className="w-12 h-9 py-1 px-3 text-green-500 bg-green-50 rounded-full cursor-pointer"
                          id="btn_edit_resi"
                        />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="row-span-3 w-full">
                  <td colSpan={10}>
                    <EmptyData
                      image={Empty}
                      message="No. Resi yang Anda cari tidak ditemukan"
                    />
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>

      {/* Pagination */}
      {isLoading ? (
        ''
      ) : (
        <div className="mt-2">
          {data.TotalPage >= 1 && (
            <Pagination
              currentPage={data.Page}
              totalPage={data.TotalPage}
              onPrev={prevPage}
              onNext={nextPage}
              onChange={changePage}
            />
          )}
        </div>
      )}

      {/* Modals */}
      {SendModalId && (
        <EditResiModal
          isOpen={SendModalId}
          setIsOpen={setSendModalId}
          openAlert={openAlert}
          ordersId={ordersId}
        />
      )}
    </div>
  );
}
