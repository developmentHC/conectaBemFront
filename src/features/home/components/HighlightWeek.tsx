import { ProfessionalCard } from "./ProfessionalCard";

export const HighlightWeek = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-2xl">Destaques da semana</p>
        <div className="cursor-pointer font-semibold underline decoration-2 underline-offset-4">
          + Ver Mais
        </div>
      </div>
      <ProfessionalCard />
    </section>
  );
};
