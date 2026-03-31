import { IoMdArrowBack } from "react-icons/io";
import type { FilterDialogProps } from "./types";

const valueOptions = ["$", "$$", "$$$"];
const accessibilityOptions = [
  "Piso tátil",
  "Atendimento em libras",
  "Audiodescrição",
  "Corrimão",
  "Rampas",
];
const serviceOptions = ["LGBTQIAP+ Friendly", "Pet Friendly", "Aceita Wellhub"];

export const FilterPanelMobile = ({ onFilterChange }: FilterDialogProps) => {
  const handleOnFilter = () => {
    onFilterChange();
  };

  return (
    <div className="mx-auto mb-4 flex flex-col items-center gap-6">
      <div className="flex w-full flex-col gap-3">
        <div className="w-fit">
          <button
            type="button"
            className="flex items-center gap-1 text-sm"
            onClick={onFilterChange}
          >
            <IoMdArrowBack size={20} />
            voltar
          </button>
        </div>

        <h1 className="font-semibold text-2xl">Filtros</h1>
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-4">
          <h2 className="text-xl">Valor</h2>
          <div className="flex gap-2">
            {valueOptions.map((item) => (
              <button
                key={item}
                className="cursor-pointer whitespace-nowrap rounded-t-lg rounded-br-lg border border-blue-600 px-2 py-1 text-2x1"
                type="button"
              >
                <span className="text-sm">{item}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <span className="text-xl">Acessibilidade</span>
          <div className="flex flex-wrap gap-2">
            {accessibilityOptions.map((item) => (
              <button
                key={item}
                className="cursor-pointer whitespace-nowrap rounded-t-lg rounded-br-lg border border-blue-600 px-2 py-1"
                type="button"
              >
                <span className="text-sm">{item}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <span className="text-xl">Atendimento</span>
          <div className="flex flex-wrap gap-2">
            {serviceOptions.map((item) => (
              <button
                key={item}
                className="cursor-pointer whitespace-nowrap rounded-t-lg rounded-br-lg border border-blue-600 px-2 py-1"
                type="button"
              >
                <span className="text-sm">{item}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <span className="text-xl">Distância</span>
          <div className="flex flex-col gap-2">
            <input type="range" min={0} max={12} className="w-full bg-blue-600" />
            <div className="flex justify-between text-gray-400 text-sm">
              <span>0 km</span>
              <span>12 km</span>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="flex w-full justify-center rounded-lg bg-blue-600 py-2 text-center tracking-widest"
        onClick={handleOnFilter}
      >
        <p className="font-semibold text-button text-sm">FILTRAR</p>
      </button>
    </div>
  );
};
