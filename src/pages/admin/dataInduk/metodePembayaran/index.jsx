import Search from '../../../../components/Search';
import { useState } from 'react';
import { useEffect } from 'react';
import Empty from '../../../../assets/img/emptyOpsi.png';

export default function MetodePembayaran() {
  const TABLE_COLUMS = [
    { header: 'No.' },
    { header: 'Metode Pembayaran' },
    { header: 'Kategori' },
  ];

  const MetodePembayaran = [
    {
      Method: 'OVO',
      Category: 'QRIS',
    },
    {
      Method: 'Gopay',
      Category: 'QRIS',
    },
    {
      Method: 'Dana',
      Category: 'QRIS',
    },
    {
      Method: 'Shopee Pay',
      Category: 'QRIS',
    },
    {
      Method: 'BCA',
      Category: 'Bank',
    },
    {
      Method: 'BRI',
      Category: 'Bank',
    },
    {
      Method: 'BNI',
      Category: 'Bank',
    },
    {
      Method: 'Mandiri',
      Category: 'Bank',
    },
  ];

  const [itemList, setItemList] = useState(MetodePembayaran);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = itemList.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(itemList.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Handle Pagination
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

  // Handle Search on Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setItemList(
          MetodePembayaran.filter((item) => {
            return item.Method.toUpperCase().match(search.toUpperCase());
          })
        );
      }, 500);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="sm:ml-[44px] sm:mr-8 mx-4">
      {/* header */}
      <div className="mt-16 flex flex-row justify-between items-center mb-9">
        <div className="">
          <h4 className="text-h4 text-black">Metode Pembayaran</h4>
        </div>
      </div>
      <div className="mt-8 mb-9">
        <div className="flex flex-start">
          <div className="flex flex-row gap-2 flex-start">
            <Search
              id="search-input"
              placeholder="Cari Nama Netode Pembayaran"
              onChange={(e) => setSearch(e.target.value)}
              handleKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-3">
        <table className="w-full min-w-[1000px] text-p4 text-black">
          <thead className="text-p3 text-white bg-green-500 ">
            <tr>
              {TABLE_COLUMS.map((head, i) => (
                <th key={i} className="py-[14px] px-[10px] text-p2 font-medium">
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

            {!isLoading &&
              records.map((item, i) => (
                <tr key={i} className="even:bg-gray-50 ">
                  <th scope="row" className="text-center font-normal">
                    {i + 1}
                  </th>
                  <td className="py-[18px] px-[10px] text-center">
                    {item.Method}
                  </td>
                  <td className="py-[18px] px-[10px] text-center">
                    {item.Category}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

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
            Belum ada list Metode Pembayaran
          </p>
        </div>
      )}
    </div>
  );
}
