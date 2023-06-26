import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Link, useParams, useSearchParams, useLocation, useNavigate } from "react-router-dom";

// Komponen
import Empty from "../../../assets/img/Empty Voucher.png";
import CardReview from "../../../components/CardReview";
import Pagination from "../../../components/Pagination";
import EmptyData from "../../../components/EmptyData";

// Fetch
import { useGetData } from "../../../hooks/FetchData";

function DetailUlasan() {
  // Get param id
  let { reviewId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const pageValue = searchParams.get("page") || 1;

  // Fungsi fetch data SWR
  const swrKey = `admin/reviews/${reviewId}?page=${pageValue}`;
  const { data, isLoading, error } = useGetData(swrKey);

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

  // Tabel Setup
  const TABLE_COLUMS = [
    { header: "Konten" },
    { header: "Rating" },
    { header: "Nama Produk" },
  ];

  return (
    <div className="flex-row sm:ml-[44px] mx-4 mt-10">
      {/* header */}
      <div className="flex justify-start items-center">
        <button id="btn_back" onClick={() => navigate(`/admin/ulasan?search=${location.state.search}&page=${location.state.page}`)}>
          <ChevronLeftIcon className="w-6 h-6 text-green-500 cursor-pointer mr-4" />
        </button>
        <div className="text-h4 font-normal">Detail Ulasan</div>
      </div>

      <div className="overflow-x-auto mt-8">
        <table className="w-full min-w-[1000px] text-p4 text-left text-black border-x-[1px] border-black">
          <thead className="text-p3 text-white bg-green-500">
            <tr>
              {TABLE_COLUMS &&
                TABLE_COLUMS.map((head, i) => (
                  <th
                    key={i}
                    className="py-[14px] px-[10px] text-p2 font-medium text-center"
                  >
                    {head.header}
                  </th>
                ))}
            </tr>
          </thead>
          {isLoading ? (
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
            <tbody>
              {data &&
                data.Status == 200 &&
                data.Reviews?.map((review, i) => (
                  <CardReview
                    key={review.TransactionID}
                    productName={review.ProductName}
                    reviewerName={review.Name}
                    reviewerPhoto={review.ProfilePhoto}
                    transactionId={review.TransactionID}
                    avgRating={review.AvgRating}
                    expeditionRating={review.ExpeditionRating}
                    productRating={review.ProductRating}
                    productPhoto={review.PhotoUrl}
                    productVideo={review.VideoUrl}
                    comment={review.CommentUser}
                  />
                ))}
            </tbody>
          )}
        </table>
        {/* Empty */}
        {data && data.Status == 404 && (
          <EmptyData
            image={Empty}
            message="Belum ada ulasan untuk produk ini"
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

export default DetailUlasan;
