import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Komponen
import ButtonGroup from "../../../../components/ButtonGroup";


// Ikon & Gambar
import { EyeIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import Empty from "../../../../assets/img/Empty Voucher.png";

const Voucher = () => {
  const [itemList, setItemList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = itemList.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(itemList.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);
  const [tabMenu, setTabMenu] = useState([
    "Semua",
    "Gratis Ongkir",
    "Diskon Belanja",
  ]);
  const navigate = useNavigate();
  const getDataByStatus = (event) => {
    console.log(event.target.name);
    //do some stuff here
  };

  const columns = [
    { header: "No." },
    { header: "Jenis Voucher" },
    { header: "Sisa Klaim Voucher" },
    { header: "Tanggal Mulai" },
    { header: "Tanggal Berakhir" },
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
    // setItemList(data);
  }, []);

  return (
    <div className="flex-row px-5 py-10">
      <div className="flex justify-between items-center">
        {/* header */}
        <div className="text-h4 mb-2">Voucher</div>

        <button
          onClick={() => navigate("/admin/voucher/tambah")}
          className="flex flex-row gap-[13px] items-center rounded-full bg-green-500 py-[10px] pl-[21px] pr-4 hover:bg-green-600 duration-200"
        >
          <PlusSmallIcon className="w-[14px]  text-white " />
          <p className=" text-p3 text-white">Tambah</p>
        </button>
      </div>

      {/* Button grub */}
      <div className="space-x-1 text-p3 mt-7 border-b-2 inline-flex border-b-green-500">
        <ButtonGroup buttons={tabMenu} getData={getDataByStatus} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border-[1px] border-gray-500 rounded-md relative mt-3">
        <table className="w-full text-left whitespace-nowrap table-auto">
          <thead className="bg-green-500 text-white">
            <tr>
              {columns &&
                columns.map((head) => (
                  <th className="py-[14px] px-[10px] text-p2 font-medium text-center">
                    {head.header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {itemList &&
              records.map((row, index) => (
                <tr key={index} className="even:bg-gray-50 text-p4 text-center">
                  <td className="py-[18px] px-[10px]">
                    {firstIndex + index + 1}.
                  </td>
                  <td className="py-[18px] px-[10px]">{row.no}</td>
                  <td className="py-[18px] px-[10px]">{row.nama}</td>
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

        {/* Empty */}
        {records.length == 0 && (
          <div className="py-20">
            <img src={Empty} className="h-56 mx-auto" />
            <p className="text-p3 mt-8 font-semibold text-gray-500 text-center">
              Belum ada list voucher
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Voucher;
