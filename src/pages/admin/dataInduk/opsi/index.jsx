import { useState } from 'react';
import { TrashIcon, PlusSmallIcon } from '@heroicons/react/24/outline';

import Search from '../../../../components/Search';
import Empty from '../../../../assets/img/emptyOpsi.png';

import ModalAdd from './modalAdd';
import ModalDel from './modalDel';

export default function OpsiPengiriman() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // Modals konfirmasi delete
  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleDelete = () => {
    closeDeleteModal();
  };

  // Modals add
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const opsi = [
    {
      id: 2,
      opsiPengiriman: 'JNE',
    },
    {
      id: 3,
      opsiPengiriman: 'Pos Indonesia',
    },
    {
      id: 4,
      opsiPengiriman: 'TIKI',
    },
  ];

  // Handle search
  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  return (
    <div className="sm:ml-[44px] sm:mr-8 mx-4">
      <div className="mt-16 flex flex-row justify-between items-center">
        <h4 className="text-h4">Opsi Pengiriman</h4>
        <div className="flex gap-2 ">
          <button
            onClick={openModal}
            className="flex gap-[13px] items-center rounded-full bg-green-500 py-[10px] pl-[21px] pr-4 hover:bg-green-600 duration-200"
          >
            <PlusSmallIcon className="w-[14px]  text-white " />
            <p className=" text-p3 text-white">Tambah Data</p>
          </button>
        </div>
      </div>
      {/* Search */}
      <div className="mt-7">
        <Search
          id="search-pesanan"
          placeholder="Cari Nama Opsi Pengiriman"
          onChange={handleChange}
        />
      </div>

      {/* table */}
      <div className="relative overflow-x-auto mt-9">
        <table className="w-full text-p4 text-left text-black">
          <thead className="text-p3 text-white bg-green-500 ">
            <tr className="py-[14px] px-[10px] text-center">
              <th className="py-[14px] px-[10px]">No.</th>
              <th className="py-[14px] px-[10px]">Opsi Pengiriman</th>
              <th className="py-[14px] px-[10px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {opsi.map((item, i) => (
              <tr key={i} className="even:bg-gray-50 ">
                <th scope="row" className="text-center font-normal">
                  {i + 1}
                </th>
                <td className="py-[18px] px-[10px] text-center">
                  {item.opsiPengiriman}
                </td>
                <td className="py-[18px] px-[10px] text-center  flex space-x-2 justify-center">
                  <TrashIcon
                    onClick={openDeleteModal}
                    className="w-7 h-5 text-error-500 bg-green-50 rounded-full cursor-pointer "
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty */}
        {opsi.length == 0 && (
          <div className="py-16">
            <img src={Empty} className="h-52 mx-auto" />
            <p className="text-p3 font-semibold mt-7 text-gray-500 text-center">
              Belum ada list Opsi Pengiriman
            </p>
          </div>
        )}
      </div>
      {/* Modals */}
      {modalOpen && <ModalAdd closeModal={closeModal} />}
      {deleteModal && (
        <ModalDel
          isOpen={openDeleteModal}
          onCancel={closeDeleteModal}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
