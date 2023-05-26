import logo from "../assets/LandingImg/logo.png";
import hero from "../assets/LandingImg/Rectangle 24.png";
import google from "../assets/LandingImg/google_play.png";
import store from "../assets/LandingImg/store.png";
import diskon from "../assets/LandingImg/diskon.png";
import info from "../assets/LandingImg/info.png";
import poin from "../assets/LandingImg/poin.png";
import prototype from "../assets/LandingImg/prototype.png";

function LandingPage() {
    const currentYear = new Date().getFullYear();

    return (
        <div>
            {/* navbar section*/}
            <div className="flex justify-between items-center sticky sm:px-12 px-5 sm:h-20 h-14 shadow-1 top-0 bg-white">
                <img src={logo} className="h-8 sm:h-14" />
                <div className="flex sm:space-x-14 space-x-4 items-center">
                    <a
                        href="#beranda"
                        className="sm:text-p1 text-p3 cursor-pointer"
                    >
                        Beranda
                    </a>
                    <a
                        href="#fitur"
                        className="sm:text-p1 text-p3 cursor-pointer"
                    >
                        Fitur Kami
                    </a>
                    <a
                        href="#faq"
                        className="sm:text-p1 text-p3 cursor-pointer"
                    >
                        FAQ
                    </a>
                </div>
            </div>

            {/* hero section */}
            <div
                id="beranda"
                className="flex flex-col-reverse  md:flex-row sm:justify-between text-center items-center "
            >
                {/* left hero  */}
                <div className="flex flex-1 flex-col text-center  space-y-5 sm:px-12 sm:text-left py-12 px-3">
                    <h3 className="sm:text-h3 text-h4 font-semibold">
                        EcoWave. Lebih{" "}
                        <span className="text-green-500">Hijau</span>, Lebih
                        Baik!
                    </h3>
                    <p className="sm:text-h6 text-p1 text-gray-600">
                        Belanja produk ramah lingkungan dan dapatkan informasi
                        terkini tentang lingkungan. Mari beraksi untuk bumi
                        bersama EcoWave!
                    </p>

                    <a
                        to="#"
                        className="flex sm:mx-0 mx-auto  mt-10 text-left cursor-pointer px-4 py-3 sm:w-48 space-x-4 items-center shadow-1 bg-black rounded-lg "
                    >
                        <img src={google} className="h-10 w-10" />
                        <div className="flex-row text-white">
                            <p className="text-p3">GET IT ON</p>
                            <p className="text-p1 font-bold">Play Store</p>
                        </div>
                    </a>
                </div>
                {/* right hero */}
                <div className="w-full flex-1 flex">
                    <img
                        src={hero}
                        className="object-cover flex-shrink-0 h-full"
                    />
                </div>
            </div>

            {/* fitur section */}
            <div
                id="fitur"
                className="sm:py-24 py-12 bg-green-500 text-white items-center text-center"
            >
                <div className="max-w-7xl mx-auto">
                    <h2 className="sm:px-24 px-5 sm:text-h4 text-h5 font-bold ">
                        Kami EcoWave, Siap Memenuhi Kebutuhan Hijau Kamu
                    </h2>
                    <p className=" px-5 sm:text-p2 text-p3 sm:px-24 mt-5 max-w-4xl mx-auto">
                        Dapatkan beragam produk ramah lingkungan berkualitas,
                        informasi lingkungan terkini, dan kumpulkan poin yang
                        bisa ditukar barang hanya di EcoWave!
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 xl:mx-[110px] items-stretch place-items-center mx-5 mt-8">
                        <div className="bg-white shadow-1 rounded-lg md:max-w-[241px]  text-black  sm:p-5 p-3 ">
                            <img
                                src={store}
                                className="sm:w-24 sm:h-24 w-12 h-12 mx-auto "
                            />
                            <p className="sm:text-h6 text-p2 font-bold mt-5 pb-3">
                                EcoShop
                            </p>
                            <p className="sm:text-p4 text-p5 px-2">
                                Dapatkan barang ramah lingkungan berkualitas dan
                                terjangkau di EcoShop!
                            </p>
                        </div>
                        <div className="bg-white shadow-1 rounded-lg md:max-w-[241px] text-black  sm:p-5 p-3 ">
                            <img
                                src={info}
                                className="sm:w-24 sm:h-24 w-12 h-12 mx-auto"
                            />
                            <p className="sm:text-h6 text-p2 font-bold mt-5 pb-3">
                                EcoInfo
                            </p>
                            <p className="sm:text-p4 text-p5 px-2">
                                EcoInfo, sumber kabar lingkungan Indonesia kamu
                                yang terkini!
                            </p>
                        </div>
                        <div className="bg-white shadow-1 rounded-lg md:max-w-[241px] text-black  sm:p-5 p-3 ">
                            <img
                                src={poin}
                                className="sm:w-24 sm:h-24 w-12 h-12 mx-auto"
                            />
                            <p className="sm:text-h6 text-p2 font-bold mt-5 pb-3">
                                Poin
                            </p>
                            <p className="sm:text-p4 text-p5 px-2">
                                Tukar Poin dan miliki barang EcoShop. Banyak
                                Poin, Banyak untung!
                            </p>
                        </div>
                        <div className="bg-white shadow-1 rounded-lg md:max-w-[241px] text-black  sm:p-5 p-3 ">
                            <img
                                src={diskon}
                                className="sm:w-24 sm:h-24 w-12 h-12 mx-auto"
                            />
                            <p className="sm:text-h6 text-p2 font-bold mt-5 pb-3">
                                Diskon
                            </p>
                            <p className="sm:text-p4 text-p5 px-2">
                                Nikmati diskon gede-gedean hingga 50% di
                                EcoShop!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* faq section */}
            <div id="faq" className="md:py-24 py-12 px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">
                        <h4 className="text-h4 text-black font-bold">
                            Frequently Asked{" "}
                            <span className="text-green-500">Questions</span>
                        </h4>
                        <p className="text-p2 text-gray-600 max-w-3xl mx-auto mt-5 ">
                            Ada pertanyaan yang sering muncul di benak kamu
                            tentang EcoWave? Kita punya jawabannya di sini, loh!
                            Mari kita bahas satu per satu!
                        </p>
                    </div>

                    <div
                        id="accordion-flush"
                        data-accordion="collapse"
                        data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        data-inactive-classes="text-gray-500 dark:text-gray-400"
                    >
                        {/* 1 */}
                        <h2 id="accordion-flush-heading-1">
                            <button
                                type="button"
                                className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                                data-accordion-target="#accordion-flush-body-1"
                                aria-expanded="false"
                                aria-controls="accordion-flush-body-1"
                            >
                                <span>EcoWave itu apa sih?</span>
                                <svg
                                    data-accordion-icon=""
                                    className="w-6 h-6 shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </h2>
                        <div
                            id="accordion-flush-body-1"
                            className="hidden"
                            aria-labelledby="accordion-flush-heading-1"
                        >
                            <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    EcoWave itu aplikasi yang memudahkanmu
                                    berbelanja produk ramah lingkungan. Di sini
                                    kamu juga bisa update informasi seputar
                                    lingkungan Indonesia lho!
                                </p>
                            </div>
                        </div>

                        {/* 2 */}
                        <h2 id="accordion-flush-heading-2">
                            <button
                                type="button"
                                className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                                data-accordion-target="#accordion-flush-body-2"
                                aria-expanded="false"
                                aria-controls="accordion-flush-body-2"
                            >
                                <span>
                                    Siapa aja sih yang bisa pakai EcoWave?
                                </span>
                                <svg
                                    data-accordion-icon=""
                                    className="w-6 h-6 shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </h2>
                        <div
                            id="accordion-flush-body-2"
                            className="hidden"
                            aria-labelledby="accordion-flush-heading-2"
                        >
                            <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    Siapa aja, dong! Kami di sini ingin mengajak
                                    kamu untuk peduli terhadap bumi kita dan
                                    ingin gaya hidupmu lebih ramah lingkungan,
                                    yuk gabung di EcoWave!
                                </p>
                            </div>
                        </div>

                        {/* 3 */}
                        <h2 id="accordion-flush-heading-3">
                            <button
                                type="button"
                                className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                                data-accordion-target="#accordion-flush-body-3"
                                aria-expanded="false"
                                aria-controls="accordion-flush-body-3"
                            >
                                <span>Gimana cara belanja di EcoWave?</span>
                                <svg
                                    data-accordion-icon=""
                                    className="w-6 h-6 shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </h2>
                        <div
                            id="accordion-flush-body-3"
                            className="hidden"
                            aria-labelledby="accordion-flush-heading-3"
                        >
                            <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    Gampang banget! Tinggal download
                                    aplikasinya, daftar, dan kamu sudah bisa
                                    belanja produk ramah lingkungan favoritmu.
                                </p>
                            </div>
                        </div>

                        {/* 4 */}
                        <h2 id="accordion-flush-heading-4">
                            <button
                                type="button"
                                className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                                data-accordion-target="#accordion-flush-body-4"
                                aria-expanded="false"
                                aria-controls="accordion-flush-body-4"
                            >
                                <span>Produk di EcoWave mahal nggak ya?</span>
                                <svg
                                    data-accordion-icon=""
                                    className="w-6 h-6 shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </h2>
                        <div
                            id="accordion-flush-body-4"
                            className="hidden"
                            aria-labelledby="accordion-flush-heading-4"
                        >
                            <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    Tenang aja! Harga produk di EcoWave
                                    terjangkau kok, dan kamu juga bisa
                                    manfaatkan diskon yang sering kita kasih.
                                </p>
                            </div>
                        </div>

                        {/* 5 */}
                        <h2 id="accordion-flush-heading-5">
                            <button
                                type="button"
                                className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                                data-accordion-target="#accordion-flush-body-5"
                                aria-expanded="false"
                                aria-controls="accordion-flush-body-5"
                            >
                                <span>
                                    Informasi lingkungan di EcoWave dapat
                                    dipercaya?
                                </span>
                                <svg
                                    data-accordion-icon=""
                                    className="w-6 h-6 shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </h2>
                        <div
                            id="accordion-flush-body-5"
                            className="hidden"
                            aria-labelledby="accordion-flush-heading-5"
                        >
                            <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    Tentu saja! Kami selalu berusaha
                                    memberikanmu informasi terupdate dan
                                    terpercaya tentang lingkungan di Indonesia.
                                    Jadi kamu nggak perlu khawatir!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* footer section */}
            <div id="footer" className="">
                <div className=" bg-green-50 py-12 md:py-24 ">
                    <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row gap-x-16 gap-y-12 items-center px-5 sm:px-12">
                        <div className="md:flex-1 flex items-left flex-col">
                            <h4 className="sm:text-h4 text-h5 font-bold ">
                                Unduh EcoWave Sekarang!
                            </h4>
                            <p className="sm:text-h6 text-p1 text-gray-500 mt-8 mb-8 sm:mb-16">
                                Yuk, mulai petualangan ramah lingkungan kamu!
                                EcoWave menunggu, lho!
                            </p>

                            <a
                                to="#"
                                className="flex sm:mx-0 self-start  text-left cursor-pointer px-4 py-3 sm:w-48 space-x-4 items-center shadow-1 bg-black rounded-lg "
                            >
                                <img src={google} className="h-10 w-10" />
                                <div className="flex-row text-white">
                                    <p className="text-p3">GET IT ON</p>
                                    <p className="text-p1 font-bold">
                                        Play Store
                                    </p>
                                </div>
                            </a>
                        </div>
                        <div className="flex-1">
                            <img src={prototype} alt="" className="" />
                        </div>
                    </div>
                </div>
                <div className="bg-white text-center py-7 md:py-[44px]">
                    <h6 className="text-h6 text-gray-500 font-semibold">
                        Since {currentYear} Ecowave
                    </h6>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
