const specialization = [
  {
    id: 1,
    name: "Hipnoterapia",
  },
  {
    id: 2,
    name: "Massoterapia",
  },

  {
    id: 3,
    name: "Biodança",
  },
  {
    id: 4,
    name: "Acupuntura",
  },
  {
    id: 5,
    name: "Homeopatia",
  },
  {
    id: 6,
    name: "Cromoterapia",
  },
  {
    id: 7,
    name: "Fitoterapia",
  },
];

type MedicalSpecializationProps = {
  selectedSpecializations: string[];
  onToggleSpecialization: (name: string) => void;
};

export const MedicalSpecialization = ({
  selectedSpecializations,
  onToggleSpecialization,
}: MedicalSpecializationProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto lg:justify-center">
      {specialization.map((item) => {
        const isActive = (selectedSpecializations || []).includes(item.name);
        return (
          <div
            key={item.id}
            onClick={() => onToggleSpecialization(item.name)}
            className={`
              border text-sm p-2 rounded-t-lg rounded-br-lg cursor-pointer
              ${isActive ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600"}
            `}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};