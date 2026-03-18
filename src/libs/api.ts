import axios from "axios";

const api = axios.create({
  baseURL: "https://conecta-bem-back.vercel.app/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
