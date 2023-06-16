import Cookies from "js-cookie";
import { useState } from "react";
import useSWR from "swr";

const baseUrl = import.meta.env.VITE_API_URL;

//mengambil semua data
async function fetchData(url) {
    const token = Cookies.get("token");
    const response = await fetch(`${baseUrl}${url}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
}

export function useGetAllCategory(url) {
    const { data, error, isLoading } = useSWR(url, fetchData);

    return {
        data,
        error,
        isLoading,
    };
}

//membuat kategori baru
export const usePostKategori = (url) => {
    const [isLoading, setIsLoading] = useState(false);

    const postData = async (data) => {
        setIsLoading(true);

        try {
            const token = Cookies.get("token");
            const response = await fetch(`${baseUrl}${url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
            return error.response;
        } finally {
            setIsLoading(false);
        }
    };

    return { postData, isLoading };
};

//mengedit kategori berdasarkan id
export const usePutKategori = (url) => {
    const [isLoading, setIsLoading] = useState(false);

    const putData = async (data, id) => {
        setIsLoading(true);

        try {
            const token = Cookies.get("token");
            const response = await fetch(`${baseUrl}${url}${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
            return error.response;
        } finally {
            setIsLoading(false);
        }
    };

    return { putData, isLoading };
};

//menghapus kategori berdasarkan id
export const useDeleteKategori = (url) => {
    const [isLoading, setIsLoading] = useState(false);

    const deleteData = async (id) => {
        setIsLoading(true);

        try {
            const token = Cookies.get("token");
            const response = await fetch(`${baseUrl}${url}${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
            return error.response;
        } finally {
            setIsLoading(false);
        }
    };

    return { deleteData, isLoading };
};
