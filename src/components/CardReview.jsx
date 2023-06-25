import React from "react";
import ReactStars from "react-star-ratings";

const CardReview = ({
  key,
  productName,
  reviewerName,
  reviewerPhoto,
  transactionId,
  avgRating,
  expeditionRating,
  productRating,
  productPhoto,
  productVideo,
  comment,
}) => {
  return (
    <>
      <tr key={key} className="border-gray-500 border-t-[1px]">
        {/* Column 1 */}
        <td className="py-11 flex-col align-top pl-4 w-[400px] min-w-[100px]">
          <div className="flex">
            <h2 className="text-p3 font-medium">No Pesanan</h2>
            <h2 className="text-p3 font-medium ml-4">{transactionId}</h2>
          </div>

          {/* Reviewer Sections */}
          <div className="flex mt-8 items-center">
            <img
              src={
                reviewerPhoto
                  ? reviewerPhoto
                  : "https://storage.googleapis.com/ecowave/img/users/profile/profile.png"
              }
              alt="User Photo"
              className="w-[100%] max-w-[30px] h-[30px] mx-1 rounded-full object-cover"
            />
            <div className="ml-2 text-p4 font-medium">{reviewerName}</div>
          </div>
          <div className="flex my-4">
            {productPhoto && (
              <img
                src={productPhoto}
                alt="Gambar Produk"
                className="max-w-[190px] max-h-[166px] mx-1"
              />
            )}

            {productVideo && (
              <video className="max-w-[190px] max-h-[166px]" controls>
                <source src={productVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          {/* Comment section */}
          <h1 className="text-p2 font-medium w-[326px]">{comment}</h1>
        </td>

        {/* Column 2 */}
        <td className="flex-col pe-4 w-[350px]">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-p2 font-medium">Nilai Keseluruhan</h1>
            <ReactStars
              rating={avgRating}
              starRatedColor="#FACC15"
              numberOfStars={5}
              name="rating"
              starDimension="30px"
              starSpacing="0"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-p2 font-medium">Kuaitas Produk</h1>
            <ReactStars
              rating={productRating}
              starRatedColor="#FACC15"
              numberOfStars={5}
              name="rating"
              starDimension="30px"
              starSpacing="0"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-p2 font-medium">Layanan Pengiriman</h1>
            <ReactStars
              rating={expeditionRating}
              starRatedColor="#FACC15"
              numberOfStars={5}
              name="rating"
              starDimension="30px"
              starSpacing="0"
            />
          </div>
        </td>

        {/* Column 3 */}
        <td className="flex align-top px-[10px]">
          <h1 className="font-medium mt-20 text-p2">{productName}</h1>
        </td>
      </tr>
    </>
  );
};

export default CardReview;
