import { Dialog, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import { specializationOptions } from "@/components/MedicalSpecialization/options";
import { defaultFilters } from "@/hooks/useFilters";
import type { FilterDialogProps, FiltersState } from "./types";

export const FilterDialogDesktop = ({
  open,
  onFilterChange,
  onApply,
  onClear,
  initialFilters,
}: FilterDialogProps) => {
  const valueOptions = ["$", "$$", "$$$"];
  const accessibilityOptions = [
    "Piso tátil",
    "Atendimento em libras",
    "Audiodescrição",
    "Corrimão",
    "Rampas",
  ];
  const serviceOptions = ["LGBTQIAP+ Friendly", "Pet Friendly", "Aceita Wellhub"];

  const [filters, setFilters] = useState<FiltersState>(initialFilters ?? defaultFilters);

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  const toggleChip = (key: keyof FiltersState, value: string) => {
    setFilters((prev) => {
      const list = prev[key] as string[];
      const exists = list.includes(value);
      const nextList = exists ? list.filter((item) => item !== value) : [...list, value];
      return { ...prev, [key]: nextList };
    });
  };

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.target.value);
    setFilters((prev) => ({ ...prev, distance: nextValue }));
  };

  const handleOnFilter = () => {
    onApply?.(filters);
    onFilterChange();
  };

  const handleClear = () => {
    setFilters({ ...defaultFilters });
    onClear?.();
  };

  const baseChipClass =
    "inline-flex min-w-[86px] justify-center px-3 py-2 text-sm rounded-lg whitespace-nowrap";
  const activeChipClass = "bg-secondary-500 border-secondary-500 text-white";
  const inactiveChipClass = "bg-white border-secondary-500 text-gray-800";

  return (
    <Dialog open={open ?? true} onClose={onFilterChange} maxWidth="md" fullWidth>
      <DialogContent className="bg-background p-0">
        <div className="flex flex-col gap-6 px-6 py-6 md:px-10 md:py-8">
          <button
            type="button"
            onClick={onFilterChange}
            className="flex items-center gap-2 text-black text-sm hover:text-gray-800"
          >
            <span className="text-lg">←</span>
            <span>voltar</span>
          </button>

          <div className="flex flex-col gap-6">
            <h1 className="font-semibold text-2xl text-black">Filtros de Busca</h1>

            <section className="flex flex-col gap-3">
              <h2 className="font-semibold text-base text-black">Especialidades</h2>
              <div className="flex flex-wrap gap-2">
                {specializationOptions.map((spec) => {
                  const active = filters.specialties.includes(spec.name);
                  return (
                    <button
                      key={spec.id}
                      className={`${baseChipClass} ${active ? activeChipClass : inactiveChipClass}`}
                      type="button"
                      onClick={() => toggleChip("specialties", spec.name)}
                    >
                      {spec.name}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-semibold text-base text-black">Disponibilidade</h2>
              <div className="flex flex-wrap gap-2">
                {["Hoje", "Amanhã", "Próxima Semana", "Próximo Mês"].map((item) => {
                  const active = filters.availability.includes(item);
                  return (
                    <button
                      key={item}
                      className={`${baseChipClass} ${active ? activeChipClass : inactiveChipClass}`}
                      type="button"
                      onClick={() => toggleChip("availability", item)}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-semibold text-base text-black">Valor</h2>
              <div className="flex flex-wrap gap-2">
                {valueOptions.map((item) => {
                  const active = filters.value.includes(item);
                  return (
                    <button
                      key={item}
                      className={`${baseChipClass} ${active ? activeChipClass : inactiveChipClass}`}
                      type="button"
                      onClick={() => toggleChip("value", item)}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-semibold text-base text-black">Acessibilidade</h2>
              <div className="flex flex-wrap gap-2">
                {accessibilityOptions.map((item) => {
                  const active = filters.accessibility.includes(item);
                  return (
                    <button
                      key={item}
                      className={`${baseChipClass} ${active ? activeChipClass : inactiveChipClass}`}
                      type="button"
                      onClick={() => toggleChip("accessibility", item)}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-semibold text-base text-black">Preferências de Atendimento</h2>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((item) => {
                  const active = filters.services.includes(item);
                  return (
                    <button
                      key={item}
                      className={`${baseChipClass} ${active ? activeChipClass : inactiveChipClass}`}
                      type="button"
                      onClick={() => toggleChip("services", item)}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-semibold text-base text-black">Distância</h2>
              <div className="flex flex-col gap-2">
                <input
                  type="range"
                  min={0}
                  max={30}
                  value={filters.distance}
                  onChange={handleDistanceChange}
                  className="w-full accent-primary-500"
                />
                <div className="flex justify-between text-gray-500 text-xs">
                  <span>0</span>
                  <span>30</span>
                </div>
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-3 pt-2 md:flex-row md:justify-center md:gap-6">
            <button
              type="button"
              onClick={handleOnFilter}
              className="w-full rounded-md bg-primary-500 px-6 py-3 text-center font-semibold text-lime-500 text-sm shadow hover:bg-primary-800 md:w-1/2"
            >
              Pesquisar
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="w-full rounded-md border border-primary-500 bg-white px-6 py-3 text-center font-semibold text-primary-500 text-sm hover:bg-secondary-50 md:w-1/2"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
