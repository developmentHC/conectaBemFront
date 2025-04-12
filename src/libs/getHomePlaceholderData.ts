import { createClient } from "@/libs/prismic";

export async function getHomePlaceholderData() {
    const client = createClient();

    async function fetchHomeData() {
        try {
            const menuResponse = await client.getAllByType("home");

            if (!menuResponse.length) {
            throw new Error("Nenhum dado encontrado para 'home'.");
            }

      const { h1_text, description, banner, especialidades_em_destaque } =
        menuResponse[0].data;

      const especialidadesIds = especialidades_em_destaque.map(
        (item) => item.lista_de_especialidades.id
      );

      const especialidadesDocs = await client.getByIDs(especialidadesIds, {
        lang: "pt-br",
      });

      const especialidades = especialidadesDocs.results.map((doc) => ({
        id: doc.id,
        nome: doc.data?.name || doc.slugs[0] || "Nome não disponível",
      }));

      console.log({
        titulo: h1_text,
        descricao: description,
        bannerUrl: banner?.url || "",
        especialidades,
      });
    } catch (error) {
      console.error("Erro ao buscar dados do Prismic:", error);
    }

    return await fetchHomeData();   
}