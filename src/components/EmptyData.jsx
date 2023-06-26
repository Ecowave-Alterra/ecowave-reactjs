import React from "react";

const EmptyData = ({ image, message }) => {
  return (
    <div className="py-20">
      <img src={image} className="h-56 mx-auto" />
      <p className="text-p3 mt-8 font-semibold text-gray-500 text-center">
        {message}
      </p>
    </div>
  );
};

export default EmptyData;
