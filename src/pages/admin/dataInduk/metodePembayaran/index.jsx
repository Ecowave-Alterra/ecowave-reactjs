import { useNavigate } from "react-router-dom";
import { PlusSmallIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import ButtonGroup from "../../../../components/ButtonGroup";

export default function MetodePembayaran() {
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
                    <h4 className="text-h4 text-black">Metode Pembayaran</h4>
                </div>
                <div className="flex flex-row gap-2 ">
                    <button
                        onClick={() => navigate("/admin/pembayaran/tambah")}
                        className="flex flex-row gap-[13px] items-center rounded-full bg-green-500 py-[10px] pl-[21px] pr-4 hover:bg-green-600 duration-200"
                    >
                        <PlusSmallIcon className="w-[14px]  text-white " />
                        <p className=" text-p3 text-white">Tambah Data</p>
                    </button>
                </div>
            </div>

            {/* table */}
            <div className="inline-flex flex-row gap-1 border-b-[2px] border-green-500 justify-start items-end">
                <ButtonGroup
                    buttons={["Semua", "Tersedia", "Habis"]}
                    getData={getDataByStatus}
                />
            </div>
        </div>
    );
}
