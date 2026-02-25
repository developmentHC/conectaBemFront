import { IoMdClose } from "react-icons/io";
import { FilterDialogProps } from "./types";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { useEffect, useState } from "react";

export const FilterDialogDesktop = ({
  open,
  filters,
  onFilterChange,
  onClose
}: FilterDialogProps) => {
  const valueOptions = ["R$40", "R$30", "R$50"];
  const accessibilityOptions = [
    "Piso tátil",
    "Atendimento em libras",
    "Audiodescrição",
    "Corrimão",
    "Rampas",
  ];

  const serviceOptions = [
    "Pré-consulta",
    "Exame",
    "Consulta",
  ];

  const paymentOptions = ["Visa", "Mastercard", "Pix", "Wellhub"];

  const [selectedValues, setSelectedValues] = useState<string[]>(filters.values);
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>(filters.accessibility);
  const [selectedServices, setSelectedServices] = useState<string[]>(filters.services);
  const [selectedPayment, setSelectedPayment] = useState<string[]>(filters.payments);

   const toggleSelection = (item: string, set: any, selected: string[]) => {
    if (selected.includes(item)) {
      set(selected.filter((i) => i !== item));
    } else {
      set([...selected, item]);
    }
  };

  const handleOnFilter = () => {
    const filters = {
      values: selectedValues,
      accessibility: selectedAccessibility,
      services: selectedServices,
      payments: selectedPayment,
    };
    
    onFilterChange(filters);
  };

  return (
    <Dialog
      open={open ?? true}
      onClose={onFilterChange}
      maxWidth="md"
      fullWidth
    >
      <DialogContent>
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex justify-end">
              <IconButton onClick={onClose}>
                <IoMdClose className="text-2xl" size={20} />
              </IconButton>
            </div>
            <h1 className="text-2xl font-semibold">Filtros</h1>
          </div>

          <div className="w-full flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Valor</h2>
            <div className="flex gap-2">
              {valueOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleSelection(item, setSelectedValues, selectedValues)}
                  className={`border py-1 px-2 rounded-t-lg rounded-br-lg cursor-pointer whitespace-nowrap text-sm
                    ${selectedValues.includes(item) ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600"}`}
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
                  onClick={() => toggleSelection(item, setSelectedAccessibility, selectedAccessibility)}
                  className={`border py-1 px-2 rounded-t-lg rounded-br-lg cursor-pointer whitespace-nowrap text-sm
                    ${selectedAccessibility.includes(item) ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600"}`}
                  type="button"
                >
                  <span className="text-sm">{item}</span>
                </button>
              ))}
            </div>
          </div>

           <div className="w-full flex flex-col gap-4">
            <span className="text-2xl font-semibold">Formas de pagamento aceitas</span>
            <div className="flex flex-wrap gap-2">
              {paymentOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleSelection(item, setSelectedPayment, selectedPayment)}
                  className={`border py-1 px-2 rounded-t-lg rounded-br-lg cursor-pointer whitespace-nowrap text-sm
                    ${selectedPayment.includes(item) ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600"}`}
                  type="button"
                >
                  <span className="text-sm">{item}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <span className="text-2xl font-semibold">Especialidade</span>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleSelection(item, setSelectedServices, selectedServices)}
                  className={`border py-1 px-2 rounded-t-lg rounded-br-lg cursor-pointer whitespace-nowrap text-sm
                    ${selectedServices.includes(item) ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600"}`}
                  type="button"
                >
                  <span className="text-sm">{item}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            className="flex justify-center w-full bg-blue-600 py-2 rounded-lg text-center tracking-widest"
            onClick={handleOnFilter}
          >
            <p className="text-button font-semibold text-sm">FILTRAR</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

