import { IoMdClose } from "react-icons/io";
import { FilterDialogProps } from "./types";

export const FilterDialogDesktop = ({ onFilterChange }: FilterDialogProps) => {
  const valueOptions = ["$", "$$", "$$$"];
  const accessibilityOptions = [
    "Piso tátil",
    "Atendimento em libras",
    "Audiodescrição",
    "Corrimão",
    "Rampas",
  ];
  const serviceOptions = [
    "LGBTQIAP+ Friendly",
    "Pet Friendly",
    "Aceita Wellhub",
  ];

  const handleOnFilter = () => {
    onFilterChange();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className=" flex flex-col items-center gap-10 max-w-[800px] p-6 bg-[#F7F8FA] rounded-lg">
        <div className="flex flex-col gap-3 w-full">
          <div className="flex justify-end">
            <IoMdClose
              className="text-2xl  cursor-pointer w-fit"
              onClick={onFilterChange}
              size={20}
            />
          </div>

          <h1 className="text-2xl font-semibold">Filtros</h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-full flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Valor</h2>
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
            <span className="text-2xl font-semibold">Acessibilidade</span>
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
            <span className="text-2xl font-semibold">Atendimento</span>
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
            <span className="text-2xl font-semibold">Distância</span>
            <div className="flex flex-col gap-2">
              <input
                type="range"
                min={0}
                max={12}
                className="w-full bg-blue-600"
                readOnly
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
    </div>
  );
};
