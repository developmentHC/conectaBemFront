import { FilterButton } from "@/features/search/components/FilterButton";
const specialization = [
  {
    id: 1,
    name: "Reiki",
  },
  {
    id: 2,
    name: "Massoterapia",
  },
  {
    id: 3,
    name: "Acupuntura",
  },
  {
    id: 4,
    name: "Homeopatia",
  },
  {
    id: 5,
    name: "Yoga",
  },
  {
    id: 6,
    name: "Arteterapia",
  },
];

export const MedicalSpecialization = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 self-stretch w-full">
      <div className="flex w-full max-w-[929px] items-center justify-center gap-2 flex-wrap">
        <FilterButton onClick={() => { }} />
        {specialization.map((item) => (
          <div
            className="flex h-10 items-center justify-center gap-2 px-3 py-2 rounded-t-lg rounded-br-lg border border-secondary-500 bg-white text-sm leading-[21px] text-black-500 cursor-pointer"
            key={item.id}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};
