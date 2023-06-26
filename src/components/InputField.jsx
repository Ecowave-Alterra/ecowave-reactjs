import React from "react";

const InputField = ({ id, label, type, errors, touched, values, onChange, placeholder }) => {
  return (
    <div className="relative h-10 mt-6">
      <input
        id={id}
        type={type}
        className={
          errors && touched
          ? "peer h-full w-full rounded-[7px] border border-error-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-error-400 focus:border-t-transparent focus:outline-0 "
          : "peer h-full w-full rounded-[7px] border border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
        }
        placeholder={placeholder}
        value={values}
        onChange={onChange}
      />
      <label
        className={
          errors && touched
          ? "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none font-normal text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-400 after:transition-all text-[11px] leading-tight peer-focus:text-error-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-400"
          : "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none font-normal text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all text-[11px] leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400"
        }
      >
        {label}
      </label>
      {errors && touched && (
        <div className="text-error-500 text-p4 ms-3">{errors}</div>
      )}
    </div>
  );
};

export default InputField;
