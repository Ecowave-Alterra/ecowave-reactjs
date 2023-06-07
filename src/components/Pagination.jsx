import React from "react";

const Pagination = ({}) => {
  return (
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
                  currentPage === n ? "bg-green-500 text-white" : "bg-green-50"
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
  );
};

export default Pagination;
