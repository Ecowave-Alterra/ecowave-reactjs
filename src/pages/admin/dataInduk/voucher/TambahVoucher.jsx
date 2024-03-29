import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import moment from "moment";
import { observable } from "@legendapp/state";
import { observer } from "@legendapp/state/react";

// Komponen dan Icons
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import InputField from "../../../../components/InputField";
import Alert from "../../../../components/Alert";
import ModalConfirm from "../../../../components/ModalConfirm";

// hooks fetch
import { usePostDataUsingJson } from "../../../../hooks/FetchData";

// Legend State Management
const state = observable({
  postData: {},
});

const TambahVoucher = observer(() => {
  const navigate = useNavigate();
  const location = useLocation()

  // fetch data
  const { postData, isLoading } = usePostDataUsingJson(`admin/vouchers`);
  const [voucherCategory, setVoucherCategory] = useState("2");

  // Handle category voucher
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    formik.setFieldValue("VoucherTypeId", parseInt(value));
    setVoucherCategory(value);
  };

  // Format Date
  const getCurrentTime = (date) => {
    const dateValue = moment(date).format("YYYY-MM-DD");
    const currentTime = new Date();
    const hours = currentTime.getHours().toString();
    const minutes = currentTime.getMinutes().toString();
    const seconds = currentTime.getSeconds().toString();
    const milliseconds = currentTime.getMilliseconds().toString();
    const timezoneOffset = currentTime.getTimezoneOffset();
    const timezoneOffsetHours = Math.floor(
      Math.abs(timezoneOffset) / 60
    ).toString();
    const timezoneOffsetMinutes = (Math.abs(timezoneOffset) % 60).toString();
    const timezoneSign = `${
      timezoneOffset < 0 ? "+" : "-"
    }${timezoneOffsetHours.padStart(2, "0")}:${timezoneOffsetMinutes.padStart(
      2,
      "0"
    )}`;
    const formattedTime = `${dateValue}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneSign}`;
    return formattedTime;
  };

  // Fungsi handle Post Data
  const [showModalPost, setShowModalPost] = useState(false);
  const [showModalBack, setShowModalBack] = useState(false);

  const openConfirmPost = () => {
    setShowModalPost(true);
  };

  const closeConfirmPost = () => {
    setShowModalPost(false);
  };

  const hanndlePost = async () => {
    const response = await postData(state.postData.get());
    console.log(state.postData.get());
    if (response.Status === 201) {
      openAlert("success", response.Message);
      setShowModalPost(false);
      setTimeout(function () {
        navigate("/admin/voucher");
      }, 2000);
    } else {
      openAlert("danger", response.Message);
      setShowModalPost(false);
    }
  };

  //validasi form input tidak kosong saat ingin kembali ke halaman sebelumnya
  const backToMain = () => {
    if (
      formik.values.VoucherTypeId == "" &&
      formik.values.StartDate == "" &&
      formik.values.EndDate == "" &&
      formik.values.ClaimableUserCount == 0 &&
      formik.values.MaxClaimLimit == 0 &&
      formik.values?.MinimumPurchase == 0 &&
      formik.values?.MaximumDiscount == 0 &&
      formik.values?.DiscountPercent == 0
    ) {
      const backLocation = `/admin/voucher/?filter=${location.state.filter}&page=${location.state.page}`;
      navigate(backLocation);
    } else {
      setShowModalBack(true);
    }
  };

  //alert fetching data
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  //handling alert fetching data
  const openAlert = (variant, message) => {
    setIsAlert(true);
    setVariant(variant);
    setMessage(message);
    setTimeout(closeAlert, 2500);
  };
  const closeAlert = () => {
    setIsAlert(false);
    setVariant("");
    setMessage("");
  };

  // Formik + yup
  const formik = useFormik({
    initialValues: {
      VoucherTypeId: "",
      StartDate: "",
      EndDate: "",
      ...(voucherCategory == "2" && {
        MinimumPurchase: "",
        MaximumDiscount: "",
        DiscountPercent: "",
      }),
      ClaimableUserCount: "",
      MaxClaimLimit: "",
    },
    validationSchema: Yup.object({
      VoucherTypeId: Yup.string().required("Pilih Salah Satu VoucherTypeId"),
      StartDate: Yup.string().required("Pilih Tanggal Mulai Voucher"),
      EndDate: Yup.string().required("Pilih Tanggal Berakhir Voucher"),
      ...(voucherCategory == "2" && {
        MinimumPurchase: Yup.string()
          .matches(/^[1-9][0-9]*$/, "Harap masukan angka")
          .required("Data yang diisi harus angka. Contoh: 10500"),
        MaximumDiscount: Yup.string()
          .matches(/^[1-9][0-9]*$/, "Harap masukan angka")
          .required("Data yang diisi harus angka. Contoh: 10500"),
        DiscountPercent: Yup.number("Harap masukan angka")
          .min(0)
          .max(100, "Mohon maaf, entri Anda melebihi batas maksimum")
          .required("Data yang diisi harus angka. Contoh: 50"),
      }),
      ClaimableUserCount: Yup.string()
        .matches(/^[1-9][0-9]*$/, "Harap masukan angka")
        .required("Data yang diisi harus angka. Contoh: 500"),
      MaxClaimLimit: Yup.string()
        .matches(/^[1-9][0-9]*$/, "Harap masukan angka")
        .required("Data yang diisi harus angka. Contoh: 9"),
    }),
    onSubmit: async (e) => {
      openConfirmPost();
      const datas = {
        VoucherTypeId: parseInt(e.VoucherTypeId),
        StartDate: getCurrentTime(e.StartDate),
        EndDate: getCurrentTime(e.EndDate),
        ...(voucherCategory == "2" && {
          MinimumPurchase: parseInt(e.MinimumPurchase),
          MaximumDiscount: parseInt(e.MaximumDiscount),
          DiscountPercent: parseInt(e.DiscountPercent),
        }),
        ClaimableUserCount: parseInt(e.ClaimableUserCount),
        MaxClaimLimit: parseInt(e.MaxClaimLimit),
      };
      state.postData.set(datas);
    },
  });
  return (
    <>
      <div className="m-8">
        <div className="flex flex-row row-gap items-center gap-6">
          <button id="btn_back" onClick={backToMain}>
            <ChevronLeftIcon className="w-5 h-5 text-green-500" />
          </button>
          <h6 className="text-h6 font-medium">Tambah Voucher</h6>
        </div>

        {/* fORM SECTION */}
        <form onSubmit={formik.handleSubmit}>
          <div className="relative h-10 mt-6">
            <select
              id="VoucherTypeId"
              className={
                formik.errors.VoucherTypeId && formik.touched.VoucherTypeId
                  ? "h-fit ps-2 w-full rounded-[7px] border border-error-500 bg-transparent py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-2 focus:border-error-500 focus:outline-0 "
                  : "h-fit w-full rounded-[7px] border border-green-400 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-400 placeholder-shown:border-t-green-400 focus:border-2 focus:border-green-400 focus:outline-0 "
              }
              onChange={handleCategoryChange}
            >
              <option value="" className="">
                Masukan Jenis Voucher
              </option>
              <option value="1" className="text-black">
                Gratis Ongkir
              </option>
              <option value="2" className="text-black">
                Diskon Belanja
              </option>
            </select>
          </div>
          {formik.errors.VoucherTypeId && formik.touched.VoucherTypeId && (
            <div className="text-error-500 text-p4 ms-3">
              {formik.errors.VoucherTypeId}
            </div>
          )}
          {/* Date */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            <InputField
              id="StartDate"
              type="date"
              label="Tanggal Mulai"
              touched={formik.touched.StartDate}
              errors={formik.errors.StartDate}
              values={formik.values.StartDate}
              onChange={formik.handleChange}
            />

            <InputField
              id="EndDate"
              type="date"
              label="Tanggal Selesai"
              touched={formik.touched.EndDate}
              errors={formik.errors.EndDate}
              values={formik.values.EndDate}
              onChange={formik.handleChange}
            />
          </div>

          {voucherCategory == "2" && (
            <>
              {/* Min Belanja */}
              <InputField
                id="MinimumPurchase"
                label="Minimum Belanja"
                placeholder="Masukan nilai"
                touched={formik.touched.MinimumPurchase}
                errors={formik.errors.MinimumPurchase}
                values={formik.values.MinimumPurchase}
                onChange={formik.handleChange}
              />

              {/* MaximumDiscount */}
              <InputField
                id="MaximumDiscount"
                label="Maksimum Potongsn Harga"
                placeholder="Masukan nilai"
                touched={formik.touched.MaximumDiscount}
                errors={formik.errors.MaximumDiscount}
                values={formik.values.MaximumDiscount}
                onChange={formik.handleChange}
              />

              {/* DiscountPercent */}
              <InputField
                id="DiscountPercent"
                label="Diskon"
                placeholder="Masukan nilai"
                touched={formik.touched.DiscountPercent}
                errors={formik.errors.DiscountPercent}
                values={formik.values.DiscountPercent}
                onChange={formik.handleChange}
              />
            </>
          )}

          {/* Jumlah */}
          <InputField
            id="ClaimableUserCount"
            label="Jumlah voucher yang dapat diklaim"
            placeholder="Masukan nilai"
            touched={formik.touched.ClaimableUserCount}
            errors={formik.errors.ClaimableUserCount}
            values={formik.values.ClaimableUserCount}
            onChange={formik.handleChange}
          />

          {/* MaxClaimLimit */}
          <InputField
            id="MaxClaimLimit"
            label="Batas Klaim Pengguna"
            placeholder="Masukan nilai"
            touched={formik.touched.MaxClaimLimit}
            errors={formik.errors.MaxClaimLimit}
            values={formik.values.MaxClaimLimit}
            onChange={formik.handleChange}
          />
          {/* submit button */}
          <div className="flex relative top-[72px] justify-end">
            <button
              id="btn_submit"
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
      {/* alert fetch api */}
      {isAlert && (
        <Alert variant={variant} message={message} onClose={closeAlert} />
      )}

      {/* confirm delete */}
      {showModalPost && (
        <ModalConfirm
          title="Apakah voucher yang ingin ditambahkan sudah benar?"
          onCancel={closeConfirmPost}
          onConfirm={hanndlePost}
          labelCancel="tidak"
          labelConfirm="iya"
          variant="success"
        />
      )}

      {/* modal back */}
      {showModalBack && (
        <ModalConfirm
          title="Keluar Halaman?"
          description="Kamu akan membatalkan perubahan Tambah Voucher. Semua perubahan tidak akan disimpan"
          onCancel={() => setShowModalBack(false)}
          onConfirm={() => navigate(`/admin/voucher/?filter=${location.state.filter}&page=${location.state.page}`)}
          labelCancel="tidak"
          labelConfirm="iya"
          variant="danger"
        />
      )}
    </>
  );
});

export default TambahVoucher;
