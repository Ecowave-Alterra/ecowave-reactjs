import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  PlusSmallIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { useCSVDownloader } from 'react-papaparse';
import ButtonGroup from '../../../../components/ButtonGroup';
import Search from '../../../../components/Search';
import { useState } from 'react';
import InformationNotFound from '../../../../components/InformationNotFound';
import Pagination from '../../../../components/Pagination';
import ErrorPage from '../../../../components/ErrorPage';
import { useDeleteData, useGetData } from '../../../../hooks/FetchData';
import Alert from '../../../../components/Alert';
import { mutate } from 'swr';
import ModalConfirm from '../../../../components/ModalConfirm';

export default function Informasi() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [deleteModalId, setDeleteModalId] = useState(null);
  const [searchChanges, setSearchChanges] = useState('');
  const navigate = useNavigate();
  const { CSVDownloader, Type } = useCSVDownloader();

  //get query string
  const searchValue = searchParams.get('search') || '';
  const filterValue = searchParams.get('filter') || '';
  const pageValue = searchParams.get('page') || 1;
  const swrKey = `admin/informations/search?search=${searchValue}&filter=${filterValue}&page=${pageValue}`;

  //query string dikirim ke halaman tambah dan ubah
  const backValues = {
    search: searchValue,
    filter: filterValue,
    page: pageValue,
  };

  //alert fetching data
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');

  //query string handling
  const updateSearchQuery = (newSearchValue) => {
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params.toString());
      updatedParams.set('search', newSearchValue);
      updatedParams.set('page', '1');
      return updatedParams;
    });
  };

  const updateFilter = (newFilterValue) => {
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params.toString());
      updatedParams.set('filter', newFilterValue);
      updatedParams.set('page', '1');
      return updatedParams;
    });
  };

  const updatePagination = (newPaginationValue) => {
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params.toString());
      updatedParams.set('page', newPaginationValue);
      return updatedParams;
    });
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

  const getDataByStatus = async (event) => {
    if (event.target.name === 'Semua') {
      updateFilter('');
    } else {
      updateFilter(event.target.name);
    }
  };

    // Handle Search on Enter
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        updateSearchQuery(event.target.value);
      }
    };

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

  //Handle delete
  const openDeleteModal = (id) => {
    setDeleteModalId(id);
  };

  const closeDeleteModal = () => {
    setDeleteModalId(null);
  };
  const handleDelete = async (id) => {
    const response = await deleteData(id);
    if (response.Status === 200) {
      closeDeleteModal();
      openAlert('success', response.Message);
      navigate('?search=&page=1');
      await mutate(swrKey);
    } else {
      closeDeleteModal();
      openAlert('danger', response.Message);
    }
  };

  // table header
  const columns = [
    { header: 'No.' },
    { header: 'Informasi Id' },
    { header: 'Judul' },
    { header: 'Status' },
    { header: 'Action' },
  ];

  const { data, isLoading, error } = useGetData(swrKey);
  const {
    data: dataCsv,
    isLoading: loadingCsv,
    error: errorCsv,
  } = useGetData(`admin/informations/download-csv`);
  console.log("dataCSV", dataCsv)

  const { deleteData, isLoading: loading } =
    useDeleteData(`admin/informations/`);
  if (error) return <ErrorPage />;

  return (
    <div className="sm:ml-[44px] sm:mr-8 mx-4">
      {isAlert && (
        <Alert variant={variant} message={message} onClose={closeAlert} />
      )}

      {/* header */}
      <div className="mt-16 flex flex-row justify-between items-center mb-9">
        <div className="">
          <h4 className="text-h4 text-black">Informasi</h4>
          <p className="text-p2 text-grey-500 mt-2">
            Lihat, tambah, ubah, dan hapus data informasi.
          </p>
        </div>
        {loadingCsv ? (
          ''
        ) : (
          <div className="flex flex-row gap-2 ">
            <CSVDownloader
              type={Type.Button}
              className="flex flex-row gap-[13px] items-center rounded-full border-gray-300 border  py-[10px] pl-[21px] pr-4 hover:bg-gray-50 duration-200"
              filename={'information-data'}
              bom={true}
              config={{
                delimiter: ';',
              }}
              data={dataCsv.Data}
            >
              <ArrowDownTrayIcon className="w-[14px]  text-gray-500 " />
              <p className=" text-p3 text-gray-600 font-semibold">
                Download File
              </p>
            </CSVDownloader>

            <button
              onClick={() =>
                navigate('/admin/informasi/tambah', {
                  state: backValues,
                })
              }
              className="flex flex-row gap-[13px] items-center rounded-full bg-green-500 py-[10px] pl-[21px] pr-4 hover:bg-green-600 duration-200"
              id="btn_to_tambahInformasi"
            >
              <PlusSmallIcon className="w-[14px]  text-white " />
              <p className=" text-p3 text-white">Tambah Informasi</p>
            </button>
          </div>
        )}
      </div>
      <div className="mt-8 mb-9">
          <div className="flex flex-row gap-2 flex-start">
            <Search
              id="search-input"
              placeholder="Cari ID atau nama informasi"
              handleKeyDown={handleKeyDown}
            />
          </div>
      </div>

      {/* filter table */}
      <div className="inline-flex flex-row gap-1 border-b-[2px] border-green-500 justify-start items-end">
        <ButtonGroup
          buttons={['Semua', 'Terbit', 'Draft']}
          getData={getDataByStatus}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-3">
        <table className="w-full min-w-[1000px] text-p4 text-left  text-black">
          <thead className="text-p3 text-white bg-green-500 ">
            <tr>
              {columns.map((head, i) => (
                <th key={i} className="py-[14px] px-[10px] text-p2 font-medium">
                  {head.header}
                </th>
              ))}
            </tr>
          </thead>
          {isLoading || loading ? (
            <tbody>
              <tr className="">
                <td colSpan={5} className="mx-auto py-40">
                  <img
                    className="h-16 w-16 mx-auto"
                    src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                    alt=""
                  />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="">
              {data && data.Status === 200 ? (
                data.Informations.map((informasi, i) => (
                  <tr key={i} className="even:bg-gray-50">
                    <th
                      scope="row"
                      className="text-center font-normal w-[48px]"
                    >
                      {10 * (parseInt(data.Page) - 1) + i + 1}
                    </th>
                    <td className="py-[18px] px-[10px] min-w-[200px]">
                      {informasi.InformationiId}
                    </td>
                    <td className="py-[18px] px-[10px] w-full">
                      {informasi.Title}
                    </td>
                    <td className="py-[18px] px-[10px] min-w-[80px]">
                      {informasi.Status}
                    </td>
                    <td className="py-[18px] px-[10px] text-center flex space-x-2 justify-center w-[180px]">
                      <div className="flex justify-start">
                        <button
                          onClick={() =>
                            navigate(
                              '/admin/informasi/' + informasi.InformationiId,
                              {
                                state: backValues,
                              }
                            )
                          }
                          className="bg-green-50 rounded-full mx-2 py-[5px] px-[10px]"
                          id="btn_to_detail"
                        >
                          <EyeIcon className="w-5 h-5 text-green-500" />
                        </button>
                        <button
                          onClick={() =>
                            navigate(
                              '/admin/informasi/ubah/' +
                                informasi.InformationiId,
                              {
                                state: backValues,
                              }
                            )
                          }
                          className="bg-green-50 rounded-full mx-2 py-[5px] px-[10px]"
                          id="btn_to_ubah"
                        >
                          <PencilIcon className="w-5 h-5 text-green-500" />
                        </button>
                        <button
                          className="bg-green-50 rounded-full mx-2 py-[5px] px-[10px]"
                          id="btn_delete_info"
                          onClick={() =>
                            openDeleteModal(informasi.InformationiId)
                          }
                        >
                          <TrashIcon className="w-5 h-5 text-error-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="row-span-3 w-full">
                  <td colSpan={5}>
                    <InformationNotFound message={data.Message} />
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
      {/* pagination */}
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
      {deleteModalId && (
        <ModalConfirm
          title="Hapus informasi yang dipilih?"
          description={`Informasi ini akan dihapus secara permanen`}
          labelCancel="Batal"
          labelConfirm="Hapus"
          variant="danger"
          onCancel={closeDeleteModal}
          onConfirm={() => handleDelete(deleteModalId)}
        />
      )}
    </div>
  );
}
