import React from "react";

const Widget = (props) => {
  switch (props.type) {
    case "pendapatan":
      return (
        <>
          <div className="p-8 max-w-[337px] h-[200px] rounded-xl border-[1px] border-gray-300 grid grid-rows-3 grid-flow-col gap-4">
            <div className="flex justify-end">
              <svg
                width={20}
                height={16}
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.46665 0.799805C1.83013 0.799805 1.21968 1.05266 0.769594 1.50275C0.319507 1.95284 0.0666504 2.56329 0.0666504 3.1998V7.9998C0.0666504 8.63632 0.319507 9.24677 0.769594 9.69686C1.21968 10.1469 1.83013 10.3998 2.46665 10.3998V3.1998H14.4667C14.4667 2.56329 14.2138 1.95284 13.7637 1.50275C13.3136 1.05266 12.7032 0.799805 12.0667 0.799805H2.46665ZM4.86665 7.9998C4.86665 7.36329 5.11951 6.75284 5.56959 6.30275C6.01968 5.85266 6.63013 5.5998 7.26665 5.5998H16.8667C17.5032 5.5998 18.1136 5.85266 18.5637 6.30275C19.0138 6.75284 19.2667 7.36329 19.2667 7.9998V12.7998C19.2667 13.4363 19.0138 14.0468 18.5637 14.4969C18.1136 14.9469 17.5032 15.1998 16.8667 15.1998H7.26665C6.63013 15.1998 6.01968 14.9469 5.56959 14.4969C5.11951 14.0468 4.86665 13.4363 4.86665 12.7998V7.9998ZM12.0667 12.7998C12.7032 12.7998 13.3136 12.5469 13.7637 12.0969C14.2138 11.6468 14.4667 11.0363 14.4667 10.3998C14.4667 9.76329 14.2138 9.15284 13.7637 8.70275C13.3136 8.25266 12.7032 7.9998 12.0667 7.9998C11.4301 7.9998 10.8197 8.25266 10.3696 8.70275C9.91951 9.15284 9.66665 9.76329 9.66665 10.3998C9.66665 11.0363 9.91951 11.6468 10.3696 12.0969C10.8197 12.5469 11.4301 12.7998 12.0667 12.7998Z"
                  fill="#059669"
                />
              </svg>
            </div>
            <p className="font-normal text-p1">Total Pendapatan</p>
            <p className="font-semibold text-h6">
              {props.data ? `Rp.${props.data}` : "-"}
            </p>
          </div>
        </>
      );

    case "pengguna":
      return (
        <>
          <div className="p-8 max-w-[337px] h-[200px] rounded-xl border-[1px] border-gray-300 grid grid-rows-3 grid-flow-col gap-4">
            <div className="flex justify-end">
              <svg
                width={23}
                height={18}
                viewBox="0 0 23 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.1332 4.19961C10.1332 5.15439 9.75392 6.07006 9.07879 6.74519C8.40366 7.42032 7.48798 7.79961 6.5332 7.79961C5.57842 7.79961 4.66275 7.42032 3.98762 6.74519C3.31249 6.07006 2.9332 5.15439 2.9332 4.19961C2.9332 3.24483 3.31249 2.32916 3.98762 1.65402C4.66275 0.978894 5.57842 0.599609 6.5332 0.599609C7.48798 0.599609 8.40366 0.978894 9.07879 1.65402C9.75392 2.32916 10.1332 3.24483 10.1332 4.19961ZM19.7332 4.19961C19.7332 4.67237 19.6401 5.1405 19.4592 5.57727C19.2783 6.01404 19.0131 6.4109 18.6788 6.74519C18.3445 7.07948 17.9476 7.34466 17.5109 7.52558C17.0741 7.70649 16.606 7.79961 16.1332 7.79961C15.6604 7.79961 15.1923 7.70649 14.7555 7.52558C14.3188 7.34466 13.9219 7.07948 13.5876 6.74519C13.2533 6.4109 12.9882 6.01404 12.8072 5.57727C12.6263 5.1405 12.5332 4.67237 12.5332 4.19961C12.5332 3.24483 12.9125 2.32916 13.5876 1.65402C14.2627 0.978894 15.1784 0.599609 16.1332 0.599609C17.088 0.599609 18.0037 0.978894 18.6788 1.65402C19.3539 2.32916 19.7332 3.24483 19.7332 4.19961ZM14.8492 17.3996C14.9044 17.0072 14.9332 16.6076 14.9332 16.1996C14.936 14.3142 14.3017 12.4832 13.1332 11.0036C14.0453 10.477 15.08 10.1998 16.1332 10.1998C17.1864 10.1998 18.221 10.477 19.1331 11.0036C20.0452 11.5302 20.8027 12.2876 21.3293 13.1997C21.8559 14.1118 22.1332 15.1464 22.1332 16.1996V17.3996H14.8492ZM6.5332 10.1996C8.1245 10.1996 9.65063 10.8317 10.7758 11.957C11.9011 13.0822 12.5332 14.6083 12.5332 16.1996V17.3996H0.533203V16.1996C0.533203 14.6083 1.16534 13.0822 2.29056 11.957C3.41578 10.8317 4.9419 10.1996 6.5332 10.1996Z"
                  fill="#059669"
                />
              </svg>
            </div>
            <p className="font-normal text-p1">Total Pengguna</p>
            <p className="font-semibold text-h6">
              {props.data ? props.data : "-"}
            </p>
          </div>
        </>
      );
    case "pesanan":
      return (
        <>
          <div className="p-8 max-w-[337px] h-[200px] rounded-xl border-[1px] border-gray-300 grid grid-rows-3 grid-flow-col gap-4">
            <div className="flex justify-end">
              <svg
                width={20}
                height={21}
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5999 0.200195C1.28164 0.200195 0.976418 0.326623 0.751374 0.551667C0.526331 0.776711 0.399902 1.08194 0.399902 1.4002C0.399902 1.71846 0.526331 2.02368 0.751374 2.24872C0.976418 2.47377 1.28164 2.6002 1.5999 2.6002H3.0639L3.4299 4.0666C3.43354 4.08348 3.43754 4.10028 3.4419 4.117L5.0715 10.633L3.9999 11.7034C2.4879 13.2154 3.5583 15.8002 5.6967 15.8002H15.9999C16.3182 15.8002 16.6234 15.6738 16.8484 15.4487C17.0735 15.2237 17.1999 14.9185 17.1999 14.6002C17.1999 14.2819 17.0735 13.9767 16.8484 13.7517C16.6234 13.5266 16.3182 13.4002 15.9999 13.4002H5.6967L6.8967 12.2002H14.7999C15.0227 12.2001 15.2411 12.1379 15.4305 12.0207C15.62 11.9035 15.7731 11.7359 15.8727 11.5366L19.4727 4.3366C19.5641 4.15369 19.6072 3.95046 19.598 3.7462C19.5888 3.54194 19.5276 3.34342 19.4201 3.16947C19.3127 2.99552 19.1625 2.85192 18.984 2.75229C18.8054 2.65266 18.6044 2.6003 18.3999 2.6002H5.5359L5.1639 1.1086C5.0989 0.849099 4.94905 0.618766 4.73815 0.454182C4.52726 0.289598 4.26742 0.200202 3.9999 0.200195H1.5999ZM17.1999 18.8002C17.1999 19.2776 17.0103 19.7354 16.6727 20.073C16.3351 20.4106 15.8773 20.6002 15.3999 20.6002C14.9225 20.6002 14.4647 20.4106 14.1271 20.073C13.7895 19.7354 13.5999 19.2776 13.5999 18.8002C13.5999 18.3228 13.7895 17.865 14.1271 17.5274C14.4647 17.1898 14.9225 17.0002 15.3999 17.0002C15.8773 17.0002 16.3351 17.1898 16.6727 17.5274C17.0103 17.865 17.1999 18.3228 17.1999 18.8002ZM5.7999 20.6002C6.27729 20.6002 6.73513 20.4106 7.0727 20.073C7.41026 19.7354 7.5999 19.2776 7.5999 18.8002C7.5999 18.3228 7.41026 17.865 7.0727 17.5274C6.73513 17.1898 6.27729 17.0002 5.7999 17.0002C5.32251 17.0002 4.86468 17.1898 4.52711 17.5274C4.18954 17.865 3.9999 18.3228 3.9999 18.8002C3.9999 19.2776 4.18954 19.7354 4.52711 20.073C4.86468 20.4106 5.32251 20.6002 5.7999 20.6002Z"
                  fill="#059669"
                />
              </svg>
            </div>
            <p className="font-normal text-p1">Total Pesanan</p>
            <p className="font-semibold text-h6">
              {props.data ? props.data : "-"}
            </p>
          </div>
        </>
      );

    case "sisaproduk":
      return (
        <>
          <div className="p-8 max-w-[337px] h-[200px] rounded-xl border-[1px] border-gray-300 grid grid-rows-3 grid-flow-col gap-4">
            <div className="flex justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#059669"
                viewBox="0 0 24 24"
                stroke="#059669"
                class="w-6 h-6"
              >
                <path
                  fill="#059669"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                />
              </svg>
            </div>
            <p className="font-normal text-p1">Sisa Produk</p>
            <p className="font-semibold text-h6">
              {props.data ? props.data : "-"}
            </p>
          </div>
        </>
      );

    case "terjual":
      return (
        <>
          <div className="p-8 max-w-[337px] h-[200px] rounded-xl border-[1px] border-gray-300 grid grid-rows-3 grid-flow-col gap-4">
            <div className="flex justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#059669"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#059669"
                class="w-6 h-6"
              >
                <path
                  fill="#059669"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                />
              </svg>
            </div>
            <p className="font-normal text-p1">Produk Terjual</p>
            <p className="font-semibold text-h6">
              {props.data ? props.data : "-"}
            </p>
          </div>
        </>
      );
  }
};

export default Widget;
