import React, { useEffect, useState } from "react";
import Widget from "../../../components/widget";
import BarChart from "../../../components/BarChart";

const Dashboard = () => {
  const [pendapatan, setPendapatan] = useState("80.000.000");
  const [pengguna, setPengguna] = useState("1.000");
  const [pesanan, setPesanan] = useState("80.000");

  const [itemList, setItemList] = useState([]);


  const data = [
    {
      no: "010123",
      nama: "Totebag",
      kategori: "Perabot",
      stok: 210,
      harga: "Rp. 35.000",
      status: "Tersedia",
    },
    {
      no: "010124",
      nama: "Gelas",
      kategori: "Perabot",
      stok: 200,
      harga: "Rp. 35.000",
      status: "Tersedia",
    },
    {
      no: "010125",
      nama: "Botol",
      kategori: "Perabot",
      stok: 240,
      harga: "Rp. 35.000",
      status: "Habis",
    },
    {
      no: "010125",
      nama: "Botol",
      kategori: "Perabot",
      stok: 240,
      harga: "Rp. 35.000",
      status: "Habis",
    }
  ];

  useEffect(() => {
    setItemList(data);
  }, []);
  return (
    <>
      <h1 className="font-normal text-h4 m-8">Dashboard</h1>
      <div className="m-8 grid grid-cols-3 grid-flow-col gap-4">
        <Widget type="pendapatan" data={pendapatan} />
        <Widget type="pengguna" data={pengguna} />
        <Widget type="pesanan" data={pesanan} />
      </div>
      <BarChart />
      <div className="grid grid-cols-2 gap-20 m-8">
        <div id="data1">
          <p className="text-p2 font-medium">
            3 Barang yang paling banyak dipesan
          </p>
          <table className="w-full text-left whitespace-nowrap table-auto mt-4">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="py-[14px] px-[10px] text-p2 font-medium">No</th>
                <th className="py-[14px] px-[10px] text-p2 font-medium">Nama Barang</th>
                <th className="py-[14px] px-[10px] text-p2 font-medium">Total Pemesanan</th>
              </tr>
            </thead>
            <tbody>
            {itemList &&
              itemList.slice(0,3).map((row, index) => (
                <tr key={index} className="even:bg-gray-50 text-p4">
                  <td className="py-[18px] px-[10px]">{index + 1}.</td>
                  <td className="py-[18px] px-[10px]">{row.nama}</td>
                  <td className="py-[18px] px-[10px]">{row.stok}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div id="data2">
          <p className="text-p2 font-medium">
            3 Barang yang paling banyak diberikan ulasan
          </p>
          <table className="w-full text-left whitespace-nowrap table-auto mt-4">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="py-[14px] px-[10px] text-p2 font-medium">No</th>
                <th className="py-[14px] px-[10px] text-p2 font-medium">Nama Barang</th>
                <th className="py-[14px] px-[10px] text-p2 font-medium">Total Ulasan</th>
              </tr>
            </thead>
            <tbody>
            {itemList &&
              itemList.slice(0,3).map((row, index) => (
                <tr key={index} className="even:bg-gray-50 text-p4">
                  <td className="py-[18px] px-[10px]">{index + 1}.</td>
                  <td className="py-[18px] px-[10px]">{row.nama}</td>
                  <td className="py-[18px] px-[10px]">{row.stok}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
