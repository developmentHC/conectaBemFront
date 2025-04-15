import * as prismic from "@prismicio/client";
import "dotenv/config";

export const createClient = (config = {}) => {
  const endpoint = prismic.getRepositoryEndpoint("conectabem"); // Gera o endpoint correto
  const client = prismic.createClient(endpoint, {
    accessToken: process.env.NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN,
    ...config,
  });

  return client;
};
