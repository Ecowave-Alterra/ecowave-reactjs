import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

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
      <tr key={key} className="border-gray-500 border-b-[1px]">
        {/* Column 1 */}
        <td className="py-11 flex-col align-top pl-4 w-fit ">
          <div className="flex">
            <h2 className="text-p3 font-medium">No Pesanan</h2>
            <h2 className="text-p3 font-medium ml-4">{nomer}</h2>
          </div>
          {/* Rating Section */}
          <div className="flex mt-12 items-center">
            <StarIcon className="w-5 h-5 fill-warning" />
            <div className="font-bold ml-2">{rating}</div>
            <div className="ml-2 text-p3 font-medium">rating</div>
          </div>
          {/* Images Sections */}
          <div className="flex mt-4 items-center">
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
        <td className="flex-col px-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-p2 font-medium">Nilai Keseluruhan</h1>
            <div className="flex">
              <StarIcon className="w-5 h-5 fill-warning" />
              <StarIcon className="w-5 h-5 fill-warning" />
              <StarIcon className="w-5 h-5 fill-warning" />
              <StarIcon className="w-5 h-5 fill-warning" />
              <StarIcon className="w-5 h-5 fill-warning" />
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-p2 font-medium">Kuaitas Produk</h1>
            <div className="flex">
              <StarIcon className="w-5 h-5 fill-warning" />
              <StarIcon className="w-5 h-5 fill-warning" />
              <StarIcon className="w-5 h-5 fill-warning" />
              <StarIcon className="w-5 h-5 fill-warning" />
              <StarIcon className="w-5 h-5 fill-warning" />
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-p2 font-medium">Layanan Pengiriman</h1>
            <div className="flex">
              <StarIcon className="w-5 h-5 fill-warning" />
              <StarIcon className="w-5 h-5 fill-warning" />
              <StarIcon className="w-5 h-5 fill-warning" />
              <StarIcon className="w-5 h-5 fill-warning" />
              <StarIcon className="w-5 h-5 fill-warning" />
            </div>
          </div>
        </td>

        {/* Column 3 */}
        <td className="flex-col justify-center align-top pr-4 pt-11">
          <div className="flex">
            <img
              src={imgs[1]}
              alt="Gambar Produk"
              className="max-w-[120px] max-h-[70px]"
            />
            <h1 className="font-medium text-p2">{produk}</h1>
          </div>
        </td>
      </tr>
    </>
  );
};

export default CardReview;
