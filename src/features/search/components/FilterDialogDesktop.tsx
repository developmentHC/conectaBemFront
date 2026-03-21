import { Dialog, DialogContent, IconButton } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import type { FilterDialogProps } from "./types";

export const FilterDialogDesktop = ({ open, onFilterChange }: FilterDialogProps) => {
  const valueOptions = ["$", "$$", "$$$"];
  const accessibilityOptions = [
    "Piso tátil",
    "Atendimento em libras",
    "Audiodescrição",
    "Corrimão",
    "Rampas",
  ];
  const serviceOptions = ["LGBTQIAP+ Friendly", "Pet Friendly", "Aceita Wellhub"];

  const handleOnFilter = () => {
    onFilterChange();
  };

  return (
    <Dialog open={open ?? true} onClose={onFilterChange} maxWidth="md" fullWidth>
      <DialogContent>
        <div className="flex flex-col items-center gap-10">
          <div className="flex w-full flex-col gap-3">
            <div className="flex justify-end">
              <IconButton onClick={onFilterChange}>
                <IoMdClose className="text-2xl" size={20} />
              </IconButton>
            </div>
            <h1 className="font-semibold text-2xl">Filtros</h1>
          </div>

          <div className="flex w-full flex-col gap-4">
            <h2 className="font-semibold text-2xl">Valor</h2>
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
            <span className="font-semibold text-2xl">Acessibilidade</span>
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
            <span className="font-semibold text-2xl">Atendimento</span>
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
            <span className="font-semibold text-2xl">Distância</span>
            <div className="flex flex-col gap-2">
              <input type="range" min={0} max={12} className="w-full bg-blue-600" readOnly />
              <div className="flex justify-between text-gray-400 text-sm">
                <span>0 km</span>
                <span>12 km</span>
              </div>
            </div>
          </div>
          <button
            className="flex w-full justify-center rounded-lg bg-blue-600 py-2 text-center tracking-widest"
            onClick={handleOnFilter}
          >
            <p className="font-semibold text-button text-sm">FILTRAR</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
