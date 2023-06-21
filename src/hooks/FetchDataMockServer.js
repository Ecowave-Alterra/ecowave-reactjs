import Cookies from 'js-cookie';
import { useState } from 'react';
import useSWR from 'swr';

// const baseUrl = import.meta.env.VITE_API_URL;
const baseUrl = 'https://47be6b1b-95d6-401f-a627-8d4a9f010eeb.mock.pstmn.io/';

//mengambil semua data atau berdasarkan id
async function fetchData(url) {
  const token = Cookies.get('token');
  const response = await fetch(`${baseUrl}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export function useGetData(url) {
  const { data, error, isLoading } = useSWR(url, fetchData);

  return {
    data,
    error,
    isLoading,
  };
}

//membuat data baru dengan input JSON
export const usePostDataUsingJson = (url) => {
  const [isLoading, setIsLoading] = useState(false);

  const postData = async (data) => {
    setIsLoading(true);

    try {
      const token = Cookies.get('token');
      const response = await fetch(`${baseUrl}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return error.response;
    } finally {
      setIsLoading(false);
    }
  };

  return { postData, isLoading };
};

//membuat data baru dengan input FormData
export const usePostDataUsingFormData = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const postData = async (data) => {
    setIsLoading(true);

    try {
      const token = Cookies.get('token');
      const response = await fetch(`${baseUrl}${url}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return error.response;
    } finally {
      setIsLoading(false);
    }
  };

  return { postData, isLoading };
};

//mengedit data berdasarkan id dengan input JSON
export const usePutDataUsingJson = (url) => {
  const [isLoading, setIsLoading] = useState(false);

  const putData = async (data, id) => {
    setIsLoading(true);

    try {
      const token = Cookies.get('token');
      const response = await fetch(`${baseUrl}${url}${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return error.response;
    } finally {
      setIsLoading(false);
    }
  };

  return { putData, isLoading };
};

//mengedit data berdasarkan id dengan input FormData
export const usePutDataUsingFormData = (url) => {
  const [isLoading, setIsLoading] = useState(false);

  const putData = async (data, id) => {
    setIsLoading(true);

    try {
      const token = Cookies.get('token');
      const response = await fetch(`${baseUrl}${url}${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return error.response;
    } finally {
      setIsLoading(false);
    }
  };

  return { putData, isLoading };
};

//menghapus data berdasarkan id
export const useDeleteData = (url) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteData = async (id) => {
    setIsLoading(true);

    try {
      const token = Cookies.get('token');
      const response = await fetch(`${baseUrl}${url}${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return error.response;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteData, isLoading };
};
