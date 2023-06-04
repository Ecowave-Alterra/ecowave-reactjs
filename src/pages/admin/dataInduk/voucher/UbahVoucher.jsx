import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const EditVoucher = () => {
  const [voucherCategory, setVoucherCategory] = useState();
  const formik = useFormik({
    initialValues: {
      voucherCategory: "",
      voucherStart: "",
      voucherEnd: "",
      minBelanja: "",
      potongan: "",
      diskon: "",
      jumlah: "",
      batas: "",
    },
    validationSchema: Yup.object({
      voucherCategory: Yup.string().required("Pilih Salah Satu Kategori"),
      voucherStart: Yup.string().required("Pilih Tanggal Mulai Voucher"),
      voucherEnd: Yup.string().required("Pilih Tanggal Berakhir Voucher"),
      minBelanja: Yup.string()
        .matches(/^[1-9][0-9]*$/, "Harap masukan angka")
        .required("Data yang diisi harus angka. Contoh: 10500"),
      potongan: Yup.string()
        .matches(/^[1-9][0-9]*$/, "Harap masukan angka")
        .required("Data yang diisi harus angka. Contoh: 10500"),
      diskon: Yup.string()
        .matches(/^[1-9][0-9]*$/, "Harap masukan angka")
        .min(0)
        .max(100)
        .required("Data yang diisi harus angka. Contoh: 50"),
      jumlah: Yup.string()
        .matches(/^[1-9][0-9]*$/, "Harap masukan angka")
        .required("Data yang diisi harus angka. Contoh: 500"),
      batas: Yup.string()
        .matches(/^[1-9][0-9]*$/, "Harap masukan angka")
        .required("Data yang diisi harus angka. Contoh: 9"),
    }),
    onSubmit: () => {
      console.log("masuk");
    },
  });

  return (
    <div className="m-8">
      <div className="flex flex-row row-gap items-center gap-6">
        <Link to="/admin/voucher/">
          <ChevronLeftIcon className="w-5 h-5 text-green-500" />
        </Link>
        <h6 className="text-h6 font-medium">Ubah Voucher</h6>
      </div>

      {/* fORM SECTION */}
      <form onSubmit={formik.handleSubmit}>
        <div className="relative h-10 mt-6">
          <select
            id="voucherCategory"
            className="h-fit w-full rounded-[7px] border border-gray-500 bg-transparent px-3 py-2.5 text-gray-500 font-sans font-medium outline outline-0 transition-all placeholder-shown:border focus:outline-0"
            onChange={(e) => setVoucherCategory(e.target.value)}
          >
            <option value="" className="">
              Masukan Jenis Voucher
            </option>
            <option value="gratis" className="text-black">
              Gratis Ongkir
            </option>
            <option value="diskon" className="text-black">
              Diskon Belanja
            </option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="relative h-10">
            <input
              id="voucherStart"
              type="date"
              className={
                formik.errors.voucherStart && formik.touched.voucherStart
                  ? "peer h-full w-full rounded-[7px] border border-error-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-2 focus:border-error-500 focus:border-t-transparent focus:outline-0 "
                  : "peer h-full w-full rounded-[7px] border border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-400 placeholder-shown:border-t-green-400 focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
              }
              value={formik.values.voucherStart}
              onChange={formik.handleChange}
            />
            <label
              className={
                formik.errors.voucherStart && formik.touched.voucherStart
                  ? "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-500 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-error-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                  : "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
              }
            >
              Tanggal Mulai
            </label>
            {formik.errors.voucherStart && formik.touched.voucherStart && (
              <div className="text-error-500 text-p4 ms-3">
                {formik.errors.voucherStart}
              </div>
            )}
          </div>

          <div className="relative h-10">
            <input
              id="voucherEnd"
              type="date"
              className={
                formik.errors.voucherStart && formik.touched.voucherStart
                  ? "peer h-full w-full rounded-[7px] border border-error-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-2 focus:border-error-500 focus:border-t-transparent focus:outline-0 "
                  : "peer h-full w-full rounded-[7px] border border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-400 placeholder-shown:border-t-green-400 focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
              }
              value={formik.values.voucherEnd}
              onChange={formik.handleChange}
            />
            <label
              className={
                formik.errors.voucherEnd && formik.touched.voucherEnd
                  ? "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-500 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-error-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                  : "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
              }
            >
              Tanggal Selesai
            </label>
            {formik.errors.voucherEnd && formik.touched.voucherEnd && (
              <div className="text-error-500 text-p4 ms-3">
                {formik.errors.voucherEnd}
              </div>
            )}
          </div>
        </div>

        {/* Minimal Belanja */}
        <div
          className={`relative h-10 mt-6 ${
            voucherCategory == "gratis" && "hidden"
          }`}
        >
          <input
            id="minBelanja"
            className={
              formik.errors.minBelanja && formik.touched.minBelanja
                ? "peer h-full w-full rounded-[7px] border border-error-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-2 focus:border-error-500 focus:border-t-transparent focus:outline-0 "
                : "peer h-full w-full rounded-[7px] border border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-400 placeholder-shown:border-t-green-400 focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
            }
            placeholder=" "
            value={formik.values.minBelanja}
            onChange={formik.handleChange}
          />
          <label
            className={
              formik.errors.minBelanja && formik.touched.minBelanja
                ? "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-500 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-error-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                : "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            }
          >
            Minimum Belanja
          </label>
          {formik.errors.minBelanja && formik.touched.minBelanja && (
            <div className="text-error-500 text-p4 ms-3">
              {formik.errors.minBelanja}
            </div>
          )}
        </div>

        {/* Form Potongan */}
        <div
          className={`relative h-10 mt-6 ${
            voucherCategory == "gratis" && "hidden"
          }`}
        >
          <input
            id="potongan"
            className={
              formik.errors.potongan && formik.touched.potongan
                ? "peer h-full w-full rounded-[7px] border border-error-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-2 focus:border-error-500 focus:border-t-transparent focus:outline-0 "
                : "peer h-full w-full rounded-[7px] border border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-400 placeholder-shown:border-t-green-400 focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
            }
            placeholder=" "
            value={formik.values.potongan}
            onChange={formik.handleChange}
          />
          <label
            className={
              formik.errors.potongan && formik.touched.potongan
                ? "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-500 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-error-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                : "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            }
          >
            Maksimum Potongan Harga
          </label>
          {formik.errors.potongan && formik.touched.potongan && (
            <div className="text-error-500 text-p4 ms-3">
              {formik.errors.potongan}
            </div>
          )}
        </div>

        {/* Diskon */}
        <div
          className={`relative h-10 mt-6 ${
            voucherCategory == "gratis" && "hidden"
          }`}
        >
          <input
            id="diskon"
            className={
              formik.errors.diskon && formik.touched.diskon
                ? "peer h-full w-full rounded-[7px] border border-error-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-2 focus:border-error-500 focus:border-t-transparent focus:outline-0 "
                : "peer h-full w-full rounded-[7px] border border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-400 placeholder-shown:border-t-green-400 focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
            }
            placeholder=" "
            value={formik.values.diskon}
            onChange={formik.handleChange}
          />
          <label
            className={
              formik.errors.diskon && formik.touched.diskon
                ? "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-500 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-error-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                : "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            }
          >
            Diskon
          </label>
          {formik.errors.diskon && formik.touched.diskon && (
            <div className="text-error-500 text-p4 ms-3">
              {formik.errors.diskon}
            </div>
          )}
        </div>

        {/* Jumlah */}
        <div className="relative h-10 mt-6">
          <input
            id="jumlah"
            className={
              formik.errors.jumlah && formik.touched.jumlah
                ? "peer h-full w-full rounded-[7px] border border-error-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-2 focus:border-error-500 focus:border-t-transparent focus:outline-0 "
                : "peer h-full w-full rounded-[7px] border border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-400 placeholder-shown:border-t-green-400 focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
            }
            placeholder=" "
            value={formik.values.jumlah}
            onChange={formik.handleChange}
          />
          <label
            className={
              formik.errors.jumlah && formik.touched.jumlah
                ? "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-500 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-error-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                : "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            }
          >
            Jumlah voucher yang dapat diklaim
          </label>
          {formik.errors.jumlah && formik.touched.jumlah && (
            <div className="text-error-500 text-p4 ms-3">
              {formik.errors.jumlah}
            </div>
          )}
        </div>

        {/* Batas */}
        <div className="relative h-10 mt-6">
          <input
            id="batas"
            className={
              formik.errors.batas && formik.touched.batas
                ? "peer h-full w-full rounded-[7px] border border-error-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-2 focus:border-error-500 focus:border-t-transparent focus:outline-0 "
                : "peer h-full w-full rounded-[7px] border border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-400 placeholder-shown:border-t-green-400 focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
            }
            placeholder=" "
            value={formik.values.batas}
            onChange={formik.handleChange}
          />
          <label
            className={
              formik.errors.batas && formik.touched.batas
                ? "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-500 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-error-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                : "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            }
          >
            Batas Klaim Pengguna  
          </label>
          {formik.errors.batas && formik.touched.batas && (
            <div className="text-error-500 text-p4 ms-3">
              {formik.errors.batas}
            </div>
          )}
        </div>

        {/* submit button */}
        <div className="flex relative top-[72px] justify-end">
          <button
            className="px-8 py-4 bg-green-500 font-semibold text-white rounded-full disabled:bg-green-300 duration-100 hover:bg-green-600"
            type="submit"
            data-te-ripple-init=""
            // disabled={!(formik.isValid && formik.dirty)}
          >
            Tambah
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVoucher;
