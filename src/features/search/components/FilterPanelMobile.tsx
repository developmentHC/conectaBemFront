import { IoMdArrowBack } from "react-icons/io";
import { FilterDialogProps } from "./types";
import { professionalFilters } from "@/types/professionalFilters";

const valueOptions = ["$", "$$", "$$$"];
const accessibilityOptions = [
  "Piso tátil",
  "Atendimento em libras",
  "Audiodescrição",
  "Corrimão",
  "Rampas",
];
const serviceOptions = ["LGBTQIAP+ Friendly", "Pet Friendly", "Aceita Wellhub"];

export const FilterPanelMobile = ({ onFilterChange, filters }: FilterDialogProps) => {
  
  const toggleFilter = (type: keyof professionalFilters, value: string) => {
      const current = filters[type] as string[];

      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

        onFilterChange({
          ...filters,
          [type]: updated,
        });
    };

  return (
    <div className="flex flex-col items-center gap-6 mx-auto mb-4">
      <div className="flex flex-col w-full gap-3">
        <div className="w-fit">
          <button
            className="flex items-center gap-1 text-sm"
            onClick={() => onFilterChange(filters)}
          >
            <IoMdArrowBack size={20} />
            voltar
          </button>
        </div>

        <h1 className="text-2xl font-semibold">Filtros</h1>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-xl">Valor</h2>
          <div className="flex gap-2">
            {valueOptions.map((item) => (
              <button
                key={item}
                className="border border-blue-600 py-1 px-2 rounded-t-lg rounded-br-lg cursor-pointer whitespace-nowrap text-2x1"
                type="button"
              >
                <span className="text-sm">{item}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <span className="text-xl">Acessibilidade</span>
          <div className="flex flex-wrap gap-2">
            {accessibilityOptions.map((item) => (
              <button
                key={item}
                onClick={() => toggleFilter("accessibility", item)}
                className={`border py-1 px-2 rounded-t-lg rounded-br-lg ${
                  filters.accessibility.includes(item)
                    ? "bg-blue-600 text-white"
                    : "border-blue-600"
                }`}
              >
                <span className="text-sm">{item}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <span className="text-xl">Atendimento</span>
          <div className="flex flex-wrap gap-2">
            {serviceOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleFilter("services", item)}
                  className={`border py-1 px-2 rounded-t-lg rounded-br-lg ${
                    filters.services.includes(item)
                      ? "bg-blue-600 text-white"
                      : "border-blue-600"
                  }`}
                >
                  <span className="text-sm">{item}</span>
                </button>
              ))}
          </div>
        </div>

      </div>
      <button
        className="flex justify-center w-full bg-blue-600 py-2 rounded-lg text-center tracking-widest"
        onClick={() => onFilterChange(filters)}
      >
        <p className="text-button font-semibold text-sm">FILTRAR</p>
      </button>
    </div>
  );
};
