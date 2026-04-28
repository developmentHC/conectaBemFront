import type { RequestConfig, ResponseErrorConfig } from "@kubb/plugin-client/clients/axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

export const kubbClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://conecta-bem-back.vercel.app/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

kubbClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// Export default no formato que o Kubb espera
export default async function customFetch<TData, _TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>,
): Promise<AxiosResponse<TData>> {
  return kubbClient.request<TData>({
    ...config,
  } as AxiosRequestConfig);
}

// Tipo Client que o Kubb espera
export type Client = typeof customFetch;
export type { RequestConfig, ResponseErrorConfig };