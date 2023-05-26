import { useNavigate } from "react-router-dom";
import { PlusSmallIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import ButtonGroup from "../../../../components/ButtonGroup";

export default function Informasi() {
    const navigate = useNavigate();
    const getDataByStatus = (event) => {
        console.log(event.target.name);
        //do some stuff here
    };

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

            {/* table */}
            <div className="inline-flex flex-row gap-1 border-b-[2px] border-green-500 justify-start items-end">
                <ButtonGroup
                    buttons={["Semua", "Terbit", "Draft"]}
                    getData={getDataByStatus}
                />
            </div>
        </div>
    );
}
