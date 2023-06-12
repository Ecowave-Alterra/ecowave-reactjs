import Search from "../assets/img/Search.png";

export default function InformationNotFound({ message }) {
    return (
        <div className="w-full text-center p-24 flex flex-col items-center">
            <img src={Search} alt="" />
            <p className="text-p3 text-gray-500 font-semibold mt-5">
                Oops, Terjadi Kesalahan!!
            </p>
            <p className="text-p3 text-gray-500 font-semibold mt-2">
                {message}
            </p>
        </div>
    );
}
