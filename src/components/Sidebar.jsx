import React, { useState } from 'react';
import {
    ArrowRightOnRectangleIcon,
    XMarkIcon,
    ChevronDownIcon,
    Bars3Icon,
} from "@heroicons/react/24/outline";
import Logo from "../assets/img/logo.png";
import { NavLink } from "react-router-dom";
import { removeAuthCookie } from '../utils/cookies';


export default function Sidebar({ children }) {

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSubMenuActive, setSubMenuActive] = useState();

  const subMenus = [
    { name: 'Produk', link: '/admin/produk' },
    { name: 'Informasi', link: '/admin/informasi' },
    { name: 'Opsi Pengiriman', link: '/admin/opsi' },
    { name: "Voucher", link: "/admin/voucher" },
    { name: "Metode Pembayaran", link: "/admin/metode-pembayaran" },
    { name: "Kategori", link: "/admin/kategori" },
  ];


    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

  const setAction = (stat) => {
    setSubMenuActive(stat);
    console.log(isSubMenuActive);
  };

  const handleLogout = () => {
    removeAuthCookie()
    window.location.reload()
  };


  return (
    <>
      {/* Sidebar */}
      <nav
        className={`fixed top-0 bottom-0 sm:w-[300px] w-full overflow-y-auto text-center bg-green-50 z-50 ${
          isSidebarOpen ? "" : "hidden"
        }`}
      >
        {/* Start Nav Section */}
        <div className="flex flex-col justify-between sm:h-full h-fit">
          <div id="navigation">
            {/* Logo */}
            <div className="flex justify-between p-5">
              <img src={Logo} alt="Ecowave Logo" className=" h-[68.25px]" />
              <XMarkIcon
                className="w-6 h-6 text-green-400 sm:hidden hover:bg-green-500 rounded-full hover:text-white"
                onClick={toggleSidebar}
              />
            </div>
            <div className="mb-9 mx-8 bg-green-400 h-[1px]"></div>

            {/* Navigation Start */}
            {/* Dashboard */}
            <NavLink
              end
              onClick={() => setAction(false)}
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center rounded-md my-2 mx-8 p-3 duration-300 cursor-pointer  fill-white bg-green-500 text-white border-[1px] border-black"
                  : "flex items-center rounded-md my-2 mx-8 p-3 duration-300 cursor-pointer text-gray-600 fill-gray-600 hover:fill-white hover:bg-green-500 hover:text-white hover:border-[1px] hover:border-black"
              }
            >
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.0625 5.7793C16.6233 4.73967 15.9865 3.79513 15.1875 2.99805C14.3904 2.19904 13.4459 1.56227 12.4062 1.12305C11.3262 0.666016 10.1816 0.435547 9 0.435547C7.81836 0.435547 6.67383 0.666016 5.59375 1.12305C4.55412 1.56227 3.60958 2.19904 2.8125 2.99805C2.01349 3.79513 1.37673 4.73967 0.9375 5.7793C0.480469 6.85938 0.25 8.00391 0.25 9.18555C0.25 11.7773 1.38867 14.2187 3.37305 15.8867L3.40625 15.9141C3.51953 16.0078 3.66211 16.0605 3.80859 16.0605H14.1934C14.3398 16.0605 14.4824 16.0078 14.5957 15.9141L14.6289 15.8867C16.6113 14.2187 17.75 11.7773 17.75 9.18555C17.75 8.00391 17.5176 6.85938 17.0625 5.7793ZM13.8711 14.5762H4.12891C3.37421 13.8957 2.77103 13.0641 2.35851 12.1354C1.94599 11.2068 1.73334 10.2017 1.73438 9.18555C1.73438 7.24414 2.49023 5.41992 3.86328 4.04883C5.23633 2.67578 7.06055 1.91992 9 1.91992C10.9414 1.91992 12.7656 2.67578 14.1367 4.04883C15.5098 5.42188 16.2656 7.24609 16.2656 9.18555C16.2656 11.248 15.3965 13.1992 13.8711 14.5762ZM11.1777 6.48047C11.1484 6.45139 11.1087 6.43508 11.0674 6.43508C11.0261 6.43508 10.9864 6.45139 10.957 6.48047L9.30664 8.13086C8.94141 8.0332 8.53711 8.12695 8.25 8.41406C8.14831 8.51556 8.06763 8.63612 8.01258 8.76884C7.95754 8.90155 7.9292 9.04382 7.9292 9.1875C7.9292 9.33118 7.95754 9.47345 8.01258 9.60616C8.06763 9.73888 8.14831 9.85944 8.25 9.96094C8.3515 10.0626 8.47206 10.1433 8.60477 10.1984C8.73749 10.2534 8.87976 10.2817 9.02344 10.2817C9.16712 10.2817 9.30938 10.2534 9.4421 10.1984C9.57482 10.1433 9.69537 10.0626 9.79688 9.96094C9.9329 9.82532 10.0307 9.6562 10.0804 9.47067C10.1302 9.28514 10.13 9.08976 10.0801 8.9043L11.7305 7.25391C11.791 7.19336 11.791 7.09375 11.7305 7.0332L11.1777 6.48047ZM8.57031 4.49805H9.42969C9.51562 4.49805 9.58594 4.42773 9.58594 4.3418V2.7793C9.58594 2.69336 9.51562 2.62305 9.42969 2.62305H8.57031C8.48438 2.62305 8.41406 2.69336 8.41406 2.7793V4.3418C8.41406 4.42773 8.48438 4.49805 8.57031 4.49805ZM13.6484 8.75586V9.61523C13.6484 9.70117 13.7188 9.77148 13.8047 9.77148H15.3672C15.4531 9.77148 15.5234 9.70117 15.5234 9.61523V8.75586C15.5234 8.66992 15.4531 8.59961 15.3672 8.59961H13.8047C13.7188 8.59961 13.6484 8.66992 13.6484 8.75586ZM13.8965 4.9043L13.2891 4.29688C13.2597 4.2678 13.22 4.25148 13.1787 4.25148C13.1374 4.25148 13.0977 4.2678 13.0684 4.29688L11.9629 5.40234C11.9338 5.43171 11.9175 5.47137 11.9175 5.5127C11.9175 5.55402 11.9338 5.59368 11.9629 5.62305L12.5703 6.23047C12.6309 6.29102 12.7305 6.29102 12.791 6.23047L13.8965 5.125C13.957 5.06445 13.957 4.96484 13.8965 4.9043ZM4.93945 4.29688C4.91009 4.2678 4.87043 4.25148 4.8291 4.25148C4.78777 4.25148 4.74812 4.2678 4.71875 4.29688L4.11133 4.9043C4.08225 4.93366 4.06594 4.97332 4.06594 5.01465C4.06594 5.05598 4.08225 5.09563 4.11133 5.125L5.2168 6.23047C5.27734 6.29102 5.37695 6.29102 5.4375 6.23047L6.04492 5.62305C6.10547 5.5625 6.10547 5.46289 6.04492 5.40234L4.93945 4.29688ZM4.11719 8.59961H2.55469C2.46875 8.59961 2.39844 8.66992 2.39844 8.75586V9.61523C2.39844 9.70117 2.46875 9.77148 2.55469 9.77148H4.11719C4.20312 9.77148 4.27344 9.70117 4.27344 9.61523V8.75586C4.27344 8.66992 4.20312 8.59961 4.11719 8.59961Z" />
              </svg>
              <span className="ml-2 text-p2">Dashboard</span>
            </NavLink>

            {/* Data Induk */}
            <div
              className={`flex items-center rounded-md my-2 mx-8 p-3 duration-300 cursor-pointer text-gray-600 fill-gray-600 hover:fill-white hover:bg-green-500 hover:text-white hover:border-[1px] hover:border-black ${
                isSubMenuActive &&
                "fill-white bg-green-500 text-white border-[1px] border-black"
              }`}
              onClick={toggleDropdown}
            >
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7.375 6.74805C6.93229 6.74805 6.46354 6.72852 5.96875 6.68945C5.47396 6.65039 4.97591 6.57878 4.47461 6.47461C3.97331 6.37044 3.48828 6.23698 3.01953 6.07422C2.55078 5.91146 2.1276 5.70964 1.75 5.46875V14.873C1.75 15.0228 1.81185 15.1628 1.93555 15.293C2.05924 15.4232 2.21549 15.5501 2.4043 15.6738C2.5931 15.7975 2.80794 15.9017 3.04883 15.9863C3.28971 16.071 3.52083 16.1523 3.74219 16.2305C3.96354 16.3086 4.17188 16.3672 4.36719 16.4062C4.5625 16.4453 4.71224 16.4779 4.81641 16.5039C5.13542 16.5625 5.45443 16.6081 5.77344 16.6406C6.09245 16.6732 6.41797 16.6992 6.75 16.7188V17.9883C6.46354 17.9753 6.11198 17.946 5.69531 17.9004C5.27865 17.8548 4.83594 17.7832 4.36719 17.6855C3.89844 17.5879 3.4362 17.4609 2.98047 17.3047C2.52474 17.1484 2.11133 16.9564 1.74023 16.7285C1.36914 16.5007 1.06966 16.2337 0.841797 15.9277C0.613932 15.6217 0.5 15.2702 0.5 14.873V3.62305C0.5 3.31706 0.571615 3.03711 0.714844 2.7832C0.858073 2.5293 1.04688 2.30469 1.28125 2.10938C1.51562 1.91406 1.78581 1.73503 2.0918 1.57227C2.39779 1.40951 2.70703 1.27604 3.01953 1.17188C3.33203 1.06771 3.64128 0.976562 3.94727 0.898438C4.25326 0.820312 4.52669 0.761719 4.76758 0.722656C5.19727 0.644531 5.63021 0.589193 6.06641 0.556641C6.5026 0.524089 6.9388 0.504557 7.375 0.498047C7.8112 0.498047 8.2474 0.514323 8.68359 0.546875C9.11979 0.579427 9.55273 0.638021 9.98242 0.722656C10.2168 0.768229 10.487 0.826823 10.793 0.898438C11.099 0.970052 11.4082 1.0612 11.7207 1.17188C12.0332 1.28255 12.3424 1.41602 12.6484 1.57227C12.9544 1.72852 13.2246 1.9043 13.459 2.09961C13.6934 2.29492 13.8854 2.52279 14.0352 2.7832C14.1849 3.04362 14.2565 3.32357 14.25 3.62305V7.99805H13V5.46875C12.6159 5.70964 12.1927 5.91146 11.7305 6.07422C11.2682 6.23698 10.7865 6.36719 10.2852 6.46484C9.78385 6.5625 9.28581 6.63411 8.79102 6.67969C8.29622 6.72526 7.82422 6.74805 7.375 6.74805ZM7.375 1.74805C7.00391 1.74805 6.58073 1.76758 6.10547 1.80664C5.63021 1.8457 5.14844 1.91081 4.66016 2.00195C4.17188 2.0931 3.70638 2.22331 3.26367 2.39258C2.82096 2.56185 2.44661 2.76693 2.14062 3.00781C2.04948 3.07943 1.96159 3.16732 1.87695 3.27148C1.79232 3.37565 1.75 3.49284 1.75 3.62305C1.75 3.74674 1.79232 3.86068 1.87695 3.96484C1.96159 4.06901 2.04948 4.16016 2.14062 4.23828C2.4401 4.48568 2.8112 4.69076 3.25391 4.85352C3.69661 5.01628 4.16211 5.14323 4.65039 5.23438C5.13867 5.32552 5.62044 5.39388 6.0957 5.43945C6.57096 5.48503 6.9974 5.50456 7.375 5.49805C7.74609 5.49805 8.16927 5.47852 8.64453 5.43945C9.11979 5.40039 9.60156 5.33529 10.0898 5.24414C10.5781 5.15299 11.0436 5.02279 11.4863 4.85352C11.929 4.68424 12.3001 4.47917 12.5996 4.23828C12.6908 4.16667 12.7786 4.07878 12.8633 3.97461C12.9479 3.87044 12.9935 3.75326 13 3.62305C13 3.49935 12.9577 3.38542 12.873 3.28125C12.7884 3.17708 12.6973 3.08594 12.5996 3.00781C12.3001 2.76042 11.929 2.55534 11.4863 2.39258C11.0436 2.22982 10.5814 2.10286 10.0996 2.01172C9.61784 1.92057 9.13607 1.85221 8.6543 1.80664C8.17253 1.76107 7.74609 1.74154 7.375 1.74805ZM18 8.96484V19.248H8V9.00391L10.9688 12.9199L13.0195 9.20898L15.0801 12.9199L18 8.96484ZM16.75 12.7637L14.9336 15.2344L13.0195 11.7871L11.125 15.2051L9.25 12.7246V17.998H16.75V12.7637Z" />
              </svg>
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
              className={`text-left w-4/5 mx-auto  ${
                isDropdownOpen ? "" : "hidden"
              }`}
              id="submenu"
            >
              {subMenus.map((menu) => (
                <NavLink
                  key={menu.name+1}
                  onClick={() => setAction(true)}
                  to={menu.link}
                  className={({ isActive }) =>
                    isActive ? "text-green-500" : "text-gray-600"
                  }
                >
                  <p className="cursor-pointer py-3 ps-[62px] text-p2 font-medium hover:bg-green-200 hover:text-black">
                    {menu.name}
                  </p>
                </NavLink>
              ))}
            </div>

            {/* Pesanan */}
            <NavLink
              onClick={() => setAction(false)}
              to="/admin/pesanan"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center rounded-md my-2 mx-8 p-3 duration-300 cursor-pointer  fill-white bg-green-500 text-white border-[1px] border-black"
                  : "flex items-center rounded-md my-2 mx-8 p-3 duration-300 cursor-pointer text-gray-600 fill-gray-600 hover:fill-white hover:bg-green-500 hover:text-white hover:border-[1px] hover:border-black"
              }
            >
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.6667 0.915039H8.33337C7.67033 0.915039 7.03445 1.17843 6.56561 1.64727C6.09677 2.11611 5.83337 2.752 5.83337 3.41504V9.24837C5.83337 9.91141 6.09677 10.5473 6.56561 11.0161C7.03445 11.485 7.67033 11.7484 8.33337 11.7484H16.6667C17.3298 11.7484 17.9656 11.485 18.4345 11.0161C18.9033 10.5473 19.1667 9.91141 19.1667 9.24837V3.41504C19.1667 2.752 18.9033 2.11611 18.4345 1.64727C17.9656 1.17843 17.3298 0.915039 16.6667 0.915039ZM17.5 9.24837C17.5 9.46939 17.4122 9.68135 17.256 9.83763C17.0997 9.99391 16.8877 10.0817 16.6667 10.0817H8.33337C8.11236 10.0817 7.9004 9.99391 7.74412 9.83763C7.58784 9.68135 7.50004 9.46939 7.50004 9.24837V3.41504C7.50004 3.19403 7.58784 2.98206 7.74412 2.82578C7.9004 2.6695 8.11236 2.58171 8.33337 2.58171H16.6667C16.8877 2.58171 17.0997 2.6695 17.256 2.82578C17.4122 2.98206 17.5 3.19403 17.5 3.41504V9.24837ZM14.5834 5.91504C14.2749 5.91608 13.9778 6.03194 13.75 6.24004C13.5708 6.07717 13.3482 5.96985 13.1092 5.93112C12.8701 5.8924 12.625 5.92394 12.4035 6.02192C12.1821 6.11989 11.9939 6.28008 11.8617 6.48301C11.7296 6.68595 11.6593 6.92288 11.6593 7.16504C11.6593 7.40719 11.7296 7.64413 11.8617 7.84707C11.9939 8.05 12.1821 8.21019 12.4035 8.30816C12.625 8.40613 12.8701 8.43768 13.1092 8.39895C13.3482 8.36023 13.5708 8.25291 13.75 8.09004C13.9005 8.22681 14.0821 8.32481 14.279 8.37552C14.476 8.42624 14.6823 8.42814 14.8801 8.38106C15.078 8.33399 15.2613 8.23936 15.4143 8.10539C15.5673 7.97141 15.6853 7.80214 15.758 7.61224C15.8308 7.42235 15.8561 7.21757 15.8318 7.01567C15.8075 6.81377 15.7343 6.62085 15.6186 6.45364C15.5029 6.28643 15.3481 6.14997 15.1677 6.05612C14.9873 5.96226 14.7867 5.91384 14.5834 5.91504ZM13.3334 13.415C13.1124 13.415 12.9004 13.5028 12.7441 13.6591C12.5878 13.8154 12.5 14.0274 12.5 14.2484V15.0817C12.5 15.3027 12.4122 15.5147 12.256 15.671C12.0997 15.8272 11.8877 15.915 11.6667 15.915H3.33337C3.11236 15.915 2.9004 15.8272 2.74412 15.671C2.58784 15.5147 2.50004 15.3027 2.50004 15.0817V11.7484H3.33337C3.55439 11.7484 3.76635 11.6606 3.92263 11.5043C4.07891 11.348 4.16671 11.1361 4.16671 10.915C4.16671 10.694 4.07891 10.4821 3.92263 10.3258C3.76635 10.1695 3.55439 10.0817 3.33337 10.0817H2.50004V9.24837C2.50004 9.02736 2.58784 8.8154 2.74412 8.65912C2.9004 8.50284 3.11236 8.41504 3.33337 8.41504C3.55439 8.41504 3.76635 8.32724 3.92263 8.17096C4.07891 8.01468 4.16671 7.80272 4.16671 7.58171C4.16671 7.36069 4.07891 7.14873 3.92263 6.99245C3.76635 6.83617 3.55439 6.74837 3.33337 6.74837C2.67033 6.74837 2.03445 7.01176 1.56561 7.48061C1.09677 7.94945 0.833374 8.58533 0.833374 9.24837V15.0817C0.833374 15.7447 1.09677 16.3806 1.56561 16.8495C2.03445 17.3183 2.67033 17.5817 3.33337 17.5817H11.6667C12.3297 17.5817 12.9656 17.3183 13.4345 16.8495C13.9033 16.3806 14.1667 15.7447 14.1667 15.0817V14.2484C14.1667 14.0274 14.0789 13.8154 13.9226 13.6591C13.7664 13.5028 13.5544 13.415 13.3334 13.415ZM5.00004 14.2484H5.83337C6.05439 14.2484 6.26635 14.1606 6.42263 14.0043C6.57891 13.848 6.66671 13.6361 6.66671 13.415C6.66671 13.194 6.57891 12.9821 6.42263 12.8258C6.26635 12.6695 6.05439 12.5817 5.83337 12.5817H5.00004C4.77903 12.5817 4.56707 12.6695 4.41079 12.8258C4.25451 12.9821 4.16671 13.194 4.16671 13.415C4.16671 13.6361 4.25451 13.848 4.41079 14.0043C4.56707 14.1606 4.77903 14.2484 5.00004 14.2484Z" />
              </svg>

              <span className="ml-2 text-p2 ">Pesanan</span>
            </NavLink>

            {/* Ulasan */}
            <NavLink
              onClick={() => setAction(false)}
              to="/admin/ulasan"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center rounded-md my-2 mx-8 p-3 duration-300 cursor-pointer  fill-white bg-green-500 text-white border-[1px] border-black"
                  : "flex items-center rounded-md my-2 mx-8 p-3 duration-300 cursor-pointer text-gray-600 fill-gray-600 hover:fill-white hover:bg-green-500 hover:text-white hover:border-[1px] hover:border-black"
              }
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.99996 14.2484L1.37496 16.8734C1.23607 17.0123 1.08329 17.047 0.916626 16.9775C0.749959 16.9081 0.666626 16.7762 0.666626 16.5817V2.58171C0.666626 2.12337 0.829959 1.73087 1.15663 1.40421C1.48329 1.07754 1.87551 0.914485 2.33329 0.91504H15.6666C16.125 0.91504 16.5175 1.07837 16.8441 1.40504C17.1708 1.73171 17.3338 2.12393 17.3333 2.58171V12.5817C17.3333 13.04 17.17 13.4325 16.8433 13.7592C16.5166 14.0859 16.1244 14.2489 15.6666 14.2484H3.99996ZM2.33329 12.5817H15.6666V2.58171H2.33329V12.5817ZM8.99996 9.64421L10.5833 10.6025C10.7361 10.6998 10.8888 10.6962 11.0416 10.5917C11.1944 10.4873 11.25 10.345 11.2083 10.165L10.7916 8.35254L12.2083 7.12337C12.3472 6.99837 12.3888 6.84921 12.3333 6.67587C12.2777 6.50254 12.1527 6.40865 11.9583 6.39421L10.1041 6.24837L9.37496 4.54004C9.30551 4.37337 9.18051 4.29004 8.99996 4.29004C8.8194 4.29004 8.6944 4.37337 8.62496 4.54004L7.89579 6.24837L6.04163 6.39421C5.84718 6.4081 5.72218 6.50199 5.66663 6.67587C5.61107 6.84976 5.65274 6.99893 5.79163 7.12337L7.20829 8.35254L6.79163 10.165C6.74996 10.3456 6.80551 10.4881 6.95829 10.5925C7.11107 10.697 7.26385 10.7003 7.41663 10.6025L8.99996 9.64421Z" />
              </svg>

              <span className="ml-2 text-p2 ">Ulasan</span>
            </NavLink>
          </div>
          {/* End Nav Section */}

          {/* Admin Section */}
          <div className="flex justify-between items-center w-full mt-6 p-8">
            <div className="flex justify-center items-center space-x-2">
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
            <div
              className="rounded-full text-green-500 cursor-pointer"
              onClick={handleLogout}
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
            </div>
          </div>
        </div>
      </nav>
      {/* Content */}
      <div
        className="min-h-screen max-w-[100%] bg-rose-200 sm:!ml-[300px]"
        id="content"
      >
        <span
          className={`text-gray-300 cursor-pointer ${
            isSidebarOpen && "hidden"
          }`}
          onClick={toggleSidebar}
        >
          <Bars3Icon className="w-6 h-6 m-2 bg-green-500 text-white rounded-sm hover:bg-green-600" />
        </span>
        {children}
      </div>
    </>
  );
}