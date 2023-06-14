import React, { useState, useEffect } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import Empty from "../../../assets/img/File Not Found.png";
import CardReview from "../../../components/CardReview";
import Pagination from "../../../components/Pagination";

import useCrud from "../../../hooks/FetchMockServer";


function DetailUlasan() {
  let { reviewId } = useParams();

  const swrKey = `admin/reviews/9676644154`;

  const { data, isLoading, error } = useCrud(swrKey);
  if (error) return <div>error</div>;
  if (isLoading) return <div>loading</div>;
  console.log("DATA ulasan", data);
  console.log("ID", reviewId);

  // Tabel Setup
  const TABLE_COLUMS = [
    { header: "Konten" },
    { header: "Rating" },
    { header: "Nama Produk" },
  ];

  // Fungsi untuk pagination
  const prevPage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changePage = (id) => {
    setCurrentPage(id);
  };

  return (
    <div className="flex-row px-3 py-8">
      {/* header */}
      <div className="flex justify-start items-center">
        <Link to={"/admin/ulasan"}>
          <ChevronLeftIcon className="w-5 h-5 text-green-500 cursor-pointer mr-4" />
        </Link>
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
              <tr>loading</tr>
            </tbody>
          ) : (
            <tbody>
              {data &&
                data.Status == 200 &&
                data.Reviews?.map((review, i) => (
                  <CardReview
                    key={review.TransactionId}
                    productName={review.ProductName}
                    reviewerName={review.Name}
                    reviewerPhoto={review.ProfilePhoto}
                    transactionId={review.TransactionId}
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
        {!data || error && (
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

export default DetailUlasan;
