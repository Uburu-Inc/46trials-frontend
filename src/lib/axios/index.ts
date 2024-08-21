import Axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLogout } from "@/app/hooks/logout";
import { ApiResponse, UseAxiosResponse, AxiosFuncParams } from "./type";

export function useNetworkRequest({
  hideErrorAlert,
}: AxiosFuncParams): UseAxiosResponse {
  const { logout } = useLogout();
  const [loading, setLoading] = useState<boolean>(false);

  let token = "";
  if (typeof window !== "undefined") {
    const storedToken = window.sessionStorage.getItem("app_info");
    if (storedToken) token = JSON.parse(storedToken).token;
  }

  const axios = Axios.create({
    baseURL: "https://prod-backend.uburu.ai/api/v1",
  });

  axios.interceptors.request.use((config) => {
    setLoading(true);
    if (token) {
      const headers = config.headers ?? ({} as AxiosRequestHeaders);
      headers.Authorization = `Token ${token}`;
      headers["Cache-Control-Enabled"] = "false";
      config.headers = headers;
    }
    return config;
  });

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      setLoading(false);
      return response.data;
    },
    (error: AxiosError<ApiResponse>) => {
      setLoading(false);
      if (!error.response) {
        toast.error("Connection error");
        throw error;
      }

      const response = error.response;

      if (!hideErrorAlert) {
        if (response.status >= 500) {
          toast.error("An unknown server error occurred");
        } else if (response.status === 404) {
          toast.error("Resource not found");
        } else if (response.status === 401 && token) {
          toast.error("Unauthorized");
          logout();
        } else {
          if (!token && response.status === 401) {
            toast.error(response.data.error.detail);
            return;
          }
          toast.error(response.data.message);
        }
      }

      throw error;
    }
  );

  return { axios, loading };
}
