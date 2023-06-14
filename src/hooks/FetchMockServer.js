import Cookies from "js-cookie";
import useSWR from "swr";

const baseUrl = "https://3ae2497a-d357-4070-aab1-0a90e9aa61fb.mock.pstmn.io";

async function fetchMock(url) {
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
    const { data, error, isLoading } = useSWR(url, fetchMock);

    return {
        data,
        error,
        isLoading,
    };
}
