import * as Yup from "yup";
import { useFormik } from "formik";
import { useCallback, useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  useGetData,
  usePutDataUsingFormData,
} from "../../../../hooks/FetchData";
import Alert from "../../../../components/Alert";
import ErrorPage from "../../../../components/ErrorPage";
import ModalConfirm from "../../../../components/ModalConfirm";

let choosed = "";
let image = [];
let displayImageUrl = [];

export default function UbahProduk() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const location = useLocation();
  const [display, setDisplay] = useState();

  //alert fetching data
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  const swrKey = `admin/products/${productId}`;
  // Modal add
  const [addModal, setAddModal] = useState(null);
  const openAddModal = () => {
    setAddModal(true);
  };
  const closeAddModal = () => {
    setAddModal(false);
  };

  const formik = useFormik({
    initialValues: {
      displayImage: [],
      productName: "",
      category: "",
      weight: "",
      price: "",
      stock: "",
      description: "",
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Nama Produk Tidak Boleh Kosong"),
      category: Yup.string().required("Pilih Salah Satu Kategori"),
      weight: Yup.string()
        .required("Berat Produk Tidak Boleh Kosong")
        .matches("^[0-9]", "Data yang diisi harus Angka"),
      price: Yup.string()
        .required("Harga Produk tidak Boleh Kosong")
        .matches("^[0-9]", "Data yang diisi harus Angka"),
      stock: Yup.string()
        .required("Stok Tidak Boleh Kosong")
        .matches("^[0-9]", "Data yang diisi harus Angka"),
      description: Yup.string().required("Stok Tidak Boleh Kosong"),
    }),
    onSubmit: async () => {
      openAddModal();
    },
  });

  const handleConfrimAdd = async () => {
    const formData = new FormData();
    formData.append("ProductCategoryId", formik.values.category);
    formData.append("Name", formik.values.productName);
    formData.append("Stock", formik.values.stock);
    formData.append("Price", formik.values.price);
    formData.append("Weight", formik.values.weight);
    formData.append("Description", formik.values.description);
    formData.append("PhotoContentUrl1", image[0]);
    formData.append("PhotoContentUrl2", image[1]);
    formData.append("PhotoContentUrl3", image[2]);
    formData.append("PhotoContentUrl4", image[3]);
    formData.append("PhotoContentUrl5", image[4]);

    const response = await putData(formData, productId);
    if (response.Status === 200) {
      console.log(response.Message);
      closeAddModal();
      openAlert("success", response.Message);

      setTimeout(function () {
        navigate("/admin/produk");
      }, 2000);
    } else {
      openAlert("danger", response.Message);
      closeAddModal();
    }
  };

  const isThereSamedisplayImage = (inputFile) => {
    for (let i = 0; i < formik.values.displayImage.length; i++) {
      if (formik.values.displayImage[i] == inputFile) {
        return true;
      }
    }
    return false;
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = (e) => {
        if (isThereSamedisplayImage(e.target.result) == true) {
          openAlert("danger", "ada gambar yang Sama");
        } else {
          var index = displayImageUrl.findIndex((item) => item == choosed);
          displayImageUrl[index] = e.target.result;
          formik.values.displayImage[index] = e.target.result;
          image[index] = file;
          setDisplay(e.target.result);
          choosed = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "image/jpeg": [".jpeg", ".png", ".jpg"],
      "image/jpg": [],
      "image/png": [],
    },
    onDropRejected: () => {
      openAlert("danger", "file tidak memenuhi standard yang diberikan");
    },
  });

  // handle back menu
  const [backModal, setBackModal] = useState(false);
  const openBackModal = () => {
    setBackModal(true);
  };
  const closeBackModal = () => {
    setBackModal(false);
  };

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
  const handleConfirmBack = () => {
    navigate("/admin/produk/");
  };

  const backToMain = () => {
    if (
      formik.values.productName == data.Products.Name &&
      formik.values.category ==
        dataCategory.ProductCategories.find((item) => {
          if (item.Category == data.Products.Category) {
            return item.Id;
          }
        }).Id &&
      formik.values.weight == data.Products.Weight &&
      formik.values.price == data.Products.Price &&
      formik.values.stock == data.Products.Stock &&
      formik.values.description == data.Products.Description
    ) {
      navigate("/admin/produk/");
    } else {
      openBackModal();
    }
  };

  const changeDisplay = (index) => {
    setDisplay(formik.values.displayImage[index]);
    choosed = formik.values.displayImage[index];
  };

  const { data, isLoading, error } = useGetData(swrKey);

  const {
    data: dataCategory,
    isLoading: loadingCategory,
    error: errorCategory,
  } = useGetData("admin/products/category");
  const { putData, isLoading: loading } =
    usePutDataUsingFormData(`admin/products/`);

  useEffect(() => {
    if (data && dataCategory) {
      const dataInialisasi = {
        productName: data.Products.Name,
        category: dataCategory.ProductCategories.find((item) => {
          if (item.Category == data.Products.Category) {
            return item.Id;
          }
        }).Id,
        weight: data.Products.Weight,
        price: data.Products.Price,
        stock: data.Products.Stock,
        description: data.Products.Description,
      };
      formik.setValues(dataInialisasi);
      formik.setFieldValue("displayImage", data.Products.ProductImageUrl);
      displayImageUrl = data.Products.ProductImageUrl;
      choosed = data.Products.ProductImageUrl[0];
    }
  }, [data]);
  if (error || errorCategory) return <ErrorPage />;

  return (
    <>
      {/* alert fetch api */}
      {isAlert && (
        <Alert variant={variant} message={message} onClose={closeAlert} />
      )}
      <div className="flex flex-row row-gap gap-6 ml-8 my-8">
        <label className="cursor-pointer" onClick={() => backToMain()}>
          <ChevronLeftIcon className="w-5 h-5 text-green-500" />
        </label>
        <h6 className="text-h6 font-medium">Ubah Produk</h6>
      </div>
      {isLoading || loading ? (
        <img
          className="h-16 w-16 mx-auto my-20"
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
          alt=""
        />
      ) : (
        <div className="flex w-full">
          {formik.values.displayImage.length == 0 ? (
            <div className="flex-wrap ms-3 w-5/12">
              <label
                id="dropContainer"
                {...getRootProps({ className: "dropzone" })}
                className="flex text-p2 w-full py-40 h-fit items-center rounded-3xl border border-gray-300 border-dashed bg-gray-300"
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
                    <input {...getInputProps()} hidden />
                    <label
                      className="text-base text-green-500 font-semibold cursor-pointer"
                      onClick={open}
                    >
                      Klik untuk Mengunggah
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
              <div className="flex h-16">
                <label
                  className="bg-gray-300 flex cursor-pointer place-content-center items-center h-full w-16 mt-3 ms-3 border-2 border-green-500 rounded-2xl"
                  onClick={open}
                ></label>
                <label
                  className="flex cursor-pointer place-content-center items-center h-full w-16 mt-3 ms-3 border-2 border-green-500 rounded-2xl"
                  onClick={open}
                >
                  <PlusIcon className="w-8 h-8 text-green-400" />
                </label>
              </div>
            </div>
          ) : (
            <div className="flex-wrap relative ms-3 w-5/12">
              <PencilIcon
                className="absolute right-4 top-4 align-self-end w-12 h-12 p-3 text-white bg-green-400 hover:bg-green-500 rounded-full"
                onClick={open}
              />
              <img
                src={display ? display : formik.values.displayImage[0]}
                alt=""
                className="h-96 w-full border-2 border-green-500 rounded-2xl"
              />

              <div className="flex h-16">
                {formik.values.displayImage?.map((file, index) => (
                  <img
                    src={file}
                    alt=""
                    onClick={() => changeDisplay(index)}
                    className="cursor-pointer w-16 h-full mt-3 ms-3 border-2 border-green-500 rounded-2xl"
                  />
                ))}
                {/* {displayImage.length <= 4 ? (
                <label
                  className="flex cursor-pointer place-content-center items-center h-full w-16 mt-3 ms-3 border-2 border-green-500 rounded-2xl"
                  onClick={open}
                >
                  <PlusIcon className="w-8 h-8 text-green-400" />
                </label>
              ) : null} */}
              </div>
            </div>
          )}

          <div className="lg:w-7/12 items-center gap-3">
            <div className="sm:px-10 sm:mt-0 md:px-10 md:mt-52 lg:mt-0  w-full min-w-[300px]">
              <div className="md:mx-1 md:p-1">
                <form onSubmit={formik.handleSubmit}>
                  {/*Product Name input*/}
                  <div className="relative" data-te-input-wrapper-init="">
                    <div className="relative h-10">
                      <input
                        id="productName"
                        className={
                          formik.errors.productName &&
                          formik.touched.productName
                            ? "peer h-full w-full rounded-[7px] border focus:ring-0 border-error-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-error-400 focus:border-t-transparent focus:outline-0 "
                            : "peer h-full w-full rounded-[7px] border focus:ring-0 border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
                        }
                        placeholder="Masukkan Nama Produk"
                        value={formik.values.productName}
                        onChange={formik.handleChange}
                      />
                      <label
                        className={
                          formik.errors.productName &&
                          formik.touched.productName
                            ? "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none font-normal text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-400 after:transition-all text-[11px] leading-tight peer-focus:text-error-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-400"
                            : "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none font-normal text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all text-[11px] leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400"
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
                        value={formik.values.category}
                      >
                        <option value="">Masukkan Kategori Produk</option>
                        {dataCategory?.ProductCategories.map((item) => (
                          <option value={item.Id}>{item.Category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {formik.errors.category && formik.touched.category && (
                    <div className="text-error-500 text-p4 ms-3 mt-2">
                      {formik.errors.category}
                    </div>
                  )}
                  {/*Product Weight input*/}
                  <div className="relative" data-te-input-wrapper-init="">
                    <div className="relative h-10 mt-8">
                      <input
                        id="weight"
                        className={
                          formik.errors.weight && formik.touched.weight
                            ? "peer h-full w-full rounded-[7px] border focus:ring-0 border-error-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-error-400 focus:border-t-transparent focus:outline-0 "
                            : "peer h-full w-full rounded-[7px] border focus:ring-0 border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
                        }
                        placeholder="Masukkan Berat Produk(Gram)"
                        value={formik.values.weight}
                        onChange={formik.handleChange}
                      />
                      <label
                        className={
                          formik.errors.weight && formik.touched.weight
                            ? "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none font-normal text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-400 after:transition-all text-[11px] leading-tight peer-focus:text-error-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-400"
                            : "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none font-normal text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all text-[11px] leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400"
                        }
                      >
                        Berat Produk
                      </label>
                    </div>
                  </div>
                  {formik.errors.weight && formik.touched.weight && (
                    <div className="text-error-500 text-p4 ms-3 mt-1">
                      {formik.errors.weight}
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
                              ? "peer h-full w-full rounded-[7px] border focus:ring-0 border-error-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-error-400 focus:border-t-transparent focus:outline-0 "
                              : "peer h-full w-full rounded-[7px] border focus:ring-0 border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
                          }
                          placeholder="RP.0"
                          value={formik.values.price}
                          onChange={formik.handleChange}
                        />
                        <label
                          className={
                            formik.errors.price && formik.touched.price
                              ? "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none font-normal text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-400 after:transition-all text-[11px] leading-tight peer-focus:text-error-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-400"
                              : "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none font-normal text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all text-[11px] leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400"
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
                              ? "peer h-full w-full rounded-[7px] border focus:ring-0 border-error-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-error-400 focus:border-t-transparent focus:outline-0 "
                              : "peer h-full w-full rounded-[7px] border focus:ring-0 border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
                          }
                          placeholder="Masukkan Stok Produk"
                          value={formik.values.stock}
                          onChange={formik.handleChange}
                        />
                        <label
                          className={
                            formik.errors.stock && formik.touched.stock
                              ? "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none font-normal text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-400 after:transition-all text-[11px] leading-tight peer-focus:text-error-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-400"
                              : "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none font-normal text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all text-[11px] leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400"
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
                  <div className="relative">
                    <div className="relative h-40 mt-8">
                      <label
                        className={
                          formik.errors.description &&
                          formik.touched.description
                            ? "text-p2 text-error-500 mb-3"
                            : "text-p2 text-green-500 mb-3"
                        }
                        htmlFor="description"
                      >
                        Deskripsi
                      </label>
                      <ReactQuill
                        id="description"
                        value={formik.values.description}
                        className="h-24"
                        theme="snow"
                        onChange={(value) => {
                          formik.setFieldValue("description", value);
                        }}
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
                        id="btn_add_product"
                        className="text-p3 ms-3 mb-3 w-fit px-6 inline-block bg-green-500 rounded-full py-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] disabled:bg-green-300"
                        type="submit"
                        data-te-ripple-init=""
                        disabled={!formik.dirty}
                      >
                        Ubah
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {backModal && (
        <ModalConfirm
          title="Keluar Halaman?"
          description="Kamu akan membatalkan perubahan Ubah Produk. Semua perubahan data tidak akan disimpan"
          labelCancel="Batal"
          labelConfirm="Keluar"
          variant="danger"
          onCancel={closeBackModal}
          onConfirm={handleConfirmBack}
        />
      )}

      {/* Modal Add */}
      {addModal && (
        <ModalConfirm
          title="Apakah produk yang ingin di ubah sudah benar?"
          labelCancel="Tidak"
          labelConfirm="Iya"
          variant="success"
          onCancel={closeAddModal}
          onConfirm={() => handleConfrimAdd()}
        />
      )}
    </>
  );
}
