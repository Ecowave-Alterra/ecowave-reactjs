import { Button, Modal } from "flowbite-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Dialog } from "@headlessui/react";

export default function TambahKategoriModal({ isOpen, setIsOpen }) {
    const formik = useFormik({
        initialValues: {
            kategori: "",
        },
        validationSchema: Yup.object({
            kategori: Yup.string()
                .max(
                    15,
                    "Mohon maaf, entri Anda melebihi batas maksimum 15 karakter"
                )
                .required("Field harus diisi"),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <Dialog
            className="absolute w-[360px] top-[35%] right-[40%]  rounded-[28px] overflow-hidden shadow-2"
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <form onSubmit={formik.handleSubmit} className="mt-5 ">
                <Dialog.Panel>
                    <Dialog.Title className="border-b-2 border-gray-300 text-gray-500 px-6 pt-2 pb-2 font-semibold text-p3">
                        Tambah Kategori
                    </Dialog.Title>
                    <Dialog.Description className="py-3">
                        <div className="space-y-6">
                            <div className="relative h-10 mt-3 mx-2 sm:mx-4 ">
                                <input
                                    id="kategori"
                                    className={
                                        formik.errors.kategori &&
                                        formik.touched.kategori
                                            ? "peer h-full w-full rounded-[7px] border border-error-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-2 focus:border-error-500 focus:border-t-transparent focus:outline-0 "
                                            : "peer h-full w-full rounded-[7px] border border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-400 placeholder-shown:border-t-green-400 focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
                                    }
                                    placeholder=""
                                    value={formik.values.kategori}
                                    onChange={formik.handleChange}
                                />
                                <label
                                    className={
                                        formik.errors.kategori &&
                                        formik.touched.kategori
                                            ? "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-500 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-error-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                            : "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                    }
                                >
                                    Kategori
                                </label>
                            </div>
                            {formik.errors.kategori &&
                                formik.touched.kategori && (
                                    <div className="relative bottom-5 text-error-500 text-p4  ml-6">
                                        {formik.errors.kategori}
                                    </div>
                                )}
                        </div>
                    </Dialog.Description>
                    <div className="flex flex-row gap-2 items-center justify-end ml-auto p-3">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-[10px] text-p3 text-[#535A65] bg-white font-semibold rounded-full"
                        >
                            batal
                        </button>
                        <button
                            disabled={!(formik.isValid && formik.dirty)}
                            type="sumbit"
                            className="px-4 py-[10px] text-p3 text-white bg-[#059669] font-semibold rounded-full disabled:text-white  disabled:bg-green-300 duration-100 hover:bg-green-600 active:border-2 active:border-green-300"
                        >
                            tambah
                        </button>
                    </div>
                </Dialog.Panel>
            </form>
        </Dialog>
    );
}