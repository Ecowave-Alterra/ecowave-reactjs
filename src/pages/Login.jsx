import React, { useEffect, useState } from "react";
import Shopping from "../assets/img/Online shopping.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import getLoginData from "../fetch/Login";
import setAuthCookie, {
  getAuthCookieAdminEmail,
  getAuthCookieAdminName,
  getAuthCookie,
} from "../utils/cookies";
import Alert from "../components/Alert";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  //alert fetching data
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  const navigate = useNavigate();
  const { loginData, postDataLogin } = getLoginData();

  const handleShowPassword = (e) => {
    setShowPassword(!showPassword);
    e.preventDefault();
  };

  const openAlert = (variant, message) => {
    setIsAlert(true);
    setVariant(variant);
    setMessage(message);
    setTimeout(closeAlert, 2500);
  };
  const closeAlert = () => {
    setIsAlert(false);
    setVariant("");
    setMessage("");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email Kosong").email("Email Tidak Valid"),
      passWord: Yup.string().required("Password Kosong"),
    }),
    onSubmit: async (e) => {
      const datas = {
        email: e.email,
        password: e.passWord,
      };
      const response = await postDataLogin(datas);
      console.log(response);
      if (response.Status === 200) {
        setAuthCookie(
          loginData.get().Token,
          loginData.get().Email,
          loginData.get().Name
        );
        openAlert("success", response.Message);
        window.location.reload();
      } else {
        openAlert("danger", "Email atau password tidak valid. Mohon coba lagi");
      }
    },
  });

  return (
    <>
      <section className="gradient-form bg-neutral-200 dark:bg-neutral-700">
        <div className="container">
          <div className="g-6 flex flex-wrap items-center justify-center text-neutral-800">
            <div className="w-full">
              <div className="h-screen w-screen block rounded-lg bg-white shadow-lg">
                <div className="g-0 lg:flex lg:flex-wrap">
                  {/* Left column container*/}
                  <div className="bg-green-50 h-screen flex items-center rounded-b-lg lg:w-5/12 lg:rounded-r-lg lg:rounded-bl-none">
                    <div className="px-4 py-6 md:mx-6 md:p-12 bg-green-50">
                      <img src={Shopping} alt="belum ada source" />
                    </div>
                  </div>
                  {/* Right column container login form*/}
                  <div className="sm:px-10 sm:mt-40 md:px-10 md:mt-52 lg:w-7/12 lg:px-10 lg:mt-0 place-self-center w-full min-w-[300px]">
                    <div className="md:mx-16 md:p-12">
                      <p className="font-bold text-h4 text-green-500 mb-2">
                        Log in
                      </p>
                      <form onSubmit={formik.handleSubmit}>
                        <p className="mb-10 text-grey-500 text-p3">
                          Silakan masukkan nama pengguna dan kata sandi Anda
                          untuk melanjutkan
                        </p>
                        {/*email input*/}
                        <div
                          className="relative "
                          data-te-input-wrapper-init=""
                        >
                          <div className="relative h-10 mt-3">
                            <input
                              id="email"
                              className={
                                formik.errors.email && formik.touched.email
                                  ? "peer h-full w-full rounded-[7px] border border-error-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-error-400 focus:border-t-transparent focus:outline-0 "
                                  : "peer h-full w-full rounded-[7px] border border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
                              }
                              placeholder="Masukkan Alamat Email Anda"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                            />
                            <label
                              className={
                                formik.errors.email && formik.touched.email
                                  ? "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none font-normal text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-400 after:transition-all text-[11px] leading-tight peer-focus:text-error-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-400"
                                  : "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none font-normal text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all text-[11px] leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400"
                              }
                            >
                              Email
                            </label>
                          </div>
                        </div>
                        {formik.errors.email && formik.touched.email && (
                          <div className="text-error-500 text-p4 ms-3 mt-1">
                            {formik.errors.email}
                          </div>
                        )}
                        {/*Password input*/}
                        <div
                          className="relative mt-4 h-10"
                          data-te-input-wrapper-init=""
                        >
                          <div className="relative w-full">
                            <input
                              className={
                                formik.errors.passWord &&
                                formik.touched.passWord
                                  ? "peer h-full w-full rounded-[7px] border focus:ring-0 border-error-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-error-400 focus:border-t-transparent focus:outline-0 "
                                  : "peer h-full w-full rounded-[7px] border focus:ring-0 border-green-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-green-700 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 "
                              }
                              placeholder="Masukkan Password Anda"
                              type={showPassword ? "text" : "password"}
                              style={{
                                "&:focus": { outline: "0px !important" },
                              }}
                              id="passWord"
                              value={formik.values.passWord}
                              onChange={formik.handleChange}
                            />
                            <label
                              className={
                                formik.errors.passWord &&
                                formik.touched.passWord
                                  ? "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none font-normal text-error-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-error-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-error-400 after:transition-all text-[11px] leading-tight peer-focus:text-error-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-error-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-error-400"
                                  : "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none font-normal text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-400 after:transition-all text-[11px] leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400"
                              }
                            >
                              Password
                            </label>
                            <label
                              id="show_pass"
                              onClick={(e) => handleShowPassword(e)}
                              className="cursor-pointer absolute top-0 right-0 p-2.5 text-sm font-medium text-black border-transparent bg-transparent rounded-r-lg border"
                            >
                              {showPassword ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                  />
                                </svg>
                              )}
                            </label>
                          </div>
                        </div>
                        {formik.errors.passWord && formik.touched.passWord && (
                          <div className="text-error-500 text-p4 ms-3 mt-1">
                            {formik.errors.passWord}
                          </div>
                        )}

                        {/*Submit button*/}
                        <div className="mb-12 text-center mt-8">
                          <button
                            id="btn_login"
                            className="text-p3 mb-3 inline-block bg-green-500 w-full rounded-full py-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] disabled:bg-green-300"
                            type="submit"
                            data-te-ripple-init=""
                            disabled={!formik.dirty}
                          >
                            Log in
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Alert  */}
      {isAlert && (
        <Alert variant={variant} message={message} onClose={closeAlert} />
      )}
    </>
  );
}
