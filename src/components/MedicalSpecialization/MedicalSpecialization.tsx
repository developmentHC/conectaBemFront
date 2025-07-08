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
    <div className="flex gap-2 overflow-x-auto lg:justify-center">
      {specialization.map((item) => (
        <div
          className="border border-blue-600 text-sm p-2 rounded-t-lg rounded-br-lg cursor-pointer "
          key={item.id}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
