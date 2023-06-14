import React from "react";

const Pagination = ({currentPage, totalPage, onPrev, onNext, onChange }) => {
  return (
    <div className="flex justify-between w-full py-4">
      <div>
        <p className="text-p2 font-normal px-5 py-3 text-gray-500">{`Halaman ${currentPage} dari ${totalPage}`}</p>
      </div>
      <nav>
        <ul className="list-style-none flex">
          <li>
            <a
              className={`cursor-pointer relative block px-5 py-3 text-p2 font-semibold  ${
                currentPage === 1 ? "text-gray-300" : "text-green-500"
              }`}
              onClick={currentPage === 1 ? null : onPrev}
            >
              Previous
            </a>
          </li>
          {[...Array(totalPage + 1).keys()].slice(1).map((n, i) => (
            <li key={i}>
              <p
                className={`cursor-pointer relative block px-5 py-3 text-p2 font-semibold rounded-full text-green-500 ${
                  currentPage === n ? "bg-green-500 text-white" : "bg-green-50"
                }`}
                onClick={() => onChange(n)}
              >
                {n}
              </p>
            </li>
          ))}

          <li>
            <a
              className={`cursor-pointer relative block px-5 py-3 text-p2 font-semibold  ${
                currentPage === totalPage ? "text-gray-300" : "text-green-500"
              }`}
              onClick={currentPage === totalPage ? null : onNext}
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
