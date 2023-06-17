import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

// Komponen
import ButtonGroup from "../../../../components/ButtonGroup";
import Empty from "../../../../assets/img/Empty Voucher.png";
import ModalConfirm from "../../../../components/ModalConfirm";
import Alert from "../../../../components/Alert";
import Pagination from "../../../../components/Pagination";
import EmptyData from "../../../../components/EmptyData";

// Ikon & Gambar
import {
  PencilIcon,
  TrashIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";

import {
  useDeleteKategori,
  useGetAllCategory,
} from "../../../../hooks/FetchKategori";

const Voucher = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [showModal, setShowModal] = useState();
  const navigate = useNavigate();

  const filterValue = searchParams.get("filter") || "";
  const pageValue = searchParams.get("page") || 1;
  
  // Data request
  const swrKey = `admin/vouchers?page=${pageValue}`;
  const { data, isLoading, error } = useGetAllCategory(swrKey);
  
  const { deleteData, isLoading: loading } = useDeleteKategori(
    `admin/products/category/`
    );
    

  // fungsi untuk filter
  const updateFilter = (newFilterValue) => {
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params.toString());
      updatedParams.set("filter", newFilterValue);
      updatedParams.set("page", "1");
      return updatedParams;
    });
  };

  const getDataByStatus = async (event) => {
    console.log(event.target.name);

    if (event.target.name === "Semua") {
      updateFilter("");
    } else {
      updateFilter(event.target.name);
    }
  };

  // Fungsi untuk pagination
  const updatePagination = (newPaginationValue) => {
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params.toString());
      updatedParams.set("page", newPaginationValue);
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

  const closeModal = () => {
    setShowModal(false);
  };

  const TABLE_COLUMS = [
    { header: "No." },
    { header: "Jenis Voucher" },
    { header: "Sisa Klaim Voucher" },
    { header: "Tanggal Mulai" },
    { header: "Tanggal Berakhir" },
    { header: "Aksi" },
  ];

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
          <p className=" text-p3 text-white">Tambah Voucher</p>
        </button>
      </div>

      {/* Button grub */}
      <div className="space-x-1 text-p3 mt-7 border-b-2 inline-flex border-b-green-500">
        <ButtonGroup
          buttons={["Semua", "Gratis Ongkir", "Diskon Belanja"]}
          getData={getDataByStatus}
        />
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto mt-3">
        <table className="w-full min-w-[1000px] text-p4 text-left text-black">
          <thead className="bg-green-500 text-white">
            <tr>
              {TABLE_COLUMS.map((head, i) => (
                <th
                  key={i}
                  className="py-[14px] px-[10px] text-p2 font-medium text-center"
                >
                  {head.header}
                </th>
              ))}
            </tr>
          </thead>
          {isLoading ? (
            <tbody>
              <tr className="">
                <td colSpan={3} className="mx-auto py-40">
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
                data.Vouchers.map((voucher, index) => (
                  <tr
                    key={index}
                    className="even:bg-gray-50 text-p4 text-center"
                  >
                    <th
                      scope="row"
                      className="text-center font-normal w-[48px]"
                    >
                      {10 * (parseInt(data.Page) - 1) + index + 1}
                    </th>
                    <td className="py-[18px] px-[10px] min-w-[150px] text-left">
                      {voucher.Type}
                    </td>
                    <td className="py-[18px] px-[10px] min-w-[70px]">
                      {voucher.ClaimableUserCount}
                    </td>
                    <td className="py-[18px] px-[10px]">{voucher.StartDate}</td>
                    <td className="py-[18px] px-[10px]">{voucher.EndDate}</td>
                    <td className="py-[18px] px-[10px] text-center flex space-x-2 justify-center">
                      <div className="flex">
                        <Link
                          to={`/admin/voucher/ubah/${voucher.VoucherId}`}
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
                ))
              ) : (
                <tr className="row-span-3 w-full">
                  <td colSpan={3}>
                    <EmptyData image={Empty} message={data.Message} />
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
      {/* pagination */}
      {isLoading ? (
        ""
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

      <button className="bg-green-300" onClick={() => setShowModal(true)}>
        Modal
      </button>
      {showModal && (
        <Alert
          variant="danger"
          message="Halddddddddd Laert"
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Voucher;
