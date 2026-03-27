import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://conecta-bem-back.vercel.app/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
