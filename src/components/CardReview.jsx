import React from "react";
import ReactStars from "react-star-ratings";

const CardReview = ({
  key,
  nomer,
  produk,
  rating,
  reviewer,
  imgs,
  komentar,
}) => {
  return (
    <>
      <tr key={key} className="border-gray-500 border-t-[1px]">
        {/* Column 1 */}
        <td className="py-11 flex-col align-top pl-4 w-[400px] min-w-[100px]">
          <div className="flex">
            <h2 className="text-p3 font-medium">No Pesanan</h2>
            <h2 className="text-p3 font-medium ml-4">{nomer}</h2>
          </div>

          {/* Reviewer Sections */}
          <div className="flex mt-8 items-center">
            {reviewer.img}
            <div className="ml-2 text-p4 font-medium">{reviewer.nama}</div>
          </div>
          <div className="flex">
            {imgs.map((img) => (
              <img
                src={img}
                alt="Gambar Produk"
                className="max-w-[190px] max-h-[166px]"
              />
            ))}
          </div>
          {/* Comment section */}
          <h1 className="text-p2 font-medium w-[326px]">{komentar}</h1>
        </td>

        {/* Column 2 */}
        <td className="flex-col pe-4 w-[350px]">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-p2 font-medium">Nilai Keseluruhan</h1>
            <ReactStars
              rating={rating}
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
              rating={rating}
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
              rating={rating}
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
          <h1 className="font-medium mt-20 text-p2">{produk}</h1>
        </td>
      </tr>
    </>
  );
};

export default CardReview;
