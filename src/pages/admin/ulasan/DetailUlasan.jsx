import React, { useState, useEffect } from "react";
import Back from "../../../assets/img/Vector.png";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import CardReview from "../../../components/CardReview";

function DetailUlasan() {
  const [itemList, setItemList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 3;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = itemList.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(itemList.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const data = [
    {
      nomer: "01032412123",
      produk: "Totebag Tas Belanja Serbaguna",
      reviewer: { nama: "Shinta Rahma", img: <UserIcon className="w-5 h-5" /> },
      rating: 4.5,
      imgs: ["/src/assets/img/media.png", "/src/assets/img/media.png"],
      komentar: "sangat bagus sesuai gambar tapi lama nyampenyaa :)",
    },
    {
      nomer: "01032412123",
      produk: "Sendok",
      reviewer: { nama: "Renaldo", img: <UserIcon className="w-5 h-5" /> },
      rating: 4.0,
      imgs: ["/src/assets/img/media.png", "/src/assets/img/media.png"],
      komentar: "sangat bagus",
    },
    {
      nomer: "01032412123",
      produk: "Sendok",
      reviewer: { nama: "Renaldo", img: <UserIcon className="w-5 h-5" /> },
      rating: 4.0,
      imgs: ["/src/assets/img/media.png", "/src/assets/img/media.png"],
      komentar: "sangat bagus",
    },
    {
      nomer: "01032412123",
      produk: "Sendok",
      reviewer: { nama: "Renaldo", img: <UserIcon className="w-5 h-5" /> },
      rating: 4.0,
      imgs: ["/src/assets/img/media.png", "/src/assets/img/media.png"],
      komentar: "sangat bagus",
    },
    {
      nomer: "01032412123",
      produk: "Sendok",
      reviewer: { nama: "Renaldo", img: <UserIcon className="w-5 h-5" /> },
      rating: 4.0,
      imgs: ["/src/assets/img/media.png", "/src/assets/img/media.png"],
      komentar: "sangat bagus",
    },
  ];
  const columns = [
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

  useEffect(() => {
    setItemList(data);
  }, []);

  return (
    <div className="flex-row px-3 py-8">
      {/* header */}
      <div className="flex justify-start items-center">
        <Link to={"/admin/ulasan"}>
          <img src={Back} className="h-5 mr-5 cursor-pointer" />
        </Link>
        <div className="text-h4 font-normal">Detail Ulasan</div>
      </div>

      <div className="relative overflow-x-auto border-[1px] border-gray-500 rounded-md mt-8">
        <table className="w-full text-left table-auto ">
          <thead className="text-p3 text-white bg-green-500 ">
            <tr>
              {columns &&
                columns.map((head) => (
                  <th className="py-[14px] px-[10px] text-p2 font-medium text-center">
                    {head.header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {itemList &&
              records.map((item) => (
                <CardReview
                  key={item.nomer}
                  produk={item.produk}
                  reviewer={item.reviewer}
                  nomer={item.nomer}
                  rating={item.rating}
                  imgs={item.imgs}
                  komentar={item.komentar}
                />
              ))}
          </tbody>
        </table>

        {/* Pagination */}
        {records.length >= 1 && (
          <div className="flex justify-between w-full py-4">
            <div>
              <p className="text-p2 font-normal px-5 py-3 text-gray-500">{`Halaman ${currentPage} dari ${nPage}`}</p>
            </div>
            <nav>
              <ul className="list-style-none flex">
                <li>
                  <a
                    className={`cursor-pointer relative block px-5 py-3 text-p2 font-semibold  ${
                      currentPage === 1 ? "text-gray-300" : "text-green-500"
                    }`}
                    onClick={currentPage === 1 ? null : prevPage}
                  >
                    Previous
                  </a>
                </li>
                {numbers.map((n, i) => (
                  <li key={i}>
                    <p
                      className={`cursor-pointer relative block px-5 py-3 text-p2 font-semibold rounded-full text-green-500 ${
                        currentPage === n
                          ? "bg-green-500 text-white"
                          : "bg-green-50"
                      }`}
                      onClick={() => changePage(n)}
                    >
                      {n}
                    </p>
                  </li>
                ))}

                <li>
                  <a
                    className={`cursor-pointer relative block px-5 py-3 text-p2 font-semibold  ${
                      currentPage === nPage ? "text-gray-300" : "text-green-500"
                    }`}
                    onClick={currentPage === nPage ? null : nextPage}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailUlasan;
