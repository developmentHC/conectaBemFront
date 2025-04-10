import { ProfessionalCard } from "@/components/ProfessionalCard";
import { useProfessionalFiltered } from "../hooks/useProfessionalFiltered";

export const SimilarProfessional = () => {
  const { data: professionals } = useProfessionalFiltered();

  return (
    <div className="flex flex-col gap-6">
      <p className="text-gray-500 text-xl">
        Não há profissionais com o filtro selecionado. Tente modificar as
        opções.
      </p>

      <h2 className="text-xl">Similares</h2>

      {professionals?.map((professional) => (
        <ProfessionalCard professional={professional} />
      ))}
    </div>
  );
};
