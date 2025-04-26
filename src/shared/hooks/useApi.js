// src/shared/hooks/useApi.js
import {useState} from 'react';
import axiosInstance from '@/shared/api/axiosInstance';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const callApi = async ({url, method = 'GET', body}) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await axiosInstance({
        url,
        method,
        data: body,
        withCredentials: true,
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {loading, error, data, callApi};
};

export default useApi;
