import { IoMdArrowBack } from "react-icons/io";
import { FilterDialogProps } from "./types";

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
    <div className="flex flex-col items-center gap-6 mx-auto mb-4">
      <div className="flex flex-col w-full gap-3">
        <div className="w-fit">
          <button
            className="flex items-center gap-1 text-sm"
            onClick={onFilterChange}
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
                className="border border-blue-600 py-1 px-2 rounded-t-lg rounded-br-lg cursor-pointer whitespace-nowrap"
                type="button"
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
                className="border border-blue-600 py-1 px-2 rounded-t-lg rounded-br-lg cursor-pointer whitespace-nowrap"
                type="button"
              >
                <span className="text-sm">{item}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <span className="text-xl">Distância</span>
          <div className="flex flex-col gap-2">
            <input
              type="range"
              min={0}
              max={12}
              className="w-full bg-blue-600"
            />
            <div className="flex justify-between text-gray-400 text-sm">
              <span>0 km</span>
              <span>12 km</span>
            </div>
          </div>
        </div>
      </div>
      <button
        className="flex justify-center w-full bg-blue-600 py-2 rounded-lg text-center tracking-widest"
        onClick={handleOnFilter}
      >
        <p className="text-button font-semibold text-sm">FILTRAR</p>
      </button>
    </div>
  );
};
