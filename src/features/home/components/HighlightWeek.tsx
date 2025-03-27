import { ProfessionalCard } from "./ProfessionalCard"

export const HighlightWeek = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold">Destaques da semana</p>
      </div>
      <ProfessionalCard />
    </section>
  )
}