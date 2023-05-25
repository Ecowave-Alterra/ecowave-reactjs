import logo from '../assets/LandingImg/logo.png';
import hero from '../assets/LandingImg/Rectangle 24.png';
import google from '../assets/LandingImg/google_play.png';
import store from '../assets/LandingImg/store.png';
import diskon from '../assets/LandingImg/diskon.png';
import info from '../assets/LandingImg/info.png';
import poin from '../assets/LandingImg/poin.png';

function LandingPage() {
  return (
    <div>
      <div className="flex justify-between items-center fixed w-screen sm:px-12 px-3 sm:h-20 h-14 shadow-1 top-0 bg-white">
        <img src={logo} className="h-8 sm:h-14" />
        <div className="flex sm:space-x-14 space-x-4 items-center">
          <a href="#beranda" className="sm:text-p1 text-p3 cursor-pointer">
            Beranda
          </a>
          <a href="#fitur" className="sm:text-p1 text-p3 cursor-pointer">
            Fitur Kami
          </a>
          <p className="sm:text-p1 text-p3 cursor-pointer">FAQ</p>
        </div>
      </div>

      <div
        id="beranda"
        className="sm:flex sm:justify-between text-center mt-20 items-center"
      >
        <div className="flex-row space-y-5 sm:px-12 sm:text-left">
          <h3 className="sm:text-h3 text-h4 font-semibold">
            EcoWave. Lebih <span className="text-green-500">Hijau</span>, Lebih
            Baik!
          </h3>
          <p className="sm:text-h6 text-p1 text-gray-600">
            Belanja produk ramah lingkungan dan dapatkan informasi terkini
            tentang lingkungan. Mari beraksi untuk bumi bersama EcoWave!
          </p>

          <div className="flex sm:mx-0 mx-24 mt-10 text-left cursor-pointer px-4 py-3 w-48 space-x-4 items-center shadow-1 bg-black rounded-lg ">
            <img src={google} className="h-10 w-10" />
            <div className="flex-row text-white">
              <p className="text-p3">GET IT ON</p>
              <p className="text-p1 font-bold">Play Sotre</p>
            </div>
          </div>
        </div>
        <img src={hero} className="sm:w-1/2 w-screen sm:mt-0 mt-8" />
      </div>
      <div
        id="fitur"
        className="flex-row space-y-7 sm:py-24 py-7 sm:px-24 px-5 bg-green-500 text-white items-center text-center"
      >
        <h2 className="sm:text-h4 text-h5 font-bold">
          Kami EcoWave, Siap Memenuhi Kebutuhan Hijau Kamu
        </h2>
        <p className="sm:text-p2 text-p3 sm:px-24">
          Dapatkan beragam produk ramah lingkungan berkualitas, informasi
          lingkungan terkini, dan kumpulkan poin yang bisa ditukar barang hanya
          di EcoWave!
        </p>
        <div className="sm:flex grid grid-cols-2 gap-4 sm:space-x-7 ">
          <div className="bg-white shadow-1 rounded-lg sm:w-1/4 text-black flex-col sm:p-5 p-3 sm:space-y-3 space-x-1">
            <img src={store} className="sm:w-24 sm:h-24 w-12 h-12 mx-12" />
            <p className="sm:text-h6 text-p2 font-bold">EcoShop</p>
            <p className="sm:text-p4 text-p5 px-2">
              Dapatkan barang ramah lingkungan berkualitas dan terjangkau di
              EcoShop!
            </p>
          </div>
          <div className="bg-white shadow-1 rounded-lg sm:w-1/4 text-black flex-col sm:p-5 p-3 sm:space-y-3 space-x-1">
            <img src={info} className="sm:w-24 sm:h-24 w-12 h-12 mx-12" />
            <p className="sm:text-h6 text-p2 font-bold">EcoInfo</p>
            <p className="sm:text-p4 text-p5 px-2">
              EcoInfo, sumber kabar lingkungan Indonesia kamu yang terkini!
            </p>
          </div>
          <div className="bg-white shadow-1 rounded-lg sm:w-1/4 text-black flex-col sm:p-5 p-3 sm:space-y-3 space-x-1">
            <img src={poin} className="sm:w-24 sm:h-24 w-12 h-12 mx-12" />
            <p className="sm:text-h6 text-p2 font-bold">Poin</p>
            <p className="sm:text-p4 text-p5 px-2">
              Tukar Poin dan miliki barang EcoShop. Banyak Poin, Banyak untung!
            </p>
          </div>
          <div className="bg-white shadow-1 rounded-lg sm:w-1/4 text-black flex-col sm:p-5 p-3 sm:space-y-3 space-x-1">
            <img src={diskon} className="md:w-24 md:h-24 w-12 h-12 mx-12" />
            <p className="md:text-h6 text-p2 font-bold">Diskon</p>
            <p className="md:text-p4 text-p5 px-2">
              Nikmati diskon gede-gedean hingga 50% di EcoShop!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
