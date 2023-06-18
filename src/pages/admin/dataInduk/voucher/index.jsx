import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Komponen
import ButtonGroup from "../../../../components/ButtonGroup";

// Ikon & Gambar
import {
  PencilIcon,
  TrashIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import Empty from "../../../../assets/img/Empty Voucher.png";
import ModalConfirm from "../../../../components/ModalConfirm";
import Alert from "../../../../components/Alert";
import Pagination from "../../../../components/Pagination";
import EmptyData from "../../../../components/EmptyData";

const Voucher = () => {
  const [showModal, setShowModal] = useState();
  const [itemList, setItemList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = itemList.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(itemList.length / recordPerPage);
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

  const closeModal = () => {
    setShowModal(false);
  };

  const voucher = [
    {
      jenis: "Gratis Ongkir",
      sisa: 1000,
      mulai: "27 Mei 2023",
      brakhir: "1 jan 2024",
    },
    {
      jenis: "Diskon Belanja",
      sisa: 1000,
      mulai: "27 Mei 2023",
      brakhir: "1 jan 2024",
    },
  ];

  useEffect(() => {
    setItemList(voucher);
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
      <div className="relative overflow-x-auto mt-3">
        <table className="w-full min-w-[1000px] text-p4 text-left text-black">
          <thead className="bg-green-500 text-white">
            <tr>
              {columns &&
                columns.map((head, i) => (
                  <th
                    key={i}
                    className="py-[14px] px-[10px] text-p2 font-medium text-center"
                  >
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
                  <td className="py-[18px] px-[10px] min-w-[150px] text-left">
                    {row.jenis}
                  </td>
                  <td className="py-[18px] px-[10px] min-w-[70px]">
                    {row.sisa}
                  </td>
                  <td className="py-[18px] px-[10px]">{row.mulai}</td>
                  <td className="py-[18px] px-[10px]">{row.brakhir}</td>
                  <td className="py-[18px] px-[10px] text-center flex space-x-2 justify-center">
                    <div className="flex">
                      <Link
                        to="/admin/voucher/ubah"
                        className="bg-green-50 rounded-full mx-2"
                      >
                        <PencilIcon className="w-5 h-5 text-green-500" />
                      </Link>
                      <div className="bg-green-50 rounded-full mx-2">
                        <TrashIcon className="w-5 h-5 text-error-500" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Empty */}
        {records.length == 0 && (
          <EmptyData image={Empty} message="Belum ada list voucher" />
        )}
      </div>
      {/* Pagination */}
      {records.length >= 1 && (
        <Pagination
          currentPage={currentPage}
          totalPage={nPage}
          onPrev={prevPage}
          onChange={changePage}
          onNext={nextPage}
        />
      )}

      <button className="bg-green-300" onClick={() => setShowModal(true)}>
        Modal
      </button>
      {showModal && (
        <Alert variant="danger" message="Halddddddddd Laert" onClose={closeModal} />
      )}
    </div>
  );
};

export default Voucher;
