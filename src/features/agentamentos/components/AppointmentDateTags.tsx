const datesOpen = [
  {
    id: 1,
    name: "hoje",
  },
  {
    id: 2,
    name: "próxima semana",
  },
  {
    id: 3,
    name: "próximo mês",
  },
];

const datesClosed = [
  {
    id: 1,
    name: "hoje",
  },
  {
    id: 2,
    name: "última semana",
  },
  {
    id: 3,
    name: "último mês",
  },
];

export const AppointmentDateTags = ({ tabValue }: { tabValue: string }) => {
  const dates = tabValue === "a_realizar" ? datesOpen : datesClosed;
  return (
    <div className="flex gap-4 overflow-x-auto">
      {dates.map((item) => (
        <div
          className="border border-blue-600 p-2 rounded-t-lg rounded-br-lg cursor-pointer "
          key={item.id}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
