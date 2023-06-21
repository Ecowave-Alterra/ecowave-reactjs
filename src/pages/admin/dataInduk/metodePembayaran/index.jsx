import Search from "../../../../components/Search";
import { useState } from "react";
import { useEffect } from "react";

export default function MetodePembayaran() {
  const [itemList, setItemList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = itemList.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(itemList.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);
  const [search, setSearch] = useState([]);

  const columns = [
    { header: 'No.' },
    { header: 'Metode Pembayaran' },
    { header: 'Kategori' },
  ];

  const MetodePembayaran = [
    {
      Method : "OVO",
      Category : "QRIS",
    },
    {
      Method : "Gopay",
      Category : "QRIS",
    },
    {
      Method : "Dana",
      Category : "QRIS",
    },
    {
      Method : "Shopee Pay",
      Category : "QRIS",
    },
    {
      Method : "BCA",
      Category : "Bank",
    },
    {
      Method : "BRI",
      Category : "Bank",
    },
    {
      Method : "BNI",
      Category : "Bank",
    },
    {
      Method : "Mandiri",
      Category : "Bank",
    },
  ];

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

  useEffect(() => {
    if (search == ""){
      setItemList(MetodePembayaran);
    }
  })

  const handleChange = (searchInput) => {
      setCurrentPage(1)
      setItemList((
        MetodePembayaran.filter((item) => {
        return item.Method.toUpperCase().match(searchInput.toUpperCase());
      })))
  };

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
            />
            <button
              onClick={() => handleChange(search)}
              id="btn-input-search"
              className="gap-[13px] items-center rounded-full bg-green-500 py-[10px]  px-6 hover:bg-green-600 duration-200  text-p3 text-white"
            >
              Cari
            </button>
          </div>
          </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-3">
        <table className="w-full min-w-[1000px] text-p4 text-left text-black">
          <thead className="text-p3 text-white bg-green-500 ">
            <tr>
              {columns.map((head, i) => (
                <th key={i} className="py-[14px] px-[10px] text-p2 font-medium">
                  {head.header}
                </th>
              ))}
            </tr>
          </thead>
            <tbody>
            {itemList &&
              records.map((item, i) => (
                <tr key={i} className="even:bg-gray-50 ">
                  <th scope="row" className="text-center font-normal">
                    {i + 1}
                  </th>
                  <td className="py-[18px] px-[10px]">{item.Method}</td>
                  <td className="py-[18px] px-[10px]">{item.Category}</td>
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
                      currentPage === numbers.length ? 'text-gray-300' : 'text-green-500'
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
    </div>
  );
}
