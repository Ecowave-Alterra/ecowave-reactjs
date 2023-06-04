import { Link, useNavigate } from "react-router-dom";
import {
    PlusSmallIcon,
    ArrowDownTrayIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import ButtonGroup from "../../../../components/ButtonGroup";

import Search from "../../../../components/Search";
import { useEffect, useState } from "react";

export default function Informasi() {
    const [itemList, setItemList] = useState([]);
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
        { header: "Id" },
        { header: "Judul" },
        { header: "Status" },
        { header: "Action" },
    ];

    const informasi = [
        {
            Id: 1,
            judul: "judul informasi 1",
            status: "draft",
        },
        {
            Id: 1,
            judul: "judul informasi 2",
            status: "draft",
        },
        {
            Id: 1,
            judul: "judul informasi 3",
            status: "draft",
        },
        {
            Id: 1,
            judul: "judul informasi 4",
            status: "draft",
        },
        {
            Id: 1,
            judul: "judul informasi 5",
            status: "draft",
        },
    ];

    useEffect(() => {
        setItemList(informasi);
    }, []);

    return (
        <div className="sm:ml-[44px] sm:mr-8 mx-4">
            {/* header */}
            <div className="mt-16 flex flex-row justify-between items-center">
                <div className="">
                    <h4 className="text-h4 text-black">Informasi</h4>
                    <p className="text-p2 text-grey-500 mt-2">
                        Lihat, tambah, ubah, dan hapus data informasi.
                    </p>
                </div>
                <div className="flex flex-row gap-2 ">
                    <button className="flex flex-row gap-[13px] items-center rounded-full border-gray-300 border  py-[10px] pl-[21px] pr-4 hover:bg-gray-50 duration-200">
                        <ArrowDownTrayIcon className="w-[14px]  text-gray-500 " />
                        <p className=" text-p3 text-gray-600 font-semibold">
                            Import dari CSV
                        </p>
                    </button>
                    <button
                        onClick={() => navigate("/admin/informasi/tambah")}
                        className="flex flex-row gap-[13px] items-center rounded-full bg-green-500 py-[10px] pl-[21px] pr-4 hover:bg-green-600 duration-200"
                    >
                        <PlusSmallIcon className="w-[14px]  text-white " />
                        <p className=" text-p3 text-white">Tambah Informasi</p>
                    </button>
                </div>
            </div>
            <div className="mt-8 mb-9">
                <Search
                    id="search-"
                    placeholder="Cari ID atau nama informasi"
                    onChange={handleChange}
                />
            </div>

            {/* filter table */}
            <div className="inline-flex flex-row gap-1 border-b-[2px] border-green-500 justify-start items-end">
                <ButtonGroup
                    buttons={["Semua", "Terbit", "Draft"]}
                    getData={getDataByStatus}
                />
            </div>

            {/* table */}
            {/* Table */}
            <div className="overflow-x-auto mt-3">
                <table className="w-full min-w-[1000px] text-p4 text-left text-black">
                    <thead className="text-p3 text-white bg-green-500 ">
                        <tr>
                            {columns.map((head, i) => (
                                <th
                                    key={i}
                                    className="py-[14px] px-[10px] text-p2 font-medium"
                                >
                                    {head.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {itemList &&
                            itemList.map((item, i) => (
                                <tr key={i} className="even:bg-gray-50 ">
                                    <th
                                        scope="row"
                                        className="text-center font-normal w-[48px]"
                                    >
                                        {i + 1}
                                    </th>
                                    <td className="py-[18px] px-[10px] min-w-[100px]">
                                        {item.Id}
                                    </td>
                                    <td className="py-[18px] px-[10px] w-full">
                                        {item.judul}
                                    </td>
                                    <td className="py-[18px] px-[10px] min-w-[80px]">
                                        {item.status}
                                    </td>
                                    <td className="py-[18px] px-[10px] text-center flex space-x-2 justify-center  w-[180px]">
                                        <div className="flex justify-start">
                                            <Link
                                                to={"/admin/informasi/detail"}
                                                className="bg-green-50 rounded-full mx-2 py-[5px] px-[10px]"
                                            >
                                                <EyeIcon className="w-5 h-5 text-green-500" />
                                            </Link>
                                            <Link
                                                to={"/admin/informasi/ubah"}
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
        </div>
    );
}
