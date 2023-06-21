import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { observable } from "@legendapp/state";
import { observer } from "@legendapp/state/react";
import moment from "moment";

// Komponen
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import InputField from "../../../../components/InputField";
import ErrorPage from "../../../../components/ErrorPage";
import ModalConfirm from "../../../../components/ModalConfirm";
import Alert from "../../../../components/Alert";

// Fetch
import { usePutDataUsingJson, useGetData } from "../../../../hooks/FetchData";

// Legend State Management
const state = observable({
  dataInit: {},
  dataUpdate: {},
  submitClick: false,
});

const EditVoucher = observer(() => {
  // Mengambil url id
  let { voucherId } = useParams();
  const navigate = useNavigate();

  // Handle category voucher
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    formik.setFieldValue("VoucherTypeId", parseInt(value));
    state.dataInit.VoucherTypeId.set(value);
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

  // get data by id
  const { data, isLoading, error } = useGetData(`admin/vouchers/${voucherId}`);
  // Put data
  const { putData, isLoading: loading } =
    usePutDataUsingJson(`admin/vouchers/`);

  //alert fetching data
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

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

  // Fungsi handle Edit
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalBack, setShowModalBack] = useState(false);

  const openConfirmEdit = () => {
    setShowModalEdit(true);
  };

  const closeConfirmEdit = () => {
    setShowModalEdit(false);
    console.log("CANCEL");
  };

  const handleEdit = async () => {
    console.log("EDIT", state.dataUpdate.get());
    const response = await putData(state.dataUpdate.get(), voucherId);
    console.log(response);
    if (response.Status === 200) {
      openAlert("success", response.Message);
      console.log(response.Message);
      setShowModalEdit(false);
      setTimeout(function () {
        navigate("/admin/voucher");
      }, 2000);
    } else {
      openAlert("danger", response.Message);
      console.log(response.Message);
      setShowModalEdit(false);
    }
  };

  //validasi form input tidak kosong saat ingin kembali ke halaman sebelumnya
  const backToMain = () => {
    if (
      getCurrentTime(formik.values.StartDate) ==
        getCurrentTime(state.dataInit.StartDate.get()) &&
      getCurrentTime(formik.values.EndDate) ==
        getCurrentTime(state.dataInit.EndDate.get())
    ) {
      navigate("/admin/voucher");
    } else {
      setShowModalBack(true)
    }
  };

  // Formik
  const formik = useFormik({
    initialValues: {
      // VoucherTypeId: 0,
      StartDate: "",
      EndDate: "",
      ...(state.dataInit.VoucherTypeId.get() == "Diskon Belanja" && {
        MinimumPurchase: 0,
        MaximumDiscount: 0,
        DiscountPercent: 0,
      }),
      ClaimableUserCount: 0,
      MaxClaimLimit: 0,
    },
    validationSchema: Yup.object({
      // VoucherTypeId: Yup.string().required("Pilih Salah Satu VoucherTypeId"),
      StartDate: Yup.string().required("Pilih Tanggal Mulai Voucher"),
      EndDate: Yup.string().required("Pilih Tanggal Berakhir Voucher"),
      ...(state.dataInit.VoucherTypeId.get() == "Diskon Belanja" && {
        MinimumPurchase: Yup.string()
          .matches(/^[1-9][0-9]*$/, "Harap masukan angka")
          .required("Data yang diisi harus angka. Contoh: 10500"),
        MaximumDiscount: Yup.string()
          .matches(/^[1-9][0-9]*$/, "Harap masukan angka")
          .required("Data yang diisi harus angka. Contoh: 10500"),
        DiscountPercent: Yup.string()
          .matches(/^[1-9][0-9]*$/, "Harap masukan angka")
          .min(0)
          .max(100)
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
      openConfirmEdit();
      const datas = {
        // VoucherTypeId: e.VoucherTypeId,
        StartDate: getCurrentTime(e.StartDate),
        EndDate: getCurrentTime(e.EndDate),
        ...(state.dataInit.VoucherTypeId.get() == "Diskon Belanja" && {
          MinimumPurchase: parseInt(e.MinimumPurchase),
          MaximumDiscount: parseInt(e.MaximumDiscount),
          DiscountPercent: parseInt(e.DiscountPercent),
        }),
        ClaimableUserCount: parseInt(e.ClaimableUserCount),
        MaxClaimLimit: parseInt(e.MaxClaimLimit),
      };
      state.dataUpdate.set(datas);
      state.submitClick.set(true);
      // console.log(getCurrentTime(state.dataInit.StartDate.get()));
      // console.log(getCurrentTime(e.StartDate));
    },
  });

  useEffect(() => {
    if (data) {
      const dataInialisasi = {
        VoucherTypeId: data.Voucher.Type,
        StartDate: moment(data.Voucher.StartDate).format("YYYY-MM-DD"),
        EndDate: moment(data.Voucher.EndDate).format("YYYY-MM-DD"),
        ...(data.Voucher.Type == "Diskon Belanja" && {
          MinimumPurchase: data.Voucher.MinimumPurchase,
          MaximumDiscount: data.Voucher.MaximumDiscount,
          DiscountPercent: data.Voucher.DiscountPercent,
        }),
        ClaimableUserCount: data.Voucher.ClaimableUserCount,
        MaxClaimLimit: data.Voucher.MaxClaimLimit,
      };
      formik.setValues(dataInialisasi);
      state.dataInit.set(dataInialisasi);
    }
  }, [data]);
  if (error) return <ErrorPage />;

  return (
    <>
      <div className="m-8">
        <div className="flex flex-row row-gap items-center gap-6">
          <button onClick={backToMain}>
            <ChevronLeftIcon className="w-5 h-5 text-green-500" />
          </button>
          <h6 className="text-h6 font-medium">Ubah Voucher</h6>
        </div>

        {/* fORM SECTION */}
        <form onSubmit={formik.handleSubmit}>
          <div className="relative h-10 mt-6">
            <select
              id="VoucherTypeId"
              name="VoucherTypeId"
              value={state.dataInit.VoucherTypeId.get()}
              className={
                formik.errors.VoucherTypeId && formik.touched.VoucherTypeId
                  ? "h-fit ps-2 w-full rounded-[7px] border border-error-500 bg-transparent py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-2 focus:border-error-500 focus:outline-0 "
                  : "h-fit w-full rounded-[7px] border border-green-400 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-400 placeholder-shown:border-t-green-400 focus:border-2 focus:border-green-400 focus:outline-0 "
              }
              onChange={handleCategoryChange}
              disabled
            >
              <option value="" className="">
                Masukan Jenis Voucher
              </option>
              <option value="Gratis Ongkir" className="text-black">
                Gratis Ongkir
              </option>
              <option value="Diskon Belanja" className="text-black">
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
          <div className="grid grid-cols-2 gap-4">
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

          {state.dataInit.VoucherTypeId.get() == "Diskon Belanja" && (
            <>
              {/* Min Belanja */}
              <InputField
                id="MinimumPurchase"
                label="Minimum Belanja"
                touched={formik.touched.MinimumPurchase}
                errors={formik.errors.MinimumPurchase}
                values={formik.values.MinimumPurchase}
                onChange={formik.handleChange}
              />

              {/* MaximumDiscount */}
              <InputField
                id="MaximumDiscount"
                label="Maksimum Potongsn Harga"
                touched={formik.touched.MaximumDiscount}
                errors={formik.errors.MaximumDiscount}
                values={formik.values.MaximumDiscount}
                onChange={formik.handleChange}
              />

              {/* DiscountPercent */}
              <InputField
                id="DiscountPercent"
                label="Diskon"
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
            touched={formik.touched.ClaimableUserCount}
            errors={formik.errors.ClaimableUserCount}
            values={formik.values.ClaimableUserCount}
            onChange={formik.handleChange}
          />

          {/* MaxClaimLimit */}
          <InputField
            id="MaxClaimLimit"
            label="Batas Klaim Pengguna"
            touched={formik.touched.MaxClaimLimit}
            errors={formik.errors.MaxClaimLimit}
            values={formik.values.MaxClaimLimit}
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
      {/* Alert  */}
      {isAlert && (
        <Alert variant={variant} message={message} onClose={closeAlert} />
      )}
      {/* confirm delete */}
      {showModalEdit && (
        <ModalConfirm
          title="Apakah voucher yang ingin diubah sudah benar?"
          onCancel={closeConfirmEdit}
          onConfirm={handleEdit}
          labelCancel="tidak"
          labelConfirm="iya"
          variant="success"
        />
      )}
      {/* modal back */}
      {showModalBack && (
        <ModalConfirm
          title="Keluar Halaman?"
          description="Kamu akan membatalkan perubahan Ubah Voucher. Semua perubahan tidak akan disimpan"
          onCancel={() => setShowModalBack(false)}
          onConfirm={() => navigate("/admin/voucher")}
          labelCancel="tidak"
          labelConfirm="iya"
          variant="danger"
        />
      )}
    </>
  );
});

export default EditVoucher;
