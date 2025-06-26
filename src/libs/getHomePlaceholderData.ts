import { createClient } from "@/libs/prismic";

export async function getHomePlaceholderData() {
    const client = createClient();

    async function fetchHomeData() {
        try {
            const menuResponse = await client.getAllByType("home");

            if (!menuResponse.length) {
            throw new Error("Nenhum dado encontrado para 'home'.");
            }

            const { h1_text, description, banner, especialidades_em_destaque } = menuResponse[0].data;

            // IDs das especialidades para buscar os nomes completos
            const especialidadesIds = especialidades_em_destaque.map(
            (item) => item.lista_de_especialidades.id
            );

            // Buscar os documentos das especialidades
            const especialidadesDocs = await client.getByIDs(especialidadesIds, { lang: "pt-br" });

            // console.log("especialidadesDocs", especialidadesDocs);

            // Mapeia os documentos para extrair nome e ID
            const especialidades = especialidadesDocs.results.map((doc) => ({
                id: doc.id,
                nome: doc.data?.name || doc.slugs[0] || "Nome não disponível",
            }));

            return {
            titulo: h1_text,
            descricao: description,
            bannerUrl: banner?.url || "",
            especialidades,
            };

        } catch (error) {
            console.error("Erro ao buscar dados do Prismic:", error);
        }
    }

    return await fetchHomeData();   
}