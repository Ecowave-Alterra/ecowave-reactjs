import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useGetData } from '../../../../hooks/FetchDataMockServer';

import Empty from '../../../../assets/img/emptyOpsi.png';
import ErrorPage from '../../../../components/ErrorPage';
import EmptyData from '../../../../components/EmptyData';
import Search from '../../../../components/Search';
import Pagination from '../../../../components/Pagination';

export default function OpsiPengiriman() {
  const columns = [
    { header: 'No.' },
    { header: 'Opsi Pengiriman' },
    { header: 'Estimeasi/Hari' },
    { header: 'Harga' },
    { header: 'Status' },
  ];

  const [searchChanges, setSearchChanges] = useState('');

  //query strings
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get('search') || '';
  const pageValue = searchParams.get('page') || 1;

  // const swrKey = `admin/products/category/search?name=${searchValue}&page=${pageValue}`;
  const swrKey = `admin/orders`;
  const { data, isLoading, error } = useGetData(swrKey);

  // Fungsi untuk pagination
  const updatePagination = (newPaginationValue) => {
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params.toString());
      updatedParams.set('page', newPaginationValue);
      return updatedParams;
    });
  };

  const prevPage = () => {
    updatePagination(parseInt(pageValue) - 1);
  };
  const nextPage = () => {
    updatePagination(parseInt(pageValue) + 1);
  };
  const changePage = (id) => {
    updatePagination(id);
  };

  // Search
  const updateSearchQuery = (newSearchValue) => {
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params.toString());
      updatedParams.set('search', newSearchValue);
      return updatedParams;
    });
  };

  const handleChange = (e) => {
    setSearchChanges(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (searchChanges !== searchValue) {
        updateSearchQuery(searchChanges);
      } else {
        alert('sama');
      }
    }
  };

  console.log(data);
  if (error) return <ErrorPage />;

  return (
    <div className="sm:ml-[44px] sm:mr-8 mx-4">
      <div className="mt-16 flex flex-row justify-between items-center">
        <h4 className="text-h4">Opsi Pengiriman</h4>
      </div>

      {/* Search */}
      <div className="mt-7">
        <Search
          id="search-ekspedisi"
          placeholder="Cari Nama Opsi Pengiriman"
          onChange={handleChange}
          handleKeyDown={handleKeyDown}
        />
      </div>

      {/* table */}
      <div className="relative overflow-x-auto mt-9">
        <table className="w-full text-p4 text-left">
          <thead className="text-p2 text-white bg-green-500 ">
            <tr>
              {columns.map((head, i) => (
                <th
                  key={i}
                  className="py-[14px] px-[10px] text-p2 text-center font-medium"
                >
                  {head.header}
                </th>
              ))}
            </tr>
          </thead>
          {isLoading ? (
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
            <tbody>
              {data && data.Status === 200 ? (
                data.Orders.map((item, i) => (
                  <tr key={i} className="even:bg-gray-50">
                    <th
                      scope="row"
                      className="text-center font-normal w-[48px]"
                    >
                      {10 * (parseInt(data.Page) - 1) + i + 1}.
                    </th>
                    <td className="py-[18px] text-center">{item.Name}</td>
                    <td className="py-[18px] text-center">2-3</td>
                    <td className="py-[18px] text-center">Rp.10.000</td>
                    <td className="py-[18px] text-center">Reguler</td>
                  </tr>
                ))
              ) : (
                <tr className="row-span-3 w-full">
                  <td colSpan={10}>
                    <EmptyData
                      image={Empty}
                      message="Belum ada list Opsi Pengiriman"
                    />
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>

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
      </div>
    </div>
  );
}
