import {
  BookmarkIcon,
  ChevronLeftIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import "moment/locale/id";

import InformationNotFound from "../../../../components/InformationNotFound";
import { useGetData } from "../../../../hooks/FetchData";
import ErrorPage from "../../../../components/ErrorPage";
import { useEffect, useState } from "react";

export default function DetailInformasi() {
  let { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [backLocation, setBackLocation] = useState("/admin/informasi");

  const swrKey = `admin/informations/${userId}`;
  useEffect(() => {
    if (location.state) {
      setBackLocation(
        `/admin/informasi/?filter=${location.state.filter}&page=${location.state.page}&search=${location.state.search}`
      );
    }
  }, []);

  const { data, isLoading, error } = useGetData(swrKey);
  if (error) return <ErrorPage />;

  return (
    <div>
      {/* back button */}
      <div className="flex flex-row row-gap items-center gap-6 ml-4 sm:ml-[44px] mt-8">
        <button id="btn_back_informasi" onClick={() => navigate(backLocation)}>
          <ChevronLeftIcon className="w-5 h-5 text-green-500" />
        </button>
        <h6 className="text-h6 font-medium">Detail Informasi</h6>
      </div>

      {/* blog content */}
      {isLoading ? (
        <div className="mx-auto h-screen flex items-center">
          <img
            className="h-16 w-16 mx-auto"
            src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
            alt=""
          />
        </div>
      ) : (
        <div>
          {data.Information && data.Status == 200 ? (
            <div className="sm:ml-[44px] sm:mr-8 mx-4">
              <h5 className="text-h5 font-bold mt-12 mb-4">
                {data.Information.Title}
              </h5>

              <div className="text-p3 text-gray-500">
                by EcoWave &nbsp; | &nbsp;{" "}
                {moment(data.Information.Date)
                  .locale("id")
                  .format("D MMMM YYYY")}
              </div>

              <div className="flex flex-row gap-8 py-[19px] my-8 border-gray-300 border-y pl-5">
                <div className="flex flex-row gap-[9px] items-center ">
                  <BookmarkIcon className="w-[14px] h-[18px] text-gray-500" />
                  <p className="text-p3 text-gray-500">
                    {data.Information.BookmarkCount}
                  </p>
                </div>
                <div className="flex flex-row gap-[9px] items-center ">
                  <EyeIcon className="w-[14px] h-[18px] text-gray-500" />
                  <p className="text-p3 text-gray-500">
                    {data.Information.ViewCount}
                  </p>
                </div>
              </div>

              <div className=" mx-auto flex justify-center items-center">
                <div className="w-[640px] h-[420px] ">
                  <LazyLoadImage
                    alt="gambar"
                    className="object-cover w-[640px] h-[420px] "
                    src={data.Information.PhotoContentUrl}
                    effect="blur"
                  />
                </div>
              </div>

              <div
                className="my-list my-8"
                dangerouslySetInnerHTML={{
                  __html: data.Information.Content,
                }}
              />
            </div>
          ) : (
            <InformationNotFound message={data.Message} />
          )}
        </div>
      )}
    </div>
  );
}
