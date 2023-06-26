import Widget from "../../../../components/Widget";
import { useState, useEffect } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import { useGetData } from "../../../../hooks/FetchData";
import { useObservable } from "@legendapp/state/react";

const image = [];

export default function DetailProduk() {
  let { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [backLocation, setBackLocation] = useState("/admin/produk");

  const swrKey = `admin/products/${productId}`;

  const { data, isLoading, error } = useGetData(swrKey);
  if (error) return <ErrorPage />;
  console.log("data detail :");
  console.log(data);

  const [display, setDisplay] = useState("");

  const changeDisplay = (index) => {
    setDisplay(data.Products.ProductImageUrl[index]);
  };

  useEffect(() => {
    if (location.state) {
      setBackLocation(
        `/admin/produk/?filter=${location.state.filter}&page=${location.state.page}&search=${location.state.search}`
      );
    }
  }, []);

  return (
    <>
      <div className="flex flex-row row-gap gap-6 ml-8 my-8">
        <button id="btn_back_informasi" onClick={() => navigate(backLocation)}>
          <ChevronLeftIcon className="w-5 h-5 text-green-500" />
        </button>
        <h6 className="text-h6 font-medium">Lihat Produk</h6>
      </div>

      {isLoading ? (
        <div className="mx-auto h-screen flex items-center">
          <img
            className="h-16 w-16 mx-auto"
            src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
            alt=""
          />
        </div>
      ) : (
        <>
          <div className="m-8 grid grid-cols-3 grid-flow-col gap-4">
            <Widget type="sisaproduk" data={data.Products.Stock} />
            <Widget type="terjual" data={data.Products.TotalOrders} />
            <Widget type="pendapatan" data={data.Products.TotalRevenue} />
          </div>
          <div className="flex w-full">
              <div className="flex-wrap relative ms-3 w-5/12">
              <img
                src={display == "" ? data.Products.ProductImageUrl[0] : display}
                alt=""
                className="h-96 w-full border-2 border-gray-700 rounded-2xl"
              />

              <div className="flex h-16">
                {data.Products.ProductImageUrl.map((file, index) => (
                  <img
                    src={file}
                    alt=""
                    onClick={() => changeDisplay(index)}
                    className="cursor-pointer w-16 h-full mt-3 ms-3 border-2 border-gray-700 rounded-2xl"
                  />
                ))}
              </div>
            </div>
            
            <label id="dropContainer" className="lg:w-7/12 items-center gap-3">
              <div className="sm:px-10 sm:mt-0 md:px-10 md:mt-52 lg:mt-0  w-full min-w-[300px]">
                <div className="md:mx-1 md:p-1">
                  <form>
                    {/*Product Name input*/}
                    <div className="relative" data-te-input-wrapper-init="">
                      <div className="relative h-10">
                        <input
                          id="itemID"
                          className={
                            "peer h-full w-full rounded-[7px] border border-gray-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:outline-0 "
                          }
                          value={data.Products.ProductId}
                          disabled
                        />
                        <label
                          className={
                            "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-400 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-400"
                          }
                        >
                          Item ID
                        </label>
                      </div>
                    </div>

                    {/*Product Name input*/}
                    <div className="relative" data-te-input-wrapper-init="">
                      <div className="relative h-10 mt-8">
                        <input
                          id="productName"
                          className={
                            "peer h-full w-full rounded-[7px] border border-gray-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:outline-0 "
                          }
                          value={data.Products.Name}
                          disabled
                        />
                        <label
                          className={
                            "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-400 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-400"
                          }
                        >
                          Nama Produk
                        </label>
                      </div>
                    </div>

                    {/*Product Weight input*/}
                    <div className="relative" data-te-input-wrapper-init="">
                      <div className="relative h-10 mt-8">
                        <input
                          id="weight"
                          className={
                            "peer h-full w-full rounded-[7px] border border-gray-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:outline-0 "
                          }
                          value={data.Products.Weight}
                          disabled
                        />
                        <label
                          className={
                            "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-400 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-400"
                          }
                        >
                          Berat Produk
                        </label>
                      </div>
                    </div>

                    {/*Category input*/}
                    <div className="relative" data-te-input-wrapper-init="">
                      <div className="relative h-10 mt-8">
                        <input
                          id="category"
                          className={
                            "peer h-full w-full rounded-[7px] border border-gray-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:outline-0 "
                          }
                          value={data.Products.Category}
                          disabled
                        />
                        <label
                          className={
                            "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-400 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-400"
                          }
                        >
                          Kategori
                        </label>
                      </div>
                    </div>

                    {/*Price and Stock input*/}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative" data-te-input-wrapper-init="">
                        <div className="relative h-10 mt-8">
                          <input
                            id="price"
                            className={
                              "peer h-full w-full rounded-[7px] border border-gray-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:outline-0 "
                            }
                            value={data.Products.Price}
                            disabled
                          />
                          <label
                            className={
                              "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-400 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-400"
                            }
                          >
                            Harga
                          </label>
                        </div>
                      </div>
                      <div className="relative" data-te-input-wrapper-init="">
                        <div className="relative h-10 mt-8">
                          <input
                            id="stock"
                            className={
                              "peer h-full w-full rounded-[7px] border border-gray-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:outline-0 "
                            }
                            value={data.Products.Stock}
                            disabled
                          />
                          <label
                            className={
                              "before:content[' '] after:content[' '] before:text-p3 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-400 after:transition-all peer-placeholder-shown:text-p3 peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-400"
                            }
                          >
                            Stok
                          </label>
                        </div>
                      </div>
                    </div>

                    {/*Description Input*/}
                    <div className="relative" data-te-input-wrapper-init="">
                      <div className="relative h-40 mt-8">
                        <label
                          className={"text-p2 text-gray-700 mb-3"}
                          htmlFor="description"
                        >
                          Deskripsi
                        </label>
                        <ReactQuill
                          id="description"
                          value={data.Products.Description}
                          className="h-32"
                          theme="snow"
                          readOnly="true"
                        />
                      </div>
                    </div>
                  </form>
                  <button
                onClick={() => navigate("/admin/ulasan/"+productId)}
                className="mt-12 mb-4 flex flex-row gap-[13px] items-center rounded-full border-green-500 border  py-[10px] pl-[21px] pr-4 hover:bg-gray-50 duration-200"
            >
                <p className=" text-p3 text-green-500 font-semibold">
                Lihat Review
                </p>
            </button>
                </div>
              </div>
            </label>
          </div>
        </>
      )}
    </>
  );
}
