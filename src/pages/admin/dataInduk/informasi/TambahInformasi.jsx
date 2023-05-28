import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import * as Yup from "yup";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TambahInformasi() {
    const formik = useFormik({
        initialValues: {
            judul: "",
            konten: "",
        },
        validationSchema: Yup.object({
            judul: Yup.string()
                .max(
                    65,
                    "Mohon maaf, entri Anda melebihi batas maksimum 65 karakter"
                )
                .required("Field harus diisi"),
            konten: Yup.string()
                .required("Field harus diisi")
                .test("br-check", "Field harus diisi", (value) => {
                    const strippedHTML = value.replace(/<\/?[^>]+(>|$)/g, ""); // Menghapus semua tag HTML dari konten
                    return strippedHTML.trim().length > 0; // Validasi konten setelah menghapus tag HTML
                }),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>
            <div className="flex flex-row row-gap items-center gap-6 ml-8 mt-8">
                <Link to="/admin/informasi/">
                    <ChevronLeftIcon className="w-5 h-5 text-green-500" />
                </Link>
                <h6 className="text-h6 font-medium">Ubah Informasi</h6>
            </div>
            <form onSubmit={formik.handleSubmit} className="mt-5">
                {/* judul informasi */}
                <div className="relative h-10 mt-3 mx-4 sm:mx-8">
                    <input
                        id="judul"
                        className={
                            formik.errors.judul && formik.touched.judul
                                ? "peer h-full w-full rounded-[7px] border border-error-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-2 focus:border-error-500 focus:border-t-transparent focus:outline-0 "
                                : "peer h-full w-full rounded-[7px] border border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-400 placeholder-shown:border-t-green-400 focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
                        }
                        placeholder=" "
                        value={formik.values.judul}
                        onChange={formik.handleChange}
                    />
                    <label
                        className={
                            formik.errors.judul && formik.touched.judul
                                ? "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-500 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-error-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                : "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        }
                    >
                        Judul Informasi
                    </label>
                </div>
                {formik.errors.judul && formik.touched.judul && (
                    <div className="text-error-500 text-p4 mt-1 ml-12">
                        {formik.errors.judul}
                    </div>
                )}

                {/* Konten Informasi */}
                <div className="mt-10 mx-4 sm:mx-8 flex flex-col gap-2">
                    <label className="text-p2" htmlFor="konten">
                        Konten Informasi
                    </label>

                    <ReactQuill
                        id="konten"
                        value={formik.values.konten}
                        className="h-80 "
                        theme="snow"
                        onChange={(value) =>
                            formik.setFieldValue("konten", value)
                        }
                    />
                </div>
                {formik.errors.konten && formik.touched.konten && (
                    <div className="text-error-500 text-p4 ml-12 relative top-[45px]">
                        {formik.errors.konten}
                    </div>
                )}
                {/* submit button */}
                <div className="flex flex-row gap-2 relative top-[72px] mx-8 justify-end ">
                    <button
                        className="px-4 py-[10px] bg-green-50 text-green-500 font-semibold rounded-full disabled:text-green-300"
                        type="submit"
                        data-te-ripple-init=""
                        disabled={!formik.dirty}
                    >
                        Simpan sebagai draft
                    </button>
                    <button
                        className="px-4 py-[10px] bg-green-500 font-semibold text-white rounded-full  disabled:bg-green-300 duration-100 hover:bg-green-600 active:border-2 
                        active:border-green-300"
                        type="submit"
                        data-te-ripple-init=""
                        disabled={!(formik.isValid && formik.dirty)}
                    >
                        Terbitkan
                    </button>
                </div>
            </form>
        </div>
    );
}
