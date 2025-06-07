import { Button } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import { useProfissionalRegisterStore } from "./useProfissionalRegisterStore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SuggestionForm } from "./SuggestionForm";

const specialtiesMock = [
  "Acunputura",
  "Aromaterapia",
  "Arteterapia",
  "Biodança",
  "Cromoterapia",
  "Fitoterapia",
  "Hipnoterapia",
  "Homeoterapia",
  "Meditação",
  "Musicoterapia",
  "Osteopatia",
  "Pilates",
  "Quiropraxia",
  "Reflexoterapia",
  "Reiki",
  "Yoga",
  "Outros",
];

const services = ["LGBTQIAP+ Friendly", "Pet Friedly", "Aceita Wellhub"];

type Data = z.infer<typeof schema>;

const schema = z.object({
  specialties: z.array(z.string()).min(1, "Selecione pelo menos uma especialidade"),
  servicePreferences: z.array(z.string()).nullable(),
});

export const SpecialtyStep = () => {
  const { setValue, handleSubmit } = useForm<Data>({
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

  const visibleSpecialties = collapseSpecialty ? specialtiesMock : specialtiesMock?.slice(0, 8);

  const visibleServices = collapseService ? services : services?.slice(0, 8);

  const handleClickSpecialty = (e: MouseEvent) => {
    const specialty = (e.target as HTMLLIElement).textContent;

    if (!specialty) return;

    if (specialty === "Outros") setShowSuggestions((prev) => !prev);

    setSelectedSpecialties((prev) =>
      prev.includes(specialty) ? prev.filter((item) => item !== specialty) : [...prev, specialty]
    );
  };

  const handleClickService = (e: MouseEvent) => {
    const service = (e.target as HTMLLIElement).textContent;

    if (!service) return;

    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((item) => item !== service) : [...prev, service]
    );
  };

  const onSubmit = handleSubmit(async (data: Data) => {
    updateFields(data as any);

    window.scrollTo({ top: 0, behavior: "smooth" });

    changeStep("complete_profile");
  });

  useEffect(() => {
    setValue("specialties", selectedSpecialties);
    setValue("servicePreferences", selectedServices);
  }, [selectedSpecialties, selectedServices, setValue]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <span>Escolha as especialidades que irá fornecer atendimento *</span>

      <ul className="flex flex-wrap gap-2">
        {visibleSpecialties.map((specialty) => (
          <li
            key={specialty}
            onClick={handleClickSpecialty}
            className={`p-2 border border-blue-800 rounded cursor-pointer hover:bg-blue-600/50 transition-all rounded-t-lg rounded-br-lg ${
              selectedSpecialties.includes(specialty) ? "bg-blue-600/50" : ""
            }`}
          >
            {specialty}
          </li>
        ))}

        <div className="flex justify-end w-full">
          <span
            onClick={() => setCollapseSpecialty(!collapseSpecialty)}
            className="cursor-pointer w-fit text-end text-gray-600 mt-4"
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
            <li
              onClick={handleClickService}
              key={service}
              className={`p-2 border border-blue-800 rounded cursor-pointer hover:bg-blue-600/50 transition-all rounded-t-lg rounded-br-lg 
              ${selectedServices.includes(service) ? "bg-blue-600/50" : ""}`}
            >
              {service}
            </li>
          ))}
          <div className="flex justify-end w-full">
            <span
              onClick={() => setCollapseService(!collapseService)}
              className="cursor-pointer w-fit text-end text-gray-600 mt-4"
            >
              {collapseService ? "+ Ver menos" : "+ Ver mais"}
            </span>
          </div>
        </ul>
      </div>

      <Button disabled={!selectedSpecialties.length} className="text-button" variant="contained" type="submit">
        Continuar
      </Button>
    </form>
  );
};
