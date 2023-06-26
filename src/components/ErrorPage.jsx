import { ServerStackIcon } from "@heroicons/react/24/outline";

export default function ErrorPage() {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="text-center">
                <div className="rounded-full w-44 h-44 bg-red-200 mx-auto flex items-center">
                    <div className="rounded-full w-36 h-36 bg-red-300 mx-auto flex items-center">
                        <ServerStackIcon className="w-24 h-24 text-red-800 mx-auto my-auto" />
                    </div>
                </div>
                <h1 className="mt-5 tex-[36px] font-semibold text-gray-600 lg:text-[50px]">
                    500 - Server error
                </h1>
                <p className="text-gray-600 mt-5 lg:text-p1 ">
                    Oops something went wrong. Try to refresh this page or{" "}
                    <br /> feel free to contact us if the problem presists
                </p>
            </div>
        </div>
    );
}
