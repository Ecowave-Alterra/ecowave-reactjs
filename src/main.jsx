import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//layout
import AdminRoot from "./routes/AdminRoot";

//pages
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";

// Dashboard & Ulasan

import Dashboard from "./pages/admin/dashboard";
import Ulasan from "./pages/admin/ulasan";

// Pesanan
import Pesanan from "./pages/admin/pesanan";
import DetailPesanan from "./pages/admin/pesanan/DetailPesanan";

//informasi
import Informasi from "./pages/admin/dataInduk/informasi";
import TambahInformasi from "./pages/admin/dataInduk/informasi/TambahInformasi";
import UbahInformasi from "./pages/admin/dataInduk/informasi/UbahInformasi";
import DetailInformasi from "./pages/admin/dataInduk/informasi/DetailInformasi";

//Produk
import Produk from "./pages/admin/dataInduk/produk";
import TambahProduk from "./pages/admin/dataInduk/produk/TambahProduk";
import UbahProduk from "./pages/admin/dataInduk/produk/UbahProduk";
import DetailUlasan from "./pages/admin/ulasan/DetailUlasan";

// Pengiriman
import MetodePengiriman from "./pages/admin/dataInduk/metodePengiriman";
import OpsiPengiriman from "./pages/admin/dataInduk/opsiPengiriman";

// Voucher & Kategori
import Kategori from "./pages/admin/dataInduk/kategori";
import Voucher from "./pages/admin/dataInduk/voucher";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminRoot />}>
        <Route index element={<Dashboard />} />
        <Route path="pesanan" element={<Pesanan />} />
        <Route path="pesanan/detail" element={<DetailPesanan />} />
        <Route path="ulasan" element={<Ulasan />} />
        <Route path="ulasan/detail" element={<DetailUlasan />} />

        {/* Route data induk */}
          <Route path="produk" element={<Produk />} />
          <Route path="produk/tambah" element={<TambahProduk />} />
          <Route path="produk/ubah" element={<UbahProduk />} />
          <Route path="informasi" element={<Informasi />} />
          <Route path="informasi/tambah" element={<TambahInformasi />} />
          <Route path="informasi/ubah" element={<UbahInformasi />} />
          <Route path="informasi/:id" element={<DetailInformasi />} />
          <Route path="opsi-pengiriman" element={<OpsiPengiriman />} />
          <Route path="voucher" element={<Voucher />} />
          <Route path="metode-pengiriman" element={<MetodePengiriman />} />
          <Route path="kategori" element={<Kategori />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
