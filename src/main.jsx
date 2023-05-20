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

import Dashboard from "./pages/admin/dashboard/Dashboard";
import Pesanan from "./pages/admin/pesanan/Pesanan";
import Ulasan from "./pages/admin/ulasan/Ulasan";
import Informasi from "./pages/admin/dataInduk/informasi/Informasi";
import Product from "./pages/admin/dataInduk/produk/Product";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminRoot />}>
                <Route index element={<Dashboard />} />
                <Route path="informasi" element={<Informasi />} />
                <Route path="produk" element={<Product />} />
                <Route path="pesanan" element={<Pesanan />} />
                <Route path="ulasan" element={<Ulasan />} />
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
