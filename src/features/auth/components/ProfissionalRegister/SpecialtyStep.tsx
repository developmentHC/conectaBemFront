import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { type MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useGetSpecialties } from "@/kubb/hooks/useGetSpecialties";
import { SuggestionForm } from "./SuggestionForm";
import { useProfissionalRegisterStore } from "./useProfissionalRegisterStore";

const services = ["LGBTQIAP+ Friendly", "Pet Friendly", "Aceita Wellhub"];

type Data = z.infer<typeof schema>;

const schema = z.object({
  specialties: z.array(z.string()).min(1, "Selecione pelo menos uma especialidade"),
  servicePreferences: z.array(z.string()).nullable(),
});

export const SpecialtyStep = () => {
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: { specialties: [], servicePreferences: [] },
  });

  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const { changeStep, updateFields } = useProfissionalRegisterStore();
  const [collapseSpecialty, setCollapseSpecialty] = useState<boolean>(false);
  const [collapseService, setCollapseService] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const { data } = useGetSpecialties();
  const specialties = data?.specialties;
  const visibleSpecialties = collapseSpecialty ? specialties : specialties?.slice(0, 8);

  const visibleServices = collapseService ? services : services?.slice(0, 8);

  const handleClickSpecialty = (specialtyName: string) => {
    if (specialtyName === "Outros") setShowSuggestions((prev) => !prev);
    setSelectedSpecialties((prev) =>
      prev.includes(specialtyName)
        ? prev.filter((item) => item !== specialtyName)
        : [...prev, specialtyName],
    );
  };

  const handleClickService = (e: MouseEvent) => {
    const service = (e.target as HTMLButtonElement).textContent;

    if (!service) return;

    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((item) => item !== service) : [...prev, service],
    );
  };

  const onSubmit = handleSubmit(async (data: Data) => {
    updateFields(data as any);

    window.scrollTo({ top: 0, behavior: "smooth" });

    changeStep("accessibility");
  });

  useEffect(() => {
    setValue("specialties", selectedSpecialties);
    setValue("servicePreferences", selectedServices);
  }, [selectedSpecialties, selectedServices, setValue]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <span>Escolha as especialidades que irá fornecer atendimento *</span>
        {errors.specialties && (
          <p className="text-red-600 text-sm" role="alert">
            {errors.specialties.message}
          </p>
        )}
      </div>

      <ul
        role="listbox"
        aria-multiselectable="true"
        aria-label="Especialidades"
        className="flex flex-wrap gap-2"
      >
        {visibleSpecialties
          ?.filter((s): s is { id?: string; name: string } => s.name !== undefined)
          .map((specialty) => (
            <li
              key={specialty.id}
              role="option"
              aria-selected={selectedSpecialties.includes(specialty.name)}
              tabIndex={0}
              onClick={() => handleClickSpecialty(specialty.name)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClickSpecialty(specialty.name);
                }
              }}
              className={`cursor-pointer rounded rounded-t-lg rounded-br-lg border border-blue-800 p-2 transition-all hover:bg-blue-600/50 ${
                selectedSpecialties.includes(specialty.name) ? "bg-blue-600/50" : ""
              }`}
            >
              {specialty.name}
            </li>
          ))}

        <div className="flex w-full justify-end">
          <span
            onClick={() => setCollapseSpecialty(!collapseSpecialty)}
            className="mt-4 w-fit cursor-pointer text-end text-gray-600"
          >
            {collapseSpecialty ? "+ Ver menos" : "+ Ver mais"}
          </span>
        </div>
      </ul>

      {showSuggestions && <SuggestionForm />}

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl">Atendimento</h2>
          <span>Escolha as opções que você e seu estabelecimento fornecem suporte</span>
        </div>

        <ul className="flex flex-wrap gap-2">
          {visibleServices.sort().map((service) => (
            <li key={service}>
              <button
                type="button"
                onClick={handleClickService}
                className={`cursor-pointer rounded rounded-t-lg rounded-br-lg border border-blue-800 p-2 transition-all hover:bg-blue-600/50 ${selectedServices.includes(service) ? "bg-blue-600/50" : ""}`}
              >
                {service}
              </button>
            </li>
          ))}
          <div className="flex w-full justify-end">
            <span
              onClick={() => setCollapseService(!collapseService)}
              className="mt-4 w-fit cursor-pointer text-end text-gray-600"
            >
              {collapseService ? "+ Ver menos" : "+ Ver mais"}
            </span>
          </div>
        </ul>
      </div>

      <Button className="text-button" variant="contained" type="submit">
        Continuar
      </Button>
    </form>
  );
};
