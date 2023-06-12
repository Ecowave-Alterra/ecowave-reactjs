import Cookies from "js-cookie";
import useSWR from "swr";

const baseUrl = import.meta.env.VITE_API_URL;

async function fetchData(url) {
    const token = Cookies.get("token");
    const response = await fetch(`${baseUrl}${url}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
}

export default function useCrud(url) {
    //getAllData
    const { data, error, isLoading } = useSWR(url, fetchData);

    return {
        data,
        error,
        isLoading,
    };
}
