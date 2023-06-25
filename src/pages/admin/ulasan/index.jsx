import React from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";

// Komponen
import Search from "../../../components/Search";
import Pagination from "../../../components/Pagination";
import EmptyData from "../../../components/EmptyData";
import { useGetData } from "../../../hooks/FetchData";

// Ikon & Gambar
import { EyeIcon } from "@heroicons/react/24/outline";
import Empty from "../../../assets/img/File Not Found.png";

export default function Ulasan() {
  // handle url params
  let [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";
  const pageValue = searchParams.get("page") || 1;

  // Fetch data SWR
  const swrKey = `admin/reviews/search?search=${searchValue}&page=${pageValue}`;
  const { data, isLoading, error } = useGetData(swrKey);
  if (error) return <div>error</div>;
  console.log("data", data);
  console.log("error", error);

  // Fungsi untuk pagination
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

  // Fungsi Handler Search
  const updateSearchQuery = (newSearchValue) => {
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params.toString());
      updatedParams.set("search", newSearchValue);
      return updatedParams;
    });
  };

  // Handle Search on Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      updateSearchQuery(event.target.value);
    }
  };
  // Table Setup
  const TABLE_COLUMS = [
    { header: "No." },
    { header: "Produk ID" },
    { header: "Nama Produk" },
    { header: "Kategori" },
    { header: "Ulasan Diterima" },
    { header: "Tindakan" },
  ];

  return (
    <div className="flex-row sm:ml-[44px] sm:mr-8 mx-4 mt-10">
      {/* header */}
      <div className="text-h4 mb-2">Ulasan</div>
      {/* Search */}
      <div className="mt-7">
        <Search
          id="search-ulasan"
          placeholder="Cari item ID, nama produk"
          handleKeyDown={handleKeyDown}
        />
      </div>
      {/* Table */}
      <div className="overflow-x-auto mt-3">
        <table className="w-full min-w-[1000px] text-p4 text-left text-black mt-4">
          <thead className="bg-green-500 text-white">
            <tr>
              {TABLE_COLUMS &&
                TABLE_COLUMS.map((head, i) => (
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
            <tbody>
            <tr className="">
              <td colSpan={6} className="mx-auto py-40">
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
              {data &&
                data.Status == 200 &&
                data.Reviews.map((review, index) => (
                  <tr key={index} className="even:bg-gray-50 text-p4 text-left">
                    <td className="py-[18px] text-center w-[73px]">
                      {10 * (parseInt(data.Page) - 1) + index + 1}.
                    </td>
                    <td className="py-[18px] px-[10px] min-w-[100px]">
                      {review.ProductID}
                    </td>
                    <td className="py-[18px] px-[10px] min-w-[100px]">
                      {review.Name}
                    </td>
                    <td className="py-[18px] px-[10px] min-w-[100px]">
                      {review.Category}
                    </td>
                    <td className="py-[18px] px-[10px] min-w-[100px] w-[200px]">
                      {review.ReviewQty}
                    </td>
                    <td className="py-[18px] px-[10px] w-[100px] flex space-x-4 justify-center">
                      <Link id="btn_view_ulasan" to={`/admin/ulasan/${review.ProductID}`}>
                        <EyeIcon className="w-5 h-5 text-green-500" />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>

        {/* Empty */}
        {data && data.Status == 404 && (
            <EmptyData
              image={Empty}
              message="No. Resi yang Anda cari tidak ditemukan"
            />
          )}
      </div>
      {/* Pagination */}
      {data && data.Status == 200 && (
        <Pagination
          currentPage={data.Page}
          totalPage={data.TotalPage}
          onPrev={prevPage}
          onChange={changePage}
          onNext={nextPage}
        />
      )}
    </div>
  );
}
