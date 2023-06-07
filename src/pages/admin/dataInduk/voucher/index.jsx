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

const Voucher = () => {
  const [showModal, setShowModal] = useState(true);
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
        <table className="w-full text-left whitespace-nowrap table-auto">
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
              Belum ada list voucher
            </p>
          </div>
        )}
      </div>
      {/* Modal */}
      {showModal && (
        <Alert onClose={closeModal} variant="danger" message="message" />
      )}
      {/* {showModal && (
        <ModalConfirm
          title="Modal1 fdfd dfdfetr f hhrtghrtgrg"
          description="description ini adalahdad dsdssd sdsihteg dsretetg?"
          labelCancel="Batal"
          labelConfirm="Lanjut"
          onCancel={closeModal}
          onConfirm={closeModal}
          variant="danger"
        />
      )} */}
    </div>
  );
};

export default Voucher;
