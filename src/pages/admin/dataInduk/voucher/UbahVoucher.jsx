import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import InputField from "../../../../components/InputField";

const EditVoucher = () => {
  const [voucherCategory, setVoucherCategory] = useState("diskon");
  let { voucherId } = useParams();

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    console.log(value);
    formik.setFieldValue("kategori", value);
    setVoucherCategory(value);
  };

  const formik = useFormik({
    initialValues: {
      kategori: "",
      voucherStart: "",
      voucherEnd: "",
      ...(voucherCategory == "diskon" && {
        minBelanja: "",
        potongan: "",
        diskon: "",
      }),
      jumlah: "",
      batas: "",
    },
    validationSchema: Yup.object({
      kategori: Yup.string().required("Pilih Salah Satu Kategori"),
      voucherStart: Yup.string().required("Pilih Tanggal Mulai Voucher"),
      voucherEnd: Yup.string().required("Pilih Tanggal Berakhir Voucher"),
      ...(voucherCategory == "diskon" && {
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
      }),
      jumlah: Yup.string()
        .matches(/^[1-9][0-9]*$/, "Harap masukan angka")
        .required("Data yang diisi harus angka. Contoh: 500"),
      batas: Yup.string()
        .matches(/^[1-9][0-9]*$/, "Harap masukan angka")
        .required("Data yang diisi harus angka. Contoh: 9"),
    }),
    onSubmit: (e) => {
      console.log(e);
    },
  });

  return (
    <div className="m-8">
      <div className="flex flex-row row-gap items-center gap-6">
        <Link to="/admin/voucher/">
          <ChevronLeftIcon className="w-5 h-5 text-green-500" />
        </Link>
        <h6 className="text-h6 font-medium">Tambah Voucher</h6>
      </div>

      {/* fORM SECTION */}
      <form onSubmit={formik.handleSubmit}>
        <div className="relative h-10 mt-6">
          <select
            id="kategori"
            className={
              formik.errors.kategori && formik.touched.kategori
                ? "h-fit ps-2 w-full rounded-[7px] border border-error-500 bg-transparent py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-2 focus:border-error-500 focus:outline-0 "
                : "h-fit w-full rounded-[7px] border border-green-400 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-400 placeholder-shown:border-t-green-400 focus:border-2 focus:border-green-400 focus:outline-0 "
            }
            onChange={handleCategoryChange}
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
        {formik.errors.kategori && formik.touched.kategori && (
          <div className="text-error-500 text-p4 ms-3">
            {formik.errors.kategori}
          </div>
        )}
        {/* Date */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            id="voucherStart"
            type="date"
            label="Tanggal Selesai"
            touched={formik.touched.voucherStart}
            errors={formik.errors.voucherStart}
            values={formik.values.voucherStart}
            onChange={formik.handleChange}
          />

          <InputField
            id="voucherEnd"
            type="date"
            label="Tanggal Selesai"
            touched={formik.touched.voucherEnd}
            errors={formik.errors.voucherEnd}
            values={formik.values.voucherEnd}
            onChange={formik.handleChange}
          />
        </div>

        {voucherCategory == "diskon" && (
          <>
            {/* Min Belanja */}
            <InputField
              id="minBelanja"
              label="Minimum Belanja"
              touched={formik.touched.minBelanja}
              errors={formik.errors.minBelanja}
              values={formik.values.minBelanja}
              onChange={formik.handleChange}
            />

            {/* Potongan */}
            <InputField
              id="potongan"
              label="Maksimum Potongan Harga"
              touched={formik.touched.potongan}
              errors={formik.errors.potongan}
              values={formik.values.potongan}
              onChange={formik.handleChange}
            />

            {/* Diskon */}
            <InputField
              id="diskon"
              label="Diskon"
              touched={formik.touched.diskon}
              errors={formik.errors.diskon}
              values={formik.values.diskon}
              onChange={formik.handleChange}
            />
          </>
        )}

        {/* Jumlah */}
        <InputField
          id="jumlah"
          label="Jumlah voucher yang dapat diklaim"
          touched={formik.touched.jumlah}
          errors={formik.errors.jumlah}
          values={formik.values.jumlah}
          onChange={formik.handleChange}
        />

        {/* Batas */}
        <InputField
          id="batas"
          label="Batas Klaim Pengguna"
          touched={formik.touched.batas}
          errors={formik.errors.batas}
          values={formik.values.batas}
          onChange={formik.handleChange}
        />
        {/* submit button */}
        <div className="flex relative top-[72px] justify-end">
          <button
            className="px-8 py-4 bg-green-500 font-semibold text-white rounded-full disabled:bg-green-300 duration-100 hover:bg-green-600"
            type="submit"
            data-te-ripple-init=""
            disabled={!(formik.isValid && formik.dirty)}
          >
            Tambah
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVoucher;
