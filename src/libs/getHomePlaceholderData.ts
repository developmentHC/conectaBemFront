import { createClient } from "@/libs/prismic";

export async function getHomePlaceholderData() {
  const client = createClient();

  async function fetchHomeData() {
    try {
      const menuResponse = await client.getAllByType("home");

      if (!menuResponse.length) {
        throw new Error("Nenhum dado encontrado para 'home'.");
      }

    } catch (error) {
      console.error("Erro ao buscar dados do Prismic:", error);
    }
  }

  return await fetchHomeData();
}
