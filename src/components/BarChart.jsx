import React, { useEffect, useState } from "react";
// ChartJs
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

// Heroicons
import { ChevronDownIcon } from "@heroicons/react/24/outline";

// Gambar
import Crane from "../assets/img/ChartEmpty.png";

// Chart JS Register Items
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [value, setValue] = useState("mingguan");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const arrayLabels = {
    mingguan: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    bulanan: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],
    tahunan: ["2023", "2024"],
  };

  const labels = arrayLabels[value];
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: "#14B885",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: "#EF372A",
      },
    ],
  };

  const options = {
    plugins: {
      legend: false,
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "Pendapatan (Rupiah dalam Juataan)",
          color: "#737D8C",
          font: {
            size: "18px",
            weight: "normal",
          },
        },
      },
    },
  };

  useEffect(() => {}, [value]);
  return (
    <>
      {/* Chart Section */}
      <div className="border-[1px] border-gray-300 rounded-xl m-8 p-8 ">
        <div className="flex justify-between">
          <h1 className="text-h6 font-semibold">Total Pendapatan</h1>
          <div className="w-1/3">
            <div className="relative">
              <select
                id="select-bar"
                className="block appearance-none w-full border border-green-400 text-black text-p2 font-medium py-3 px-4 rounded-xl leading-tight focus:outline-none focus:border-green-400"
                onChange={handleChange}
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
        {/* Bar */}
        {data.datasets.length == 0 ? (
          <div>
          <div className="flex justify-center">
            <img src={Crane} alt="Empty case img" className="w-[300px] h-[200px] m-4"/>
          </div>
          <h1 className="text-center font-semibold text-gray-500 text-p3">Belum ada data tersedia</h1>
          </div>
        ) : (
          <Bar data={data} options={options} />
        )}
        {/* <Bar data={data} options={options} /> */}
      </div>
      {/* End Chart Section */}
    </>
  );
};

export default BarChart;
