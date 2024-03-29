import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ChevronLeftIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import { useDropzone } from 'react-dropzone';
import 'react-quill/dist/quill.snow.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import InformationNotFound from '../../../../components/InformationNotFound';
import {
  useGetData,
  usePutDataUsingFormData,
} from '../../../../hooks/FetchData';
import Alert from '../../../../components/Alert';
import ErrorPage from '../../../../components/ErrorPage';
import ModalConfirm from '../../../../components/ModalConfirm';

export default function UbahInformasi() {
  const InputImageRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [imageRef, setImageRef] = useState(null);
  let { userId } = useParams();
  const [backLocation, setBackLocation] = useState('/admin/informasi');
  const [backModal, setBackModal] = useState(false);
  const [addModal, setAddModal] = useState(null);
  //alert fetching data
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');

  const { putData, isLoading: loading } =
    usePutDataUsingFormData(`admin/informations/`);

  const swrKey = `admin/informations/${userId}`;
  useEffect(() => {
    if (location.state) {
      setBackLocation(
        `/admin/informasi/?filter=${location.state.filter}&page=${location.state.page}&search=${location.state.search}`
      );
    }
  }, []);

  const openAddModal = (values) => {
    setAddModal(values);
  };
  const closeAddModal = () => {
    setAddModal(null);
  };

  const formik = useFormik({
    // validateOnChange: true,
    initialValues: {
      image: '',
      judul: '',
      konten: '',
    },
    validationSchema: Yup.object({
      image: Yup.mixed().required('Gambar harus diunggah'),
      judul: Yup.string()
        .max(65, 'Mohon maaf, entri Anda melebihi batas maksimum 65 karakter')
        .required('Field harus diisi'),
      konten: Yup.string()
        .required('Field harus diisi')
        .test('br-check', 'Field harus diisi', (value) => {
          const strippedHTML = value.replace(/<\/?[^>]+(>|$)/g, ''); // Menghapus semua tag HTML dari konten
          return strippedHTML.trim().length > 0; // Validasi konten setelah menghapus tag HTML
        }),
    }),
    onSubmit: async (values) => {
      if (
        formik.values.image == data.Information.PhotoContentUrl &&
        formik.values.judul == data.Information.Title &&
        formik.values.konten == data.Information.Content &&
        data.Information.Status == 'Terbit'
      ) {
        openAlert(
          'danger',
          'Tidak ada perubahan yang terjadi untuk diterbitkan'
        );
      } else {
        openAddModal(values);
      }
    },
  });
  const handleConfirmAdd = async (values) => {
    const formData = new FormData();
    formData.append('Title', values.judul);
    formData.append('Content', values.konten);
    formData.append('Status', 'Terbit');
    formData.append('PhotoContentUrl', values.image);
    const response = await putData(formData, userId);
    if (response.Status === 200) {
      closeAddModal();
      openAlert('success', response.Message);

      setTimeout(function () {
        navigate(backLocation);
      }, 2000);
    } else {
      openAlert('danger', response.Message);
    }
  };

  //submit sebagai draft
  const handleSaveDraft = async () => {
    if (
      formik.values.image == data.Information.PhotoContentUrl &&
      formik.values.judul == data.Information.Title &&
      formik.values.konten == data.Information.Content &&
      data.Information.Status == 'Draft'
    ) {
      openAlert(
        'danger',
        'Tidak ada perubahan yang terjadi untuk Disimpan sebagai draft'
      );
    } else {
      const formData = new FormData();
      formData.append('Title', formik.values.judul);
      formData.append('Content', formik.values.konten);
      formData.append('Status', 'Draft');
      formData.append('PhotoContentUrl', formik.values.image);
      const response = await putData(formData, userId);
      if (response.Status === 200) {
        openAlert('success', response.Message);

        setTimeout(function () {
          navigate(backLocation);
        }, 2000);
      } else {
        openAlert('danger', response.Message);
      }
    }
  };

  const openBackModal = () => {
    setBackModal(true);
  };
  const closeBackModal = () => {
    setBackModal(false);
  };

  //validasi form input tidak kosong saat ingin kembali ke halaman sebelumnya
  const backToMain = () => {
    // console.log(formik.values.konten == data.Information.Content);
    // console.log(formik.values.konten);
    // console.log(data.Information.Content);
    if (data.Status !== 404) {
      if (
        formik.values.image == data.Information.PhotoContentUrl &&
        formik.values.judul == data.Information.Title &&
        formik.values.konten == data.Information.Content
        // ||formik.values.konten == "<p><br></p>"
      ) {
        navigate(backLocation);
      } else {
        openBackModal();
      }
    } else {
      navigate(backLocation);
    }
  };
  const handleConfirmBack = () => {
    navigate(backLocation);
  };
  // o

  // open function untuk handle input image

  //tambah gambar dengan drag&drop
  const onDrop = useCallback((acceptedFiles) => {
    formik.setFieldValue('image', acceptedFiles[0]);
    const imgInitial = acceptedFiles[0];
    if (imgInitial !== undefined) {
      showImages(imgInitial);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.png', '.jpg'],
      'image/jpg': [],
      'image/png': [],
    },
    multiple: false,
    maxFiles: 1,
    onDropRejected: () => {
      alert('file tidak memenuhi standard yang diberikan');
    },
  });

  //tambah image melalui button
  const handleFileChange = (event) => {
    formik.setFieldValue('image', event.target.files[0]);
    const imgInitial = event.target.files[0];
    showImages(imgInitial);
  };

  //menampilkan preview gambar
  function showImages(image) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageRef(e.target.result);
    };
    reader.readAsDataURL(image);
  }

  const removeImage = () => {
    setImageRef(null);
    formik.setFieldValue('image', '');
  };
  // close function handle image

  const { data, isLoading, error } = useGetData(swrKey);

  //handling alert fetching data
  const openAlert = (variant, message) => {
    setIsAlert(true);
    setVariant(variant);
    setMessage(message);
    setTimeout(closeAlert, 2500);
  };
  const closeAlert = () => {
    setIsAlert(false);
    setVariant('');
    setMessage('');
  };

  useEffect(() => {
    if (data) {
      const dataInialisasi = {
        image: data.Information.PhotoContentUrl,
        judul: data.Information.Title,
        konten: data.Information.Content,
      };
      formik.setValues(dataInialisasi);
      setImageRef(data.Information.PhotoContentUrl);
    }
  }, [data]);
  if (error) return <ErrorPage />;

  return (
    <>
      <div>
        {/* alert fetch data */}
        {isAlert && (
          <Alert variant={variant} message={message} onClose={closeAlert} />
        )}
        <div className="flex flex-row row-gap items-center gap-6 ml-8 mt-8">
          <button id="button-back" onClick={backToMain}>
            <ChevronLeftIcon className="w-5 h-5 text-green-500" />
          </button>
          <h6 className="text-h6 font-medium">Ubah Informasi</h6>
        </div>
        {isLoading || loading ? (
          <div className="mx-auto h-screen flex items-center">
            <img
              className="h-16 w-16 mx-auto"
              src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
              alt=""
            />
          </div>
        ) : (
          <div>
            {data.Status == 200 ? (
              <form onSubmit={formik.handleSubmit} className="mt-5">
                <div className="mt-3 mx-4 sm:mx-8 mb-10">
                  <label className="text-p2" htmlFor="konten">
                    Konten Informasi
                  </label>
                  <div className="relative flex text-p2 max-w-2xl max-h-[312px] h-[312px] items-center mx-auto mt-2  rounded-3xl border border-gray-300  overflow-hidden">
                    {imageRef ? (
                      <div className="flex flex-row gap-5 absolute top-5 right-4 z-30 ">
                        <label
                          htmlFor="image"
                          className="group hover:bg-green-500 bg-green-50 w-14 h-14 flex justify-center items-center rounded-2xl shadow-2 cursor-pointer duration-200"
                        >
                          <PencilIcon className="w-[19px] h-[19px] text-green-600 group-hover:text-white" />
                          <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/jpeg, image/png"
                            multiple={false}
                            ref={InputImageRef}
                            onChange={handleFileChange}
                            hidden
                          />
                        </label>
                        <button
                          className="group hover:bg-error-500 bg-error-50 w-14 h-14 flex justify-center items-center rounded-2xl shadow-2"
                          onClick={removeImage}
                          id="button-remove-image"
                        >
                          <TrashIcon className="w-[19px] h-[19px] group-hover:text-error-50 text-error-500 " />
                        </button>
                      </div>
                    ) : (
                      <div
                        id="input-drop-image"
                        {...getRootProps({
                          className: 'dropzone',
                        })}
                        className="w-full h-full flex items-center justify-center cursor-pointer "
                      >
                        <div className="flex-wrap text-center w-full ">
                          <div className="mx-auto w-10 h-10 rounded-full bg-gray-50 flex justify-center items-center mb-3 text-center ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6 "
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                              />
                            </svg>
                          </div>
                          <div className="space-y-2 ">
                            <span
                              className="text-base text-green-500 font-semibold cursor-pointer"
                              htmlFor="image"
                            >
                              Klik untuk Mengunggah
                            </span>

                            <input
                              type="file"
                              id="image"
                              name="image"
                              accept="image/jpeg, image/png"
                              multiple={false}
                              // ref={InputImageRef}
                              // onChange={handleFileChange}
                              {...getInputProps()}
                              hidden
                            />
                            <span className="text-sm text-gray-500">
                              {' '}
                              atau seret dan lepas
                            </span>
                          </div>
                          <div className="space-y-2 ">
                            <span className="text-sm text-gray-500">
                              PNG, atau JPG (maks. 4mb & 1 file diizinkan)
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {imageRef && (
                      <img
                        src={imageRef}
                        className="object-cover max-h-[312px] w-full"
                        alt=""
                      />
                    )}
                  </div>
                  {formik.errors.image && formik.touched.image && (
                    <div className="text-error-500 text-p4 ml-12 text-center mt-1 ">
                      {formik.errors.image}
                    </div>
                  )}
                </div>

                {/* judul informasi */}
                <div className="relative h-10 mt-3 mx-4 sm:mx-8">
                  <input
                    id="judul"
                    maxLength="65"
                    className={
                      formik.errors.judul && formik.touched.judul
                      ? "peer h-full w-full rounded-[7px] border border-error-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-error-400 focus:border-t-transparent focus:outline-0 "
                      : "peer h-full w-full rounded-[7px] border border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
                    }
                    placeholder="Masukan Judul Informasi"
                    value={formik.values.judul}
                    onChange={formik.handleChange}
                  />
                  <label
                    className={
                      formik.errors.judul && formik.touched.judul
                      ? "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none font-normal text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-400 after:transition-all text-[11px] leading-tight peer-focus:text-error-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-400"
                      : "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none font-normal text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all text-[11px] leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400"
                    }
                  >
                    Judul Informasi
                  </label>
                </div>
                {formik.errors.judul && formik.touched.judul && (
                  <div className="text-error-500 text-p4 mt-1 ml-12 ">
                    {formik.errors.judul}
                  </div>
                )}

                {/* Konten Informasi */}
                <div className="mt-10 mx-4 sm:mx-8 flex flex-col gap-2">
                  <label className="text-p2" htmlFor="konten">
                    Konten Informasi
                  </label>

                  <ReactQuill
                    id="konten"
                    value={formik.values.konten}
                    className="h-80 "
                    theme="snow"
                    onChange={(value) => {
                      formik.setFieldValue('konten', value);
                    }}
                  />
                </div>
                {formik.errors.konten && formik.touched.konten && (
                  <div className="text-error-500 text-p4 ml-12 relative top-[45px]">
                    {formik.errors.konten}
                  </div>
                )}
                {/* submit button */}
                {isLoading ? (
                  ''
                ) : (
                  <>
                    {data.Information.Status == 'Terbit' ? (
                      <div className="flex flex-row gap-2 relative top-[72px] mx-8 justify-end pb-8">
                        <button
                          className="px-4 py-[10px] bg-green-50 text-green-500 font-semibold rounded-full disabled:text-green-300"
                          id="button-draft-submit"
                          type="button"
                          onClick={handleSaveDraft}
                          data-te-ripple-init=""
                          disabled={
                            Object.keys(formik.errors).length >= 3 ||
                            !formik.dirty
                          }
                        >
                          Pindahkan ke dalam draft
                        </button>
                        <button
                          className="px-4 py-[10px] bg-green-500 font-semibold text-white rounded-full  disabled:bg-green-300 duration-100 hover:bg-green-600 active:border-2 
                        active:border-green-300"
                          type="submit"
                          id="button-terbit-submit"
                          data-te-ripple-init=""
                          disabled={!(formik.isValid && formik.dirty)}
                        >
                          Simpan
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-row gap-2 relative top-[72px] mx-8 justify-end pb-8">
                        <button
                          className="px-4 py-[10px] bg-green-50 text-green-500 font-semibold rounded-full disabled:text-green-300"
                          id="button-draft-submit"
                          type="button"
                          onClick={handleSaveDraft}
                          data-te-ripple-init=""
                          disabled={
                            Object.keys(formik.errors).length >= 3 ||
                            !formik.dirty
                          }
                        >
                          Simpan sebagai draft
                        </button>
                        <button
                          className="px-4 py-[10px] bg-green-500 font-semibold text-white rounded-full  disabled:bg-green-300 duration-100 hover:bg-green-600 active:border-2 
                        active:border-green-300"
                          type="submit"
                          id="button-terbit-submit"
                          data-te-ripple-init=""
                          disabled={!(formik.isValid && formik.dirty)}
                        >
                          Terbitkan
                        </button>
                      </div>
                    )}
                  </>
                )}
              </form>
            ) : (
              <div className="flex items-center min-h-screen">
                <InformationNotFound message={data.Message} />
              </div>
            )}
          </div>
        )}
        {/* Modal Terbit */}
        {addModal && (
          <ModalConfirm
            title="Apakah informasi yang akan diterbitkan sudah benar?"
            description="Pastikan data yang anda terbitkan sudah benar. Anda bisa mengubah informasi kapan saja."
            labelCancel="Batal"
            labelConfirm="Terbit"
            variant="success"
            onCancel={closeAddModal}
            onConfirm={() => handleConfirmAdd(formik.values)}
          />
        )}
        {/* Modal Hapus */}
        {backModal && (
          <ModalConfirm
            title="Apakah Anda yakin ingin keluar tanpa menyimpan perubahan?"
            description="Perubahan yang belum disimpan akan dihapus otomatis oleh sistem."
            labelCancel="Batal"
            labelConfirm="Keluar"
            variant="danger"
            onCancel={closeBackModal}
            onConfirm={handleConfirmBack}
          />
        )}
      </div>
    </>
  );
}
