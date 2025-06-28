import { FilterDialogProps } from "./types";
import { IoMdClose } from "react-icons/io";

export const FilterDialogDesktop = ({
  onFilterClick,
  filters,
  setPrice,
  setAccessibility,
  setService,
  setMaxDistance,
}: FilterDialogProps) => {
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
    onFilterClick();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className=" flex flex-col items-center gap-10 max-w-[800px] p-6 bg-[#F7F8FA] rounded-lg">
        <div className="flex flex-col gap-3 w-full">
          <div className="flex justify-end">
            <IoMdClose
              className="text-2xl  cursor-pointer w-fit"
              onClick={onFilterClick}
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
                  className={`border border-blue-600 py-1 px-2 rounded-t-lg rounded-br-lg cursor-pointer whitespace-nowrap text-2x1 ${
                    filters.price === item ? "bg-indigo-300" : ""
                  }`}
                  onClick={() =>
                    filters.price === item ? setPrice("") : setPrice(item)
                  }
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
                  className={`border border-blue-600 py-1 px-2 rounded-t-lg rounded-br-lg cursor-pointer whitespace-nowrap ${
                    filters.acessibility.includes(item) ? "bg-indigo-300" : ""
                  }`}
                  onClick={() => {
                    const current = filters.acessibility || [];
                    if (current.includes(item)) {
                      setAccessibility(current.filter((a) => a !== item));
                    } else {
                      setAccessibility([...current, item]);
                    }
                  }}
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
                  className={`border border-blue-600 py-1 px-2 rounded-t-lg rounded-br-lg cursor-pointer whitespace-nowrap ${
                    filters.service.includes(item) ? "bg-indigo-300" : ""
                  }`}
                  onClick={() => {
                    const current = filters.service || [];
                    if (current.includes(item)) {
                      setService(current.filter((s) => s !== item));
                    } else {
                      setService([...current, item]);
                    }
                  }}
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
                value={filters.maxDistance ?? 12}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
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
    </div>
  );
};
