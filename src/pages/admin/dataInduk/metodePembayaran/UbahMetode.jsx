import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import "react-quill/dist/quill.snow.css";

const datauji = {
    kategori:"E-Wallet",
    metode:"Dana",
    rekening: 19301300
}

export default function UbahMetodePembayaran() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
        kategori: [datauji.kategori],
        metode: [datauji.metode],
        rekening: [datauji.rekening],
        },
        validationSchema: Yup.object({
        kategori: Yup.string().required("Pilih Salah Satu Kategori"),
        metode: Yup.string().required("Pilih Salah Satu Metode Pembayaran"),
        rekening: Yup.number("Hanya Mengandung Angka").required(
            "Nomor Rekening tidak Boleh Kosong"
        ),
        }),
        onSubmit: (e) => {
        console.log(formik.values);
        },
    });

    return (
        <>
        <div className="flex flex-row row-gap gap-6 ml-8 my-8">
            <Link to="/admin/metode-pembayaran/">
            <ChevronLeftIcon className="w-5 h-5 text-green-500" />
            </Link>
            <h6 className="text-h6 font-medium">Ubah Metode Pembayaran</h6>
        </div>
        <form onSubmit={formik.handleSubmit}>
            {/* Kategori Pembayaran */}
            <div className="relative h-10 mt-6 mx-4 sm:mx-8">
            <select
                id="kategori"
                className={
                formik.errors.kategori && formik.touched.kategori
                    ? "h-fit ps-2 w-full rounded-[7px] border border-error-500 bg-transparent py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-2 focus:border-error-500 focus:outline-0 "
                    : "h-fit w-full rounded-[7px] border border-green-400 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-400 placeholder-shown:border-t-green-400 focus:border-2 focus:border-green-400 focus:outline-0 "
                }
                onChange={formik.handleChange}
                value={formik.values.kategori}
            >
                <option value="">Pilih Kategori Pembayaran</option>
                <option value="E-Wallet">E-Wallet</option>
                <option value="Bank">Bank</option>
            </select>
            </div>
            {formik.errors.kategori && formik.touched.kategori && (
            <div className="text-error-500 text-p4 mt-1 ml-12">
                {formik.errors.kategori}
            </div>
            )}
            {/* Kategori Pembayaran */}
            <div className="relative h-10 mt-4 mx-4 sm:mx-8">
            <select
                id="metode"
                className={
                formik.errors.metode && formik.touched.metode
                    ? "h-fit ps-2 w-full rounded-[7px] border border-error-500 bg-transparent py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-2 focus:border-error-500 focus:outline-0 "
                    : "h-fit w-full rounded-[7px] border border-green-400 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-400 placeholder-shown:border-t-green-400 focus:border-2 focus:border-green-400 focus:outline-0 "
                }
                disabled={!formik.values.kategori}
                onChange={formik.handleChange}
                value={formik.values.metode}
            >
                <option value="">Pilih Metode Pembayaran</option>
                {formik.values.kategori == "E-Wallet" ? (
                <>
                    <option value="OVO">OVO</option>
                    <option value="Gopay">Gopay</option>
                    <option value="Dana">Dana</option>
                    <option value="Shoppe Pay">Shoppe Pay</option>
                </>
                ) : (
                <>
                    <option value="BCA">BCA</option>
                    <option value="BRI">BRI</option>
                    <option value="BNI">BNI</option>
                    <option value="Mandiri">Mandiri</option>
                </>
                )}
            </select>
            </div>
            {formik.errors.metode && formik.touched.metode && (
            <div className="text-error-500 text-p4 mt-1 ml-12">
                {formik.errors.metode}
            </div>
            )}
            {/* rekening */}
            <div className="relative h-10 mt-4 mx-4 sm:mx-8">
            <input
                id="rekening"
                className={
                formik.errors.rekening && formik.touched.rekening
                    ? "peer h-full w-full rounded-[7px] border border-error-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-2 focus:border-error-500 focus:border-t-transparent focus:outline-0 "
                    : "peer h-full w-full rounded-[7px] border border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-400 placeholder-shown:border-t-green-400 focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
                }
                placeholder=" "
                value={formik.values.rekening}
                onChange={formik.handleChange}
            />
            <label
                className={
                formik.errors.rekening && formik.touched.rekening
                    ? "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-500 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-error-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                    : "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                }
            >
                Nomor Rekening
            </label>
            </div>
            {formik.errors.rekening && formik.touched.rekening && (
            <div className="text-error-500 text-p4 mt-1 ml-12">
                {formik.errors.rekening}
            </div>
            )}
            {/*Semua button*/}
            <div className="flex w-full mx-4 sm:mx-8 mt-8 justify-end float-right">
            {/*button Batal*/}
            <div className="text-center">
                <button
                className="text-p3 mb-3 px-6 w-fit inline-block border-green-500 border-solid border-2  text-green-500 rounded-full py-2 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                data-te-ripple-init=""
                onClick={() => navigate("/admin/metode-pembayaran")}
                >
                Batal
                </button>
            </div>
            {/*Submit button*/}
            <div className="text-center">
                <button
                className="text-p3 ms-3 mb-3 w-fit px-6 inline-block bg-green-500 rounded-full py-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] disabled:bg-green-300"
                type="submit"
                data-te-ripple-init=""
                disabled={!(formik.dirty)}
                >
                Tambah
                </button>
            </div>
            </div>
        </form>
        </>
    );
}
