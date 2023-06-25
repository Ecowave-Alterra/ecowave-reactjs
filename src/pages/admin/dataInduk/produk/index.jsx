import { useNavigate } from "react-router-dom";
import {
    PlusSmallIcon,
    EyeIcon,
    PencilIcon,
    ArrowDownTrayIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";

import ButtonGroup from "../../../../components/ButtonGroup";
import Search from "../../../../components/Search";
import { useState } from "react";
import { useGetData, useDeleteData } from "../../../../hooks/FetchData";
import { useSearchParams } from "react-router-dom";
import Alert from "../../../../components/Alert";
import Pagination from "../../../../components/Pagination";
import InformationNotFound from "../../../../components/InformationNotFound";
import ModalConfirm from "../../../../components/ModalConfirm";

export default function Produk() {
    // table setup
    const columns = [
        { header: "No." },
        { header: "Produk ID" },
        { header: "Nama Produk" },
        { header: "Kategori" },
        { header: "Stok" },
        { header: "Harga" },
        { header: "Status" },
        { header: "Action" },
    ];

    let [searchParams, setSearchParams] = useSearchParams();
    const [searchChanges, setSearchChanges] = useState("");
    const navigate = useNavigate();

    //get query string
    const searchValue = searchParams.get("search") || "";
    const filterValue = searchParams.get("filter") || "";
    const pageValue = searchParams.get("page") || 1;
    const swrKey = `admin/products/search?search=${searchValue}&filter=${filterValue}&page=${pageValue}`;

    //query string dikirim ke halaman tambah dan ubah
    const backValues = {
        search: searchValue,
        filter: filterValue,
        page: pageValue,
    };

    //alert fetching data
    const [isAlert, setIsAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState("");

    //query string handling
    const updateSearchQuery = (newSearchValue) => {
        setSearchParams((params) => {
        const updatedParams = new URLSearchParams(params.toString());
        updatedParams.set("search", newSearchValue);
        updatedParams.set("page", "1");
        return updatedParams;
        });
    };

    const updateFilter = (newFilterValue) => {
        setSearchParams((params) => {
        const updatedParams = new URLSearchParams(params.toString());
        updatedParams.set("filter", newFilterValue);
        updatedParams.set("page", "1");
        return updatedParams;
        });
    };

    const updatePagination = (newPaginationValue) => {
        setSearchParams((params) => {
        const updatedParams = new URLSearchParams(params.toString());
        updatedParams.set("page", newPaginationValue);
        return updatedParams;
        });
    };

    // pagination handling
    const prevPage = () => {
        updatePagination(parseInt(pageValue) - 1);
    };
    const nextPage = () => {
        updatePagination(parseInt(pageValue) + 1);
    };
    const changePage = (id) => {
        updatePagination(id);
    };

    const getDataByStatus = async (event) => {
        if (event.target.name === "Semua") {
        updateFilter("");
        } else {
        updateFilter(event.target.name);
        }
    };

    //search handling
    const handleChange = (e) => {
        setSearchChanges(e.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchChanges !== searchValue) {
        updateSearchQuery(searchChanges);
        }
    };

    //handling alert fetching data
    const openAlert = (variant, message) => {
        setIsAlert(true);
        setVariant(variant);
        setMessage(message);
        setTimeout(closeAlert, 2500);
    };
    const closeAlert = () => {
        setIsAlert(false);
        setVariant("");
        setMessage("");
    };

    //Handle delete
    const [deleteModalId, setDeleteModalId] = useState(null);

    const openDeleteModal = (id) => {
        setDeleteModalId(id);
      };
    
      const closeDeleteModal = () => {
        setDeleteModalId(null);
      };

    const handleDelete = async (id) => {
        const response = await deleteData(id);
        if (response.Status === 200) {
            openAlert("success", response.Message);
            navigate("?search=&page=1");
            closeDeleteModal();
            await mutate(swrKey);
        } else {
            closeDeleteModal();
            openAlert("danger", response.Message);
        }
    };

    const { data, isLoading, error } = useGetData(swrKey);
    const { deleteData, isLoading: loading } = useDeleteData(`admin/products/`);
    if (error) return <ErrorPage />;
    console.log(data);

    async function getCSVData() {
        alert("kurang csv");
    }

    return (
        <div className="sm:ml-[44px] sm:mr-8 mx-4">
        {isAlert && (
            <Alert variant={variant} message={message} onClose={closeAlert} />
        )}
        {/* header */}
        <div className="mt-16 flex flex-row justify-between items-center mb-9">
            <div className="">
            <h4 className="text-h4 text-black">Produk</h4>
            <p className="text-p2 text-grey-500 mt-2">
                Lihat, tambah, ubah, dan hapus Data Produk.
            </p>
            </div>
            <div className="flex flex-row gap-2 ">
            <button
                onClick={getCSVData}
                className="flex flex-row gap-[13px] items-center rounded-full border-gray-300 border  py-[10px] pl-[21px] pr-4 hover:bg-gray-50 duration-200"
            >
                <ArrowDownTrayIcon className="w-[14px]  text-gray-500 " />
                <p className=" text-p3 text-gray-600 font-semibold">
                Import dari CSV
                </p>
            </button>
            <button
                onClick={() => navigate("/admin/produk/tambah")}
                className="flex flex-row gap-[13px] items-center rounded-full bg-green-500 py-[10px] pl-[21px] pr-4 hover:bg-green-600 duration-200"
            >
                <PlusSmallIcon className="w-[14px] text-white " />
                <p className=" text-p3 text-white">Tambah Produk</p>
            </button>
            </div>
        </div>
        <div className="mt-8 mb-9">
            <form onSubmit={handleSearch} className="flex flex-start">
            <div className="flex flex-row gap-2 flex-start">
                <Search
                id="search-input"
                placeholder="Cari ID, Nama, atau kategori produk"
                onChange={handleChange}
                />
                <button
                type="submit"
                id="btn-input-search"
                className="gap-[13px] items-center rounded-full bg-green-500 py-[10px]  px-6 hover:bg-green-600 duration-200  text-p3 text-white"
                value={searchChanges}
                >
                Cari
                </button>
            </div>
            </form>
        </div>

        {/* filter table */}
        <div className="inline-flex flex-row gap-1 border-b-[2px] border-green-500 justify-start items-end">
            <ButtonGroup
            buttons={["Semua", "Tersedia", "Habis"]}
            getData={getDataByStatus}
            />
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-3">
            <table className="w-full min-w-[1000px] text-p4 text-left  text-black">
            <thead className="text-p3 text-white bg-green-500 ">
                <tr>
                {columns.map((head, i) => (
                    <th key={i} className="py-[14px] px-[10px] text-p2 font-medium">
                    {head.header}
                    </th>
                ))}
                </tr>
            </thead>
            {isLoading || loading ? (
                <tbody>
                <tr className="">
                    <td colSpan={8} className="mx-auto py-40">
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
                    data.Products.map((item, i) => (
                    <tr key={i} className="even:bg-gray-50">
                        <th
                        scope="row"
                        className="text-center font-normal w-[48px]"
                        >
                        {10 * (parseInt(data.Page) - 1) + i + 1}
                        </th>
                        <td className="py-[18px] px-[10px] min-w-[160px]">
                        {item.ProductId}
                        </td>
                        <td className="py-[18px] px-[10px] w-full">{item.Name}</td>
                        <td className="py-[18px] px-[10px] min-w-[135px]">
                        {item.Category}
                        </td>
                        <td className="py-[18px] px-[10px] min-w-[75px]">
                        {item.Stock}
                        </td>
                        <td className="py-[18px] px-[10px] min-w-[135px]">
                        RP.{item.Price}
                        </td>
                        <td className="py-[18px] px-[10px] min-w-[135px]">
                        {item.Status}
                        </td>
                        <td className="py-[18px] px-[10px] text-center flex space-x-2 justify-center w-[180px]">
                        <div className="flex justify-start">
                            <button
                            onClick={() =>
                                navigate("/admin/produk/" + item.ProductId, {
                                state: backValues,
                                })
                            }
                            className="bg-green-50 rounded-full mx-2 py-[5px] px-[10px]"
                            >
                            <EyeIcon className="w-5 h-5 text-green-500" />
                            </button>
                            <button
                            onClick={() =>
                                navigate("/admin/produk/ubah/" + item.ProductId, {
                                state: backValues,
                                })
                            }
                            className="bg-green-50 rounded-full mx-2 py-[5px] px-[10px]"
                            >
                            <PencilIcon className="w-5 h-5 text-green-500" />
                            </button>
                            <button
                            id="btn_delete_product"
                            className="bg-green-50 rounded-full mx-2 py-[5px] px-[10px]"
                            onClick={() => openDeleteModal(item.ProductId)}
                            >
                            <TrashIcon className="w-5 h-5 text-error-500" />
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr className="row-span-3 w-full">
                    <td colSpan={8}>
                        <InformationNotFound message={data.Message} />
                    </td>
                    </tr>
                )}
                </tbody>
            )}
            </table>
        </div>
        {/* Pagination */}
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
              {/* Modals */}
      {deleteModalId && (
        <ModalConfirm
          title="Hapus produk yang dipilih?"
          description={`Produk dengan ID ${deleteModalId} yang dipilih akan dihapus secara permanen`}
          labelCancel="Batal"
          labelConfirm="Hapus"
          variant="danger"
          onCancel={closeDeleteModal}
          onConfirm={() => handleDelete(deleteModalId)}
        />
      )}
        </div>
    );
}
