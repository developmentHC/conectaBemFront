

export const dynamic = "force-dynamic"; // força renderização dinâmica (sem SSG)
export const revalidate = 0;            // evita cache ou revalidação

export default function Teste500() {
  
  throw new Error("Erro de teste 500 - QA");
}
