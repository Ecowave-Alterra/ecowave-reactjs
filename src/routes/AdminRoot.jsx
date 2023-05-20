import React, { useState } from "react";
import {
  ArrowRightOnRectangleIcon,
  CircleStackIcon,
  InboxStackIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  ChartBarSquareIcon,
  ChevronDownIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import Logo from "../assets/img/logo.jpg";
import { Outlet } from "react-router-dom";

export default function AdminRoot() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <nav
        className={`fixed top-0 bottom-0 lg:left-0 w-[300px] overflow-y-auto text-center bg-green-50 ${
          isSidebarOpen ? "" : "hidden"
        }`}
      >
        <div className="flex flex-col justify-between h-full">
          <div id="navigation">
            {/* Logo */}
            <div className="flex justify-between p-5">
              <img src={Logo} alt="Ecowave Logo" className=" h-[68.25px]" />
              <XMarkIcon
                className="w-6 h-6 text-green-400 mobile:hidden hover:bg-green-500 rounded-full hover:text-white"
                onClick={toggleSidebar}
              />
            </div>
            <div className="mb-9 mx-8 bg-green-400 h-[1px]"></div>

            {/* Navigation Start */}
            <div className="flex items-center rounded-md my-2 mx-8 p-3 duration-300 cursor-pointer text-gray-600 hover:bg-green-500 hover:text-white hover:border-[1px] hover:border-black">
              <ChartBarSquareIcon className="w-5 h-5" />
              <span className="ml-2 text-p2">Dashboard</span>
            </div>

            <div
              className="flex items-center rounded-md my-2 mx-8 p-3 duration-300 cursor-pointer text-gray-600 hover:bg-green-500 hover:text-white hover:border-[1px] hover:border-black "
              onClick={toggleDropdown}
            >
              <CircleStackIcon className="w-5 h-5" />
              <div className="flex justify-between w-full items-center">
                <span className="ml-2 text-p2 ">Data Induk</span>
                <span
                  className={`text-sm ${isDropdownOpen ? "rotate-180" : ""}`}
                  id="arrow"
                >
                  <ChevronDownIcon className="w-5 h-5 " />
                </span>
              </div>
            </div>
            <div
              className={`text-left text-sm w-4/5 mx-auto text-p2 text-gray-600 ${
                isDropdownOpen ? "" : "hidden"
              }`}
              id="submenu"
            >
              <h1 className="cursor-pointer rounded-md py-3 ps-[62px] hover:text-green-500">
                Produk
              </h1>
              <h1 className="cursor-pointer rounded-md py-3 ps-[62px] hover:text-green-500">
                Informasi
              </h1>
            </div>
            <div className="flex items-center rounded-md my-2 mx-8 p-3 duration-300 cursor-pointer text-gray-600 hover:bg-green-500 hover:text-white hover:border-[1px] hover:border-black ">
              <InboxStackIcon className="w-5 h-5 " />
              <span className="ml-2 text-p2 ">Pesanan</span>
            </div>
            <div className="flex items-center rounded-md my-2 mx-8 p-3 duration-300 cursor-pointer text-gray-600 hover:bg-green-500 hover:text-white hover:border-[1px] hover:border-black ">
              <ChatBubbleLeftRightIcon className="w-5 h-5 " />
              <span className="ml-2 text-p2 ">Ulasan</span>
            </div>
          </div>
          {/* Admin Section */}
          <div className=" flex justify-between items-center w-full mt-6 p-8">
            <div className="flex justify-center items-center  space-x-2">
              <div>
                <img
                  className="rounded-full w-8 h-8"
                  src="https://i.ibb.co/L1LQtBm/Ellipse-1.png"
                  alt="admin-avatar"
                />
              </div>
              <div className="flex justify-start flex-col items-start">
                <p className="cursor-pointer text-black text-p4 font-medium">
                  Renaldo Surya Saputra
                </p>
                <p className="cursor-pointer text-black text-p5">
                  dododo@gmail.com
                </p>
              </div>
            </div>
            <div>
              <ArrowRightOnRectangleIcon className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>
      </nav>
      {/* Content */}
      <div
        className={`min-h-screen max-w-[100%] bg-rose-200  ${
          isSidebarOpen ? "!ml-[300px]" : ""
        }`}
        id="content"
      >
        <span
          className={`text-gray-300 cursor-pointer ${isSidebarOpen && "hidden"}`}
          onClick={toggleSidebar}
        >
          <Bars3Icon className="w-6 h-6 m-2 bg-green-500 text-white rounded-sm hover:bg-green-600" />
        </span>
        <Outlet />
      </div>
    </>
  );
}
