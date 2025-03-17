import * as prismic from '@prismicio/client';

export const createClient = (config = {}) => {
  const endpoint = prismic.getRepositoryEndpoint("conectabem"); // Gera o endpoint correto
  const client = prismic.createClient(endpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  });

  return client;
};