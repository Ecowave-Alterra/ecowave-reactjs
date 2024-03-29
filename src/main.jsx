import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import LoggedIn, { LoggedOut } from "./utils/privateRoute";

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
import DetailProduk from "./pages/admin/dataInduk/produk/detailProduk";
import DetailUlasan from "./pages/admin/ulasan/DetailUlasan";

// Pengiriman
import OpsiPengiriman from "./pages/admin/dataInduk/opsi";

// Voucher & Kategori
import Kategori from "./pages/admin/dataInduk/kategori";
import Voucher from "./pages/admin/dataInduk/voucher";
import TambahVoucher from "./pages/admin/dataInduk/voucher/TambahVoucher";
import UbahVoucher from "./pages/admin/dataInduk/voucher/UbahVoucher";

//Metode Pembayaran
import MetodePembayaran from "./pages/admin/dataInduk/metodePembayaran";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<LoggedIn />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<LoggedOut />}>
        <Route path="/admin" element={<AdminRoot />}>
          <Route index element={<Dashboard />} />
          <Route path="pesanan" element={<Pesanan />} />
          <Route path="pesanan/detail/:id" element={<DetailPesanan />} />
          <Route path="ulasan" element={<Ulasan />} />
          <Route path="ulasan/:reviewId" element={<DetailUlasan />} />

          {/* Route data induk */}
          <Route path="produk" element={<Produk />} />
          <Route path="produk/tambah" element={<TambahProduk />} />
          <Route path="produk/ubah/:productId" element={<UbahProduk />} />
          <Route path="produk/:productId" element={<DetailProduk />} />
          <Route path="informasi" element={<Informasi />} />
          <Route path="informasi/tambah" element={<TambahInformasi />} />
          <Route path="informasi/ubah/:userId" element={<UbahInformasi />} />
          <Route path="informasi/:userId" element={<DetailInformasi />} />
          <Route path="opsi" element={<OpsiPengiriman />} />
          <Route path="voucher" element={<Voucher />} />
          <Route path="voucher/tambah" element={<TambahVoucher />} />
          <Route path="voucher/ubah/:voucherId" element={<UbahVoucher />} />
          <Route path="metode-pembayaran" element={<MetodePembayaran />} />
          <Route path="kategori" element={<Kategori />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
