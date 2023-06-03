import { useState, useEffect } from 'react';

export default function ModalAdd({ closeModal }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleTambahClick = () => {
    console.log(selectedOption);
    closeModal();
  };

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const closeModalWithTransition = () => {
    setIsModalOpen(false);
    setTimeout(() => closeModal(), 300);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity ${
        isModalOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white h-[12rem] w-80 rounded-[30px] shadow-lg transform transition-transform ${
          isModalOpen ? 'scale-100' : 'scale-90'
        }`}
      >
        <div className="border-b border-b-gray-400 h-12">
          <h2 className="text-p2 pt-4 px-5 text-gray-400 font-medium mb-4">
            Tambah Opsi Pengiriman
          </h2>
        </div>
        <div className="flex items-center mb-2 p-4">
          <select
            id="opsi"
            className="border border-green-500 w-screen h-12 rounded-[15px] px-2 py-1"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">Pilih Opsi Pengiriman</option>
            <option value="JNE">JNE</option>
            <option value="TIKI">TIKI</option>
            <option value="Pos Indonesia">Pos Indonesia</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="text-green-500 font-semibold hover:bg-gray-50 px-4 py-2 rounded-full"
            onClick={closeModalWithTransition}
          >
            Batal
          </button>
          <button
            className="bg-green-500  font-semibold hover:bg-green-600 text-white px-4 py-2 rounded-full mr-2"
            onClick={handleTambahClick}
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}
