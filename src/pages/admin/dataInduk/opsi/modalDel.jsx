import { useEffect, useState } from 'react';

const ModalDel = ({ isOpen, onCancel, onConfirm }) => {
  const [modalVisible, setModalVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setModalVisible(true);
    } else {
      setTimeout(() => setModalVisible(false), 300);
    }
  }, [isOpen]);

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => onCancel(), 300);
  };

  if (!modalVisible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white h-52 w-80 rounded-lg shadow-lg p-4 transform transition-transform ${
          isOpen ? 'scale-100' : 'scale-90'
        }`}
      >
        <h2 className="text-h6 font-semibold mb-2">
          Hapus Opsi Pengiriman yang dipilih?
        </h2>
        <div className="flex items-center justify-center">
          <p className="text-p3">
            Opsi Pengiriman dengan nama
            <span className="font-semibold">“JNE”</span> akan dihapus
          </p>
        </div>
        <div className="flex justify-between gap-3 py-2 mt-4">
          <button
            className="font-semibold border w-1/2 hover:bg-gray-50 py-2 rounded-full"
            onClick={closeModal}
          >
            Batal
          </button>
          <button
            className="bg-error-400 border w-1/2 text-white font-semibold hover:bg-error-500 px-4 py-2 rounded-full"
            onClick={onConfirm}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDel;
