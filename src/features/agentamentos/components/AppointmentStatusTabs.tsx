interface AppointmentStatusTabsProps {
  tabValue: string;
  setTabValue: (value: string) => void;
}

export default function AppointmentStatusTabs({
  tabValue,
  setTabValue,
}: AppointmentStatusTabsProps) {
  const handleTabChange = (value: string) => {
    setTabValue(value);
  };
  return (
    <div className="flex w-full md:w-[30%] justify-evenly border-b-2 border-gray-300">
      <span
        className={`w-[50%] text-center text-xl  font-semibold p-2 border-b-2 cursor-pointer ${
          tabValue === "a_realizar"
            ? "text-blue-600 border-blue-600"
            : "text-gray-400"
        }`}
        onClick={() => handleTabChange("a_realizar")}
      >
        A realizar
      </span>
      <span
        className={`w-[50%] text-center text-xl font-semibold p-2 border-b-2 cursor-pointer ${
          tabValue === "a_realizar"
            ? "text-gray-400"
            : "text-blue-600 border-blue-600"
        }`}
        onClick={() => handleTabChange("realizados")}
      >
        Realizados
      </span>
    </div>
  );
}
