import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import React from "react";

const Alert = ({ variant, message, onClose }) => {
  const variants = {
    success:
      "bg-green-600 border w-1/2 text-white font-normal text-p3 px-4 py-2 rounded-full",
    danger:
      "bg-error-600 border w-1/2 text-white font-normal text-p3 px-4 py-2 rounded-full",
  };

  const border = {
    success: "bg-green-50",
    danger: "bg-error-50",
  };
  return (
    <div className="fixed inset-0 top-10 h-fit flex items-start justify-center z-20 transition-opacity opacity-100">
      <div
        className={`flex justify-between items-center min-w-[343px] w-fit h-[44px] ${variants[variant]}`}
        role="alert"
      >
        <div className="flex gap-2 items-center">
          <div className={`px-2 py-1 rounded-full ${border[variant]}`}>
            {variant == "danger" ? (
              <XMarkIcon
                className="w-5 h-5 text-error-600"
                onClick={onClose}
              />
            ) : (
              <CheckIcon
                className="w-5 h-5 text-green-600"
                onClick={onClose}
              />
            )}
          </div>
          <p className="block sm:inline">{message}</p>
        </div>
        <XMarkIcon className="w-5 h-5 text-white ml-2" onClick={onClose} />
      </div>
    </div>
  );
};

export default Alert;
