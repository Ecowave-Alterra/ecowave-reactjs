import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { mutate } from "swr";

import {
    PencilIcon,
    PlusSmallIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";

import Search from "../../../../components/Search";
import InformationNotFound from "../../../../components/InformationNotFound";
import Pagination from "../../../../components/Pagination";
import Alert from "../../../../components/Alert";
import ModalConfirm from "../../../../components/ModalConfirm";
import EditKategoriModal from "../../../../components/EditKategoriModel";
import TambahKategoriModal from "../../../../components/TambahKategoriModal";
import { useDeleteData, useGetData } from "../../../../hooks/FetchData";
import ErrorPage from "../../../../components/ErrorPage";

export default function Kategori() {
    const navigate = useNavigate();
    //modal tambah dan edit data
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [categoryId, setCategoryId] = useState("");

    //alert fetching data
    const [isAlert, setIsAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState("");

    // Handle delete
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [categoryName, setCategoryName] = useState();

    //query strings for data fetching
    const [searchParams, setSearchParams] = useSearchParams();
    const searchValue = searchParams.get("search") || "";
    const pageValue = searchParams.get("page") || 1;

    const swrKey = `admin/products/category/search?name=${searchValue}&page=${pageValue}`;
    const { data, isLoading, error } = useGetData(swrKey);
    const { deleteData, isLoading: loading } = useDeleteData(
        `admin/products/category/`
    );

    //search handling
    const updateSearchQuery = (newSearchValue) => {
        setSearchParams((params) => {
            const updatedParams = new URLSearchParams(params.toString());
            updatedParams.set("search", newSearchValue);
            updatedParams.set("page", "1");
            return updatedParams;
        });
    };

    // Handle Search on Enter
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
        updateSearchQuery(event.target.value);
        }
    };

    // pagination handling
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

    // handle edit
    const openModalEdit = (isOpenModal, idCategory) => {
        setIsOpenEdit(isOpenModal);
        setCategoryId(idCategory);
    };

    // handle delete
    const openConfirmDelete = (id, category) => {
        setShowModalDelete(true);
        setDeleteId(id);
        setCategoryName(category)
      };
    
      const closeConfirmDelete = () => {
        setShowModalDelete(false);
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

    const handleDelete = async () => {
        const response = await deleteData(deleteId);
        if (response.Status === 200) {
            openAlert("success", response.Message);
            setShowModalDelete(false);
            navigate("?search=&page=1");
            await mutate(swrKey);
        } else {
            openAlert("danger", response.Message);
            setShowModalDelete(false);
        }
    };

    // table header
    const TABLE_COLUMS = [
        { header: "No." },
        { header: "Nama" },
        { header: "Action" },
    ];

    if (error) return <ErrorPage />;

    return (
        <div className="sm:ml-[44px] sm:mr-8 mx-4 relative">
            {/* confirm delete */}
            {showModalDelete && (
                <ModalConfirm
                    title="Hapus kategori yang dipiih?"
                    description={`Kategori dengan nama ${categoryName} akan dihapus secara permanen`}
                    onCancel={closeConfirmDelete}
                    onConfirm={handleDelete}
                    labelCancel="batal"
                    labelConfirm="hapus"
                    variant="danger"
                />
            )}
            {/* alert fetch api */}
            {isAlert && (
                <Alert
                    variant={variant}
                    message={message}
                    onClose={closeAlert}
                />
            )}
            ;{/* header */}
            <div className="mt-16 mb-9 flex flex-row justify-between items-center">
                <div className="">
                    <h4 className="text-h4 text-black">Kategori</h4>
                </div>
                <button
                    onClick={() => setIsOpenAdd(true)}
                    className="btn_open_modal_tambah flex flex-row gap-[13px] items-center rounded-full bg-green-500 py-[10px] pl-[21px] pr-4 hover:bg-green-600 duration-200"
                    id="btn_open_modal_tambah"
                >
                    <PlusSmallIcon className="w-[14px]  text-white " />
                    <p className=" text-p3 text-white">Tambah kategori</p>
                </button>
            </div>
            <div className="mt-8 mb-9">
                    <div className="flex flex-row gap-2 flex-start">
                        <Search
                            id="search-input"
                            placeholder="Cari nama kategori"
                            handleKeyDown={handleKeyDown}
                        />
                    </div>
            </div>
            <div className="overflow-x-auto mt-3">
                <table className="w-full min-w-[1000px] text-p4 text-left  text-black">
                    <thead className="text-p3 text-white bg-green-500 ">
                        <tr>
                            {TABLE_COLUMS.map((head, i) => (
                                <th
                                    key={i}
                                    className="py-[14px] px-[10px] text-p2 font-medium"
                                >
                                    {head.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {isLoading || loading ? (
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
                        <tbody className="">
                            {data && data.Status === 200 ? (
                                data.ProductCategory.map((category, i) => (
                                    <tr key={i} className="even:bg-gray-50">
                                        <th
                                            scope="row"
                                            className="text-center font-normal w-[48px]"
                                        >
                                            {10 * (parseInt(data.Page) - 1) +
                                                i +
                                                1}
                                        </th>
                                        <td className="py-[18px] px-[10px] min-w-[300px] ">
                                            {category.Category}
                                        </td>
                                        <td className="py-[18px] px-[10px] text-center flex space-x-2 justify-center w-[150px] ">
                                            <div className="flex justify-start ">
                                                <button
                                                    onClick={() =>
                                                        openModalEdit(
                                                            true,
                                                            category.Id
                                                        )
                                                    }
                                                    className="btn_open_modal_edit bg-green-50 rounded-full mx-2 py-[5px] px-[10px]"
                                                    id="btn_open_modal_edit"
                                                >
                                                    <PencilIcon className="w-5 h-5 text-green-500" />
                                                </button>
                                                <button
                                                    className="btn_handle_delete bg-green-50 rounded-full mx-2 py-[5px] px-[10px]"
                                                    id="btn_handle_delete"
                                                    onClick={() =>
                                                        openConfirmDelete(category.Id, category.Category)
                                                      }
                                                >
                                                    <TrashIcon className="w-5 h-5 text-error-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="row-span-3 w-full">
                                    <td colSpan={3}>
                                        <InformationNotFound
                                            message={data.Message}
                                        />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    )}
                </table>
            </div>
            {/* pagination */}
            {isLoading || loading ? (
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
            <EditKategoriModal
                isOpen={isOpenEdit}
                setIsOpen={setIsOpenEdit}
                categoryId={categoryId}
                openAlert={openAlert}
            />
            <TambahKategoriModal
                isOpen={isOpenAdd}
                setIsOpen={setIsOpenAdd}
                openAlert={openAlert}
            />
        </div>
    );
}
