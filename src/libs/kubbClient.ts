
import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export const kubbClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://conecta-bem-back.vercel.app/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para injetar o token em todas as requests
kubbClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('next-auth.session-token='))
      ?.split('=')[1]

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Export default no formato que o Kubb espera
export default async function customFetch<TData, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>
): Promise<AxiosResponse<TData>> {
  return kubbClient.request<TData>({
    ...config,
  } as AxiosRequestConfig)
}

// Tipo Client que o Kubb espera
export type Client = typeof customFetch
export type { RequestConfig, ResponseErrorConfig }
