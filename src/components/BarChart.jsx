import React from "react";
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

const BarChart = ({ children, detail }) => {
  const incomeLabel = detail ? detail[0] : [];
  const arrayLabels = detail ? Object.keys(incomeLabel) : [];
  const valuePerLabel = detail ? Object.values(incomeLabel) : [];

  const labels = arrayLabels;
  const data = {
    labels,
    datasets: [
      {
        label: "Pendapatan",
        data: valuePerLabel,
        backgroundColor: "#14B885",
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

  return (
    <>
      {/* Chart Section */}
      <div className="border-[1px] border-gray-300 rounded-xl m-8 p-8 ">
        {children}
        {/* Bar */}
        {data.datasets.length == 0 ? (
          <div>
            <div className="flex justify-center">
              <img
                src={Crane}
                alt="Empty case img"
                className="w-[300px] h-[200px] m-4"
              />
            </div>
            <h1 className="text-center font-semibold text-gray-500 text-p3">
              Belum ada data tersedia
            </h1>
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
