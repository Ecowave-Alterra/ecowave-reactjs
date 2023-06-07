import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import InputField from "../../../../components/InputField";

const TambahVoucher = () => {
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
            // disabled={!(formik.isValid && formik.dirty)}
          >
            Tambah
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahVoucher;
