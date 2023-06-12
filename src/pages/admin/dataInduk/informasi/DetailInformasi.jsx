import {
    BookmarkIcon,
    ChevronLeftIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import "moment/locale/id";

import useCrud from "../../../../hooks/FetchInformasi";
import InformationNotFound from "../../../../components/InformationNotFound";

export default function DetailInformasi() {
    let { userId } = useParams();

    const swrKey = `admin/informations/${userId}`;

    const { data, isLoading, error } = useCrud(swrKey);
    if (error) return <div>error</div>;
    if (isLoading) return <div>loading</div>;
    console.log(data);

    return (
        <div>
            {/* back button */}
            <div className="flex flex-row row-gap items-center gap-6 ml-4 sm:ml-[44px] mt-8">
                <Link to="/admin/informasi/">
                    <ChevronLeftIcon className="w-5 h-5 text-green-500" />
                </Link>
                <h6 className="text-h6 font-medium">Detail Informasi</h6>
            </div>

            {/* blog content */}
            <div>
                {data.Status == 200 ? (
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

                        <div className=" max-w-[640px] mx-auto ">
                            <LazyLoadImage
                                alt="gambar"
                                className=" object-cover max-h-[420px] w-full"
                                src={data.Information.PhotoContentUrl}
                                effect="blur"
                            />
                            {/* <img
                                className=" object-cover max-h-[420px] w-full"
                                src={data.Information.PhotoContentUrl}
                                alt="Gambar Unsplash"
                            /> */}
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
        </div>
    );
}
