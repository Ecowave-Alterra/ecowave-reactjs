import { useEffect, useState } from 'react';

import Empty from '../../../../assets/img/emptyOpsi.png';
import Search from '../../../../components/Search';

export default function OpsiPengiriman() {
  const TABLE_COLUMS = [
    { header: 'No.' },
    { header: 'Opsi Pengiriman' },
    { header: 'Status' },
  ];

  const Ekspedisi = [
    {
      OpsiPengiriman: 'JNE',
      Status: 'Reguler',
    },
    {
      OpsiPengiriman: 'Pos Indonesia',
      Status: 'Reguler',
    },
    {
      OpsiPengiriman: 'TIKI',
      Status: 'Reguler',
    },
  ];

  const [search, setSearch] = useState('');
  const [filterEkspedisi, setFilterEkspedisi] = useState(Ekspedisi);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 4;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = filterEkspedisi.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(filterEkspedisi.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const prevPage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changePage = (id) => {
    setCurrentPage(id);
  };

  // Handle search
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        const filterItems = Ekspedisi.filter((item) =>
          item.OpsiPengiriman.toLowerCase().includes(search.toLowerCase())
        );
        setFilterEkspedisi(filterItems);
      }, 500);
    }
  };

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
          handleKeyDown={handleKeyPress}
        />
      </div>

      {/* table */}
      <div className="relative overflow-x-auto mt-9">
        <table className="w-full text-p4 text-left text-black">
          <thead className="text-p2 text-white bg-green-500 ">
            <tr>
              {TABLE_COLUMS.map((head, i) => (
                <th
                  key={i}
                  className="py-[14px] px-[10px] text-p2 text-center font-medium"
                >
                  {head.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={3} className="text-center py-10">
                  <img
                    className="h-16 w-16 mx-auto"
                    src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                    alt=""
                  />
                </td>
              </tr>
            )}

            {/* Table records */}
            {!isLoading &&
              records.map((item, i) => (
                <tr key={i} className="even:bg-gray-50">
                  <th scope="row" className="text-center font-normal w-[48px]">
                    {firstIndex + i + 1}.
                  </th>
                  <td className="py-[18px] px-[10px] text-center">
                    {item.OpsiPengiriman}
                  </td>
                  <td className="py-[18px] px-[10px] text-center">
                    {item.Status}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Pagination */}
        {records.length >= 1 && (
          <div className="flex justify-between w-full pb-2">
            <div>
              <p className="text-p2 font-normal px-5 py-3 text-gray-500">{`Halaman ${currentPage} dari ${nPage}`}</p>
            </div>
            <nav>
              <ul className="list-style-none flex">
                <li>
                  <button
                    className={`cursor-pointer relative block px-5 py-3 text-p2 font-semibold  ${
                      currentPage === 1 ? 'text-gray-300' : 'text-green-500'
                    }`}
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {numbers.map((n, i) => (
                  <li key={i}>
                    <p
                      className={`cursor-pointer relative block px-5 py-3 text-p2 font-semibold rounded-full text-green-500 ${
                        currentPage === n
                          ? 'bg-green-500 text-white'
                          : 'bg-green-50'
                      }`}
                      onClick={() => changePage(n)}
                    >
                      {n}
                    </p>
                  </li>
                ))}

                <li>
                  <button
                    className={`cursor-pointer relative block px-5 py-3 text-p2 font-semibold  ${
                      currentPage === numbers.length
                        ? 'text-gray-300'
                        : 'text-green-500'
                    }`}
                    onClick={nextPage}
                    disabled={currentPage === numbers.length}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* Empty */}
        {!isLoading && records.length == 0 && (
          <div className="py-20">
            <img src={Empty} className="h-56 mx-auto" />
            <p className="text-p3 mt-8 font-semibold text-gray-500 text-center">
              Belum ada list Metode Pengiriman
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
