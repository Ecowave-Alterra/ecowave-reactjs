import React, { useEffect } from "react";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import Search from "../../../../components/Search";
import TambahKategoriModal from "../../../../components/TambahKategoriModal";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useCrud from "../../../../hooks/FetchInformasi";
import { mutate } from "swr";

export default function Kategori() {
    let [isOpen, setIsOpen] = useState(false);

    let [searchParams, setSearchParams] = useSearchParams();
    const [searchChanges, setSearchChanges] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    const searchValue = searchParams.get("search") || "";
    const pageValue = searchParams.get("page") || 1;

    const swrKey = `admin/products/category/search?name=${searchValue}&page=1`;
    // const swrKey = `admin/products/category/search?name=${searchValue}&page=${pageValue}`;

    const updateSearchQuery = (newSearchValue) => {
        setSearchParams((params) => {
            const updatedParams = new URLSearchParams(params.toString());
            updatedParams.set("search", newSearchValue);
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
        { header: "Nama" },
        { header: "Action" },
    ];

    useEffect(() => {
        const search = searchParams.get("search") || "";
        const pageValue = searchParams.get("page") || 1;
        // const newSWRKey = `/api/data?search=${search}&filter=${filter}&page=${pageValue}`;
        const newSWRKey = `admin/products/category/search?name=${search}&page=${pageValue}`;
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

    return (
        <div className="sm:ml-[44px] sm:mr-8 mx-4 ">
            {/* header */}
            <div className="mt-16 mb-9 flex flex-row justify-between items-center">
                <div className="">
                    <h4 className="text-h4 text-black">Kategori</h4>
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
