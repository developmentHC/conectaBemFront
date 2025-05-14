import axios from "axios";

const api = axios.create({
  baseURL: "https://conecta-bem-back.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
