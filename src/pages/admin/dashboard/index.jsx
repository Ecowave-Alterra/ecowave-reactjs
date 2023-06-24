import React, { useEffect } from "react";

// Komponen
import Widget from "../../../components/Widget";
import BarChart from "../../../components/BarChart";
import {useGetData} from "../../../hooks/FetchData";

// Heroicons
import { ChevronDownIcon } from "@heroicons/react/24/outline";

// Legendapp
import { observable } from "@legendapp/state";
import { observer } from "@legendapp/state/react";

// Router dom
import { useSearchParams } from "react-router-dom";

// management State menggunakan LegendApp
const state = observable({
  chartFilter: "mingguan",
});

const Dashboard = observer(() => {
  // Handle params url
  let [searchParams, setSearchParams] = useSearchParams();
  const filterValue = searchParams.get("filter") || state.chartFilter.get();

  // fetch data SWR
  const swrKey = `admin/dashboard?filter=${filterValue}`;
  const { data, isLoading, error } = useGetData(swrKey);

  // Fungsi handle filter untuk chart
  const handleChangeFilter = (newFilterValue) => {
    state.chartFilter.set(newFilterValue.target.value);
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params.toString());
      updatedParams.set("filter", state.chartFilter.get());
      return updatedParams;
    });
  };

  // Kembali ke filter mingguan saat reload halaman
  useEffect(() => {
    state.chartFilter.set("mingguan")
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params.toString());
      updatedParams.set("filter", "mingguan");
      return updatedParams;
    })
  }, [])
  return (
    <>
      <h1 className="font-normal text-h4 m-8">Dashboard</h1>
      <div className="m-8 grid grid-cols-3 grid-flow-col gap-4">
        <Widget
          type="pendapatan"
          data={
            isLoading
              ? ""
              : data.TotalRevenues?.toLocaleString("en-US").replace(/,/g, ".")
          }
        />
        <Widget
          type="pengguna"
          data={
            isLoading
              ? ""
              : data.TotalUsers?.toLocaleString("en-US").replace(/,/g, ".")
          }
        />
        <Widget
          type="pesanan"
          data={
            isLoading
              ? ""
              : data.TotalOrders?.toLocaleString("en-US").replace(/,/g, ".")
          }
        />
      </div>
      {isLoading ? (
        <img
          className="h-16 w-16 mx-auto"
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
          alt=""
        />
      ) : (
        <BarChart detail={data?.ChartData}>
          <div className="flex justify-between">
            <h1 className="text-h6 font-semibold">Total Pendapatan</h1>
            <div className="w-1/3">
              <div className="relative">
                <select
                  id="select-bar"
                  className="block appearance-none w-full border border-green-400 text-black text-p2 font-medium py-3 px-4 rounded-xl leading-tight focus:outline-none focus:border-green-400"
                  onChange={handleChangeFilter}
                  value={state.chartFilter.get()}
                >
                  <option value="mingguan">Mingguan</option>
                  <option value="bulanan">Bulanan</option>
                  <option value="tahunan">Tahunan</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDownIcon className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </BarChart>
      )}

      <div className="grid grid-cols-2 gap-20 m-8">
        {/* Table top 3 produk */}
        <div id="data1">
          <p className="text-p2 font-medium">
            3 Barang yang paling banyak dipesan
          </p>

          <table className="w-full text-left whitespace-nowrap table-auto mt-4">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="py-[14px] px-[10px] text-p2 font-medium">No</th>
                <th className="py-[14px] px-[10px] text-p2 font-medium">
                  Nama Barang
                </th>
                <th className="py-[14px] px-[10px] text-p2 font-medium">
                  Total Pemesanan
                </th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr>
                  <td>
                    <p className="text-center text-gray-500 text-p3 font-semibold my-14 py-4 bg-gray-50">
                      Loading data ..
                    </p>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {data?.FavouriteProducts &&
                  data?.FavouriteProducts.map((product, index) => (
                    <tr key={index} className="even:bg-gray-50 text-p4">
                      <td className="py-[18px] px-[10px]">{index + 1}.</td>
                      <td className="py-[18px] px-[10px]">{product.Name}</td>
                      <td className="py-[18px] px-[10px]">{product.TotalOrders}</td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
          {isLoading ? null : (
            <>
              {data?.FavouriteProducts == null && (
                <p className="text-center text-gray-500 text-p3 font-semibold my-14 py-4 bg-gray-50">
                  Belum ada data tersedia
                </p>
              )}
            </>
          )}
        </div>

        {/* Table top 3 produk diulas*/}
        <div id="data2">
          <p className="text-p2 font-medium">
            3 Barang yang paling banyak diberikan ulasan
          </p>
          <table className="w-full text-left whitespace-nowrap table-auto mt-4">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="py-[14px] px-[10px] text-p2 font-medium">No</th>
                <th className="py-[14px] px-[10px] text-p2 font-medium">
                  Nama Barang
                </th>
                <th className="py-[14px] px-[10px] text-p2 font-medium">
                  Total Ulasan
                </th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr>
                  <td>
                    <p className="text-center text-gray-500 text-p3 font-semibold my-14 py-4 bg-gray-50">
                      Loading data ..
                    </p>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {data?.TopReviewProducts &&
                  data?.TopReviewProducts.map((product, index) => (
                    <tr key={index} className="even:bg-gray-50 text-p4">
                      <td className="py-[18px] px-[10px]">{index + 1}.</td>
                      <td className="py-[18px] px-[10px]">{product.Name}</td>
                      <td className="py-[18px] px-[10px]">{product.TotalReviews}</td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
          {isLoading ? null : (
            <>
              {data?.TopReviewProducts == null && (
                <p className="text-center text-gray-500 text-p3 font-semibold my-14 py-4 bg-gray-50">
                  Belum ada data tersedia
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
});

export default Dashboard;
