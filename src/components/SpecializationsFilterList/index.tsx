import { useFilterStore } from "@/stores/filterStore";
import { ListButton } from "../ListButton";

const specializationsList = [
  {
    id: 1,
    name: "Fisioterapia",
  },
  {
    id: 2,
    name: "Cardiologia",
  },
  {
    id: 3,
    name: "Dermatologia",
  },
  {
    id: 4,
    name: "Endocrinologia",
  },
  {
    id: 5,
    name: "Gastroenterologia",
  },
  {
    id: 6,
    name: "Nefrologia",
  },
  {
    id: 7,
    name: "Neurologia",
  },
];

export const SpecializationsFilterList = () => {
  const { setFilters, specializationStore } = useFilterStore();

  const handleSelectSpecialization = (specialization: string) => {
    if (specializationStore === specialization) {
      return setFilters({ specializationStore: "" });
    }

    setFilters({ specializationStore: specialization });
  };

  return (
    <ul className="flex gap-2 items-center overflow-x-auto">
      {specializationsList.map((specializations) => (
        <ListButton
          active={specializationStore?.includes(specializations.name)}
          onClick={() => handleSelectSpecialization(specializations.name)}
          key={specializations.id}
        >
          {specializations.name}
        </ListButton>
      ))}
    </ul>
  );
};
