import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// Komponen
import ButtonGroup from "../../../components/ButtonGroup";
import Search from "../../../components/Search";

// Ikon & Gambar
import { EyeIcon } from "@heroicons/react/24/outline";
import Empty from "../../../assets/img/File Not Found.png";

export default function Ulasan() {
  const [tabMenu, setTabMenu] = useState(["Semua", "Perabot", "Kantong"]);
  const [itemList, setItemList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = itemList.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(itemList.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const [search, setSearch] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const getDataStatus = (e) => {
    console.log(e.target.name);
  };

  const data = [
    {
      no: "010123",
      nama: "Totebag",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Tersedia",
    },
    {
      no: "010124",
      nama: "Gelas",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Tersedia",
    },
    {
      no: "010125",
      nama: "Botol",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "BotolAqua",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "BotolAqua",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "BotolAqua",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "BotolAqua",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "BotolAqua",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "BotolAqua",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "BotolAqua",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "BotolAqua",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "BotolAqua",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "BotolAqua",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "BotolAqua",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "BotolAqua",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "BotolAqua",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "BotolAqua",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "BotolAqua",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "BotolAqua",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "BotolAqua",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "BotolAqua",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "BotolAqua",
      kategori: "Perabot",
      stok: 20,
      harga: "Rp. 35.000",
      status: "Habis",
    },
  ];

  const columns = [
    { header: "No." },
    { header: "Item ID" },
    { header: "Produk" },
    { header: "Ulasan Diterima" },
    { header: "Tindakan" },
  ];

  // Fungsi untuk pagination
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
    setItemList(data);
  }, []);

  return (
    <div className="flex-row px-5 py-10">
      {/* header */}
      <div className="text-h4 mb-2">Ulasan</div>

      {/* Search */}
      <div className="mt-7">
        <Search
          id="search-ulasan"
          placeholder="Cari item ID, nama produk"
          onChange={handleChange}
        />
      </div>

      {/* Button grub */}
      <div className="space-x-1 text-p3 mt-7 border-b-2 inline-flex border-b-green-500">
        <ButtonGroup buttons={tabMenu} getData={getDataStatus} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-3">
        <table className="w-full text-left table-auto">
          <thead className="bg-green-500 text-white">
            <tr>
              {columns &&
                columns.map((head, i) => (
                  <th
                    key={i}
                    className="py-[14px] text-p2 font-medium text-center"
                  >
                    {head.header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {itemList &&
              records.map((row, index) => (
                <tr key={index} className="even:bg-gray-50 text-p4 text-left">
                  <td className="py-[18px] text-center">
                    {firstIndex + index + 1}.
                  </td>
                  <td className="py-[18px] px-[10px] min-w-[100px] ">
                    {row.no}
                  </td>
                  <td className="py-[18px] px-[10px] min-w-[100px]">
                    {row.nama}
                  </td>
                  <td className="py-[18px] px-[10px]">{row.stok}</td>
                  <td className="py-[18px] px-[10px] text-center flex space-x-2 justify-center">
                    <Link to={"/admin/ulasan/detail"}>
                      <EyeIcon className="w-5 h-5 text-green-500" />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Pagination */}
        {records.length >= 1 && (
          <div className="flex justify-between w-full py-4">
            <div>
              <p className="text-p2 font-normal px-5 py-3 text-gray-500">{`Halaman ${currentPage} dari ${nPage}`}</p>
            </div>
            <nav>
              <ul className="list-style-none flex">
                <li>
                  <a
                    className={`cursor-pointer relative block px-5 py-3 text-p2 font-semibold  ${
                      currentPage === 1 ? "text-gray-300" : "text-green-500"
                    }`}
                    onClick={currentPage === 1 ? null : prevPage}
                  >
                    Previous
                  </a>
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
                  <a
                    className={`cursor-pointer relative block px-5 py-3 text-p2 font-semibold  ${
                      currentPage === nPage ? "text-gray-300" : "text-green-500"
                    }`}
                    onClick={currentPage === nPage ? null : nextPage}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* Empty */}
        {records.length == 0 && (
          <div className="py-20">
            <img src={Empty} className="h-56 mx-auto" />
            <p className="text-p3 mt-8 font-semibold text-gray-500 text-center">
              No. Resi yang Anda cari tidak ditemukan
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
