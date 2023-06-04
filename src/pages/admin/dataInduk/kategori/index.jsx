import React from 'react'
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import Search from "../../../../components/Search";
import TambahKategoriModal from "../../../../components/TambahKategoriModal";

import { useState } from "react";

export default function Kategori() {
    let [isOpen, setIsOpen] = useState(false);

    // const handleOpenModal = () => {
    //     setShowModal(true);
    // };

    // const handleCloseModal = () => {
    //     setShowModal(false);
    // };

    return (
        <div className="sm:ml-[44px] sm:mr-8 mx-4 ">
            {/* header */}
            <div className="mt-16 mb-9 flex flex-row justify-between items-center">
                <div className="">
                    <h4 className="text-h4 text-black">Informasi</h4>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex flex-row gap-[13px] items-center rounded-full bg-green-500 py-[10px] pl-[21px] pr-4 hover:bg-green-600 duration-200"
                >
                    <PlusSmallIcon className="w-[14px]  text-white " />
                    <p className=" text-p3 text-white">Tambah kategori</p>
                </button>
            </div>
            <Search placeholder="Cari Nama Kategori" />
            <TambahKategoriModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
}
