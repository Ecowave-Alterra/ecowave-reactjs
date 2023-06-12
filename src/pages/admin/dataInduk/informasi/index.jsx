import {
    Link,
    useNavigate,
    useSearchParams,
    useLocation,
} from "react-router-dom";
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
import useCrud from "../../../../hooks/FetchInformasi";
import { mutate } from "swr";
import InformationNotFound from "../../../../components/InformationNotFound";
import Cookies from "js-cookie";

export default function Informasi() {
    let [searchParams, setSearchParams] = useSearchParams();
    const [searchChanges, setSearchChanges] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    const searchValue = searchParams.get("search") || "";
    const filterValue = searchParams.get("filter") || "";
    const pageValue = searchParams.get("page") || 1;

    const swrKey = `admin/informations/search?search=${searchValue}&filter=${filterValue}&page=${pageValue}`;

    const updateSearchQuery = (newSearchValue) => {
        setSearchParams((params) => {
            const updatedParams = new URLSearchParams(params.toString());
            updatedParams.set("search", newSearchValue);
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
        console.log(event.target.name);

        if (event.target.name === "Semua") {
            updateFilter("");
        } else {
            updateFilter(event.target.name);
        }
    };

    const handleChange = (e) => {
        console.log(e.target.value);
        setSearchChanges(e.target.value);
        console.log(searchChanges);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchChanges !== searchValue) {
            updateSearchQuery(searchChanges);
        } else {
            alert("sama");
        }
    };

    const updateURL = () => {
        navigate({
            pathname: location.pathname,
            search: searchParams.toString(),
        });
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

    useEffect(() => {
        const search = searchParams.get("search") || "";
        const filter = searchParams.get("filter") || "";
        const pageValue = searchParams.get("page") || 1;
        const newSWRKey = `/api/data?search=${search}&filter=${filter}&page=${pageValue}`;
        // Memperbarui SWR key jika berbeda dengan key sebelumnya
        if (newSWRKey !== swrKey) {
            mutate(newSWRKey); // Memperbarui SWR dengan SWR key baru
        }
        updateURL();

        if (location.search === "") {
            setSearchParams({
                search: "",
                filter: "",
            });
        }
    }, [searchParams, swrKey, location.search]);

    const { data, isLoading, error } = useCrud(swrKey);
    if (error) return <div>error</div>;
    console.log(data);

    async function getCSVData() {
        const token = Cookies.get("token");
        const response = await fetch(`/admin/informations/download-csv`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log(data);
        return data;
    }

    return (
        <div className="sm:ml-[44px] sm:mr-8 mx-4">
            {/* header */}
            <div className="mt-16 flex flex-row justify-between items-center mb-9">
                <div className="">
                    <h4 className="text-h4 text-black">Informasi</h4>
                    <p className="text-p2 text-grey-500 mt-2">
                        Lihat, tambah, ubah, dan hapus data informasi.
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
                        onClick={() => navigate("/admin/informasi/tambah")}
                        className="flex flex-row gap-[13px] items-center rounded-full bg-green-500 py-[10px] pl-[21px] pr-4 hover:bg-green-600 duration-200"
                    >
                        <PlusSmallIcon className="w-[14px]  text-white " />
                        <p className=" text-p3 text-white">Tambah Informasi</p>
                    </button>
                </div>
            </div>
            <div className="mt-8 mb-9">
                <form onSubmit={handleSearch} className="flex flex-start">
                    <div className="flex flex-row gap-2 flex-start">
                        <Search
                            id="search-input"
                            placeholder="Cari ID atau nama informasi"
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            id="input-button"
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
                    buttons={["Semua", "Terbit", "Draft"]}
                    getData={getDataByStatus}
                />
            </div>

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
                    {isLoading ? (
                        <td>loading</td>
                    ) : (
                        <tbody className="">
                            {data && data.Status === 200 ? (
                                data.Informations.map((informasi, i) => (
                                    <tr key={i} className="even:bg-gray-50">
                                        <th
                                            scope="row"
                                            className="text-center font-normal w-[48px]"
                                        >
                                            {10 * (parseInt(data.Page) - 1) +
                                                i +
                                                1}
                                        </th>
                                        <td className="py-[18px] px-[10px] min-w-[100px]">
                                            {informasi.InformationiId}
                                        </td>
                                        <td className="py-[18px] px-[10px] w-full">
                                            {informasi.Title}
                                        </td>
                                        <td className="py-[18px] px-[10px] min-w-[80px]">
                                            {informasi.Status}
                                        </td>
                                        <td className="py-[18px] px-[10px] text-center flex space-x-2 justify-center w-[180px]">
                                            <div className="flex justify-start">
                                                <Link
                                                    to={
                                                        "/admin/informasi/" +
                                                        informasi.InformationiId
                                                    }
                                                    className="bg-green-50 rounded-full mx-2 py-[5px] px-[10px]"
                                                >
                                                    <EyeIcon className="w-5 h-5 text-green-500" />
                                                </Link>
                                                <Link
                                                    to={
                                                        "/admin/informasi/ubah/"
                                                    }
                                                    className="bg-green-50 rounded-full mx-2 py-[5px] px-[10px]"
                                                >
                                                    <PencilIcon className="w-5 h-5 text-green-500" />
                                                </Link>
                                                <button
                                                    className="bg-green-50 rounded-full mx-2 py-[5px] px-[10px]"
                                                    onClick={() =>
                                                        handleDelete()
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
                                    <td colSpan={5}>
                                        <InformationNotFound
                                            message={data.Message}
                                        />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    )}
                </table>
                {/* pagination */}
                {isLoading ? (
                    ""
                ) : (
                    <div className="mt-2">
                        {data.TotalPage >= 1 && (
                            <div className="flex justify-between w-full pb-2">
                                <div>
                                    <p className="text-p2 font-normal px-5 py-3 text-gray-500">{`Halaman ${data.Page} dari ${data.TotalPage}`}</p>
                                </div>
                                <nav>
                                    <ul className="list-style-none flex">
                                        <li>
                                            <button
                                                className={`cursor-pointer relative block px-5 py-3 text-p2 font-semibold  ${
                                                    data.Page === 1
                                                        ? "text-gray-300"
                                                        : "text-green-500"
                                                }`}
                                                onClick={prevPage}
                                                disabled={data.Page === 1}
                                            >
                                                Previous
                                            </button>
                                        </li>
                                        {Array.from(
                                            { length: data.TotalPage },
                                            (_, i) => i + 1
                                        ).map((n) => (
                                            <li key={n}>
                                                <p
                                                    className={`cursor-pointer relative block px-5 py-3 text-p2 font-semibold rounded-full text-green-500 ${
                                                        data.Page === n
                                                            ? "bg-green-500 text-white"
                                                            : "bg-green-50"
                                                    }`}
                                                    onClick={() =>
                                                        changePage(n)
                                                    }
                                                >
                                                    {n}
                                                </p>
                                            </li>
                                        ))}

                                        <li>
                                            <button
                                                className={`cursor-pointer relative block px-5 py-3 text-p2 font-semibold  ${
                                                    data.Page === data.TotalPage
                                                        ? "text-gray-300"
                                                        : "text-green-500"
                                                }`}
                                                onClick={nextPage}
                                                disabled={
                                                    data.Page === data.TotalPage
                                                }
                                            >
                                                Next
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
