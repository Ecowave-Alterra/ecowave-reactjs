import * as Yup from "yup";
import { useFormik } from "formik";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill/lib";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import "react-quill/dist/quill.snow.css";

export default function UbahProduk(){
    const InputImageRef = useRef(null);
  const ImageRef = useRef(null);
  const navigate = useNavigate()
  console.log(ImageRef.current)


  const formik = useFormik({
    initialValues: {
      productName: "",
      category: "",
      price: "",
      stock: "",
      description: "",
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Nama Produk Tidak Boleh Kosong"),
      category: Yup.string().required("Pilih Salah Satu Kategori"),
      price: Yup.string().required("Harga Produk tidak Boleh Kosong"),
      stock: Yup.string().required("Stok Tidak Boleh Kosong"),
      description: Yup.string().required("Deskripsi Tidak boleh Kosong")
      .test("br-check", "Deskripsi Tidak boleh Kosong", (value) => {
        const strippedHTML = value.replace(/<\/?[^>]+(>|$)/g, "");
        return strippedHTML.trim().length > 0;
    }),
    }),
    onSubmit: (e) => {
      console.log("masuk");
    },
  });

  function ShowImages() {
    const imgFile = InputImageRef.current.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      ImageRef.current.src = e.target.result;
    };
    reader.readAsDataURL(imgFile);
  }

  return (
    <>
      <div className="flex flex-row row-gap items-center gap-6 ml-8 my-8">
        <Link to="/admin/produk/">
          <ChevronLeftIcon className="w-5 h-5 text-green-500" />
        </Link>
        <h6 className="text-h6 font-medium">Ubah Produk</h6>
      </div>
      <div className="lg:flex md:flex-wrap w-full" aria-hidden={ImageRef.current === null}>
          <label
            id="dropContainer"
            hidden
            className="flex text-p2 lg:w-5/12 py-40 h-fit items-center rounded-3xl border border-gray-300 border-dashed bg-[#D9D9D9]"
          >
            <div className="flex-wrap text-center w-full">
              <button className="bg-gray-50 rounded-full p-3 cursor-default">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </button>
              <div className="space-y-2 ">
                <label
                  className="text-base text-green-500 font-semibold cursor-pointer"
                  htmlFor="doc"
                >
                  Klik untuk Mengunggah
                  <input
                    type="file"
                    id="doc"
                    name="doc"
                    accept="png, jpg"
                    ref={InputImageRef}
                    onChange={ShowImages}
                    hidden
                  />
                </label>
                <span className="text-sm text-gray-500">
                  {" "}
                  atau seret dan lepas
                </span>
              </div>
              <div className="space-y-2 ">
                <span className="text-sm text-gray-500">
                  PNG, atau JPG (maks. 640x312px)
                </span>
              </div>
            </div>
          </label>
        
        <img width={100} src="" ref={ImageRef} alt="" hidden/>

        <label id="dropContainer" className="lg:w-7/12 items-center gap-3">
          <div className="sm:px-10 sm:mt-0 md:px-10 md:mt-52 lg:mt-0  w-full min-w-[300px]">
            <div className="md:mx-1 md:p-1">
              <form onSubmit={formik.handleSubmit}>
                {/*Product Name input*/}
                <div className="relative" data-te-input-wrapper-init="">
                  <div className="relative h-10">
                    <input
                      id="productName"
                      className={
                        formik.errors.productName && formik.touched.productName
                          ? "peer h-full w-full rounded-[7px] border border-error-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-2 focus:border-error-500 focus:border-t-transparent focus:outline-0 "
                          : "peer h-full w-full rounded-[7px] border border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-400 placeholder-shown:border-t-green-400 focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
                      }
                      placeholder=" "
                      value={formik.values.productName}
                      onChange={formik.handleChange}
                    />
                    <label
                      className={
                        formik.errors.productName && formik.touched.productName
                          ? "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-500 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-error-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                          : "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                      }
                    >
                      Nama Produk
                    </label>
                  </div>
                </div>
                {formik.errors.productName && formik.touched.productName && (
                  <div className="text-error-500 text-p4 ms-3 mt-1">
                    {formik.errors.productName}
                  </div>
                )}
                {/*Category input*/}
                <div className="relative" data-te-input-wrapper-init="">
                  <div className="relative h-10 mt-8">
                    <select
                      id="category"
                      className={
                        formik.errors.category && formik.touched.category
                          ? "h-fit ps-2 w-full rounded-[7px] border border-error-500 bg-transparent py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-2 focus:border-error-500 focus:outline-0 "
                          : "h-fit w-full rounded-[7px] border border-green-400 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-400 placeholder-shown:border-t-green-400 focus:border-2 focus:border-green-400 focus:outline-0 "
                      }
                      onChange={formik.handleChange}
                    >
                      <option value="">--Pilih Salah Satu--</option>
                      <option value="Makanan">Kantong</option>
                      <option value="Minuman">DLL</option>
                    </select>
                  </div>
                </div>
                {formik.errors.category && formik.touched.category && (
                  <div className="text-error-500 text-p4 ms-3 mt-2">
                    {formik.errors.category}
                  </div>
                )}

                {/*Price and Stock input*/}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative" data-te-input-wrapper-init="">
                    <div className="relative h-10 mt-8">
                      <input
                        id="price"
                        className={
                          formik.errors.price && formik.touched.price
                            ? "peer h-full w-full rounded-[7px] border border-error-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-2 focus:border-error-500 focus:border-t-transparent focus:outline-0 "
                            : "peer h-full w-full rounded-[7px] border border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-400 placeholder-shown:border-t-green-400 focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
                        }
                        placeholder=" "
                        value={formik.values.price}
                        onChange={formik.handleChange}
                      />
                      <label
                        className={
                          formik.errors.price && formik.touched.price
                            ? "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-500 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-error-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            : "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        }
                      >
                        Harga
                      </label>
                    </div>
                    {formik.errors.price && formik.touched.price && (
                      <div className="text-error-500 text-p4 ms-3 mt-1">
                        {formik.errors.price}
                      </div>
                    )}
                  </div>
                  <div className="relative" data-te-input-wrapper-init="">
                    <div className="relative h-10 mt-8">
                      <input
                        id="stock"
                        className={
                          formik.errors.stock && formik.touched.stock
                            ? "peer h-full w-full rounded-[7px] border border-error-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-2 focus:border-error-500 focus:border-t-transparent focus:outline-0 "
                            : "peer h-full w-full rounded-[7px] border border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-400 placeholder-shown:border-t-green-400 focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
                        }
                        placeholder=" "
                        value={formik.values.stock}
                        onChange={formik.handleChange}
                      />
                      <label
                        className={
                          formik.errors.stock && formik.touched.stock
                            ? "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-500 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-error-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            : "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        }
                      >
                        Stock
                      </label>
                    </div>
                    {formik.errors.stock && formik.touched.stock && (
                      <div className="text-error-500 text-p4 ms-3 mt-1">
                        {formik.errors.stock}
                      </div>
                    )}
                  </div>
                </div>

                {/*Description Input*/}
                <div className="relative" data-te-input-wrapper-init="">
                  <div className="relative h-40 mt-8">
                    <label className="text-p2 text-green-500 mb-3" htmlFor="description">
                      Konten Informasi
                    </label>
                    <ReactQuill
                      id="description"
                      className="h-32"
                      theme="snow"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                {formik.errors.description && formik.touched.description && (
                  <div className="text-error-500 text-p4 ms-3 mt-1">
                    {formik.errors.description}
                  </div>
                )}

                {/*Semua button*/}
                <div className="flex w-full mt-16 justify-end float-right">
                  {/*Submit button*/}
                  <div className="text-center">
                    <button
                      className="text-p3 mb-3 px-6 w-fit inline-block border-green-500 border-solid border-2  text-green-500 rounded-full py-2 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                      data-te-ripple-init=""
                      onClick={() => navigate("/admin/produk")}
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
                      disabled={!(formik.dirty && formik.isValid)}
                    >
                      Ubah
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </label>
      </div>
    </>
  );
}