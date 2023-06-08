import { Link, useNavigate } from "react-router-dom";
import {
  PlusSmallIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

import ButtonGroup from "../../../../components/ButtonGroup";
import Search from "../../../../components/Search";
import { useEffect, useState } from "react";

export default function MetodePembayaran() {
  const [itemList, setItemList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 4;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = itemList.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(itemList.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);
  const navigate = useNavigate();
  const getDataByStatus = (event) => {
    console.log(event.target.name);
    //do some stuff here
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleDelete = () => {
    alert("telah dihapus");
  };

  // table setup
  const columns = [
    { header: "No." },
    { header: "Metode Pembayaran" },
    { header: "Kategori" },
    { header: "Nomor Rekening" },
    { header: "Action" },
  ];

  const metodePembayaran = [
    {
      metodePembayaran: "E-Wallet",
      kategori: "GoPay",
      nomorRekening: 343466,
    },
    {
      metodePembayaran: "E-Wallet",
      kategori: "OVO",
      nomorRekening: 986490,
    },
    {
      metodePembayaran: "E-Wallet",
      kategori: "ShoppePay",
      nomorRekening: 986496530,
    },
    {
      metodePembayaran: "Bank",
      kategori: "BCA",
      nomorRekening: 986496530,
    },
    {
      metodePembayaran: "Bank",
      kategori: "BNI",
      nomorRekening: 98649530,
    },
    {
      metodePembayaran: "E-Wallet",
      kategori: "GoPay",
      nomorRekening: 343466,
    },
    {
      metodePembayaran: "E-Wallet",
      kategori: "OVO",
      nomorRekening: 986490,
    },
    {
      metodePembayaran: "E-Wallet",
      kategori: "ShoppePay",
      nomorRekening: 986496530,
    },
    {
      metodePembayaran: "Bank",
      kategori: "BCA",
      nomorRekening: 986496530,
    },
    {
      metodePembayaran: "Bank",
      kategori: "BNI",
      nomorRekening: 98649530,
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
    setItemList(metodePembayaran);
  }, []);

  return (
    <div className="sm:ml-[44px] sm:mr-8 mx-4">
      {/* header */}
      <div className="mt-16 flex flex-row justify-between items-center mb-9">
        <div className="">
          <h4 className="text-h4 text-black">Metode Pembayaran</h4>
          <p className="text-p2 text-grey-500 mt-2">
            Lihat, tambah, ubah, dan hapus Metode Pembayaran.
          </p>
        </div>
        <div className="flex flex-row gap-2 ">
          <button
            onClick={() => navigate("/admin/metode-pembayaran/tambah")}
            className="flex flex-row gap-[13px] items-center rounded-full bg-green-500 py-[10px] pl-[21px] pr-4 hover:bg-green-600 duration-200"
          >
            <PlusSmallIcon className="w-[14px]  text-white " />
            <p className=" text-p3 text-white">Tambah Data</p>
          </button>
        </div>
      </div>
      <div className="mt-8 mb-9">
        <Search
          id="search-"
          placeholder="Cari Nama Netode Pembayaran"
          onChange={handleChange}
        />
      </div>

      {/* filter table */}
      <div className="inline-flex flex-row gap-1 border-b-[2px] border-green-500 justify-start items-end">
        <ButtonGroup
          buttons={["Semua", "E-Wallet", "Bank"]}
          getData={getDataByStatus}
        />
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
                  <th scope="row" className="text-center font-normal w-[48px]">
                    {i + 1}
                  </th>
                  <td className="py-[18px] px-[10px] min-w-[250px]">
                    {item.metodePembayaran}
                  </td>
                  <td className="py-[18px] px-[10px] w-full">
                    {item.kategori}
                  </td>
                  <td className="py-[18px] px-[10px] min-w-[300px]">
                    {item.nomorRekening}
                  </td>
                  <td className="py-[18px] px-[10px] text-center flex space-x-2 justify-center w-[180px]">
                    <div className="flex justify-start">
                      <Link
                        to={"/admin/metode-pembayaran/ubah"}
                        className="bg-green-50 rounded-full mx-2 py-[5px] px-[10px]"
                      >
                        <PencilIcon className="w-5 h-5 text-green-500" />
                      </Link>
                      <button
                        className="bg-green-50 rounded-full mx-2 py-[5px] px-[10px]"
                        onClick={() => handleDelete()}
                      >
                        <TrashIcon className="w-5 h-5 text-error-500" />
                      </button>
                    </div>
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
                    currentPage === 1 ? "text-gray-300" : "text-green-500"
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
                        ? "bg-green-500 text-white"
                        : "bg-green-50"
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
                      ? "text-gray-300"
                      : "text-green-500"
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
