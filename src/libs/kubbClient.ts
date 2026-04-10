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

// Interceptor para injetar o token em todas as requests
kubbClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    // Em HTTPS o NextAuth prefixar o cookie com __Secure-
    const cookieName =
      window.location.protocol === "https:"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token";

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${cookieName}=`))
      ?.split("=")[1];

    if (token) {
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
