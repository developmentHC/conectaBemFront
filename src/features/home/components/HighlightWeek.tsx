import { ProfessionalCard } from "./ProfessionalCard";

export const HighlightWeek = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold">Destaques da semana</p>
        <div className="font-semibold decoration-2 underline underline-offset-4 cursor-pointer">
          + Ver Mais
        </div>
      </div>
      <ProfessionalCard />
    </section>
  );
};
