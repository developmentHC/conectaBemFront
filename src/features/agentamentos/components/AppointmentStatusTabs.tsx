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
    <div className="w-full flex flex-row items-start border-b border-[#B1ACB9]">
      {/* Confirmados */}
      <button
        type="button"
        className={`flex justify-center items-center w-1/3 h-[42px] px-2 gap-[10px] border-b-2 text-[20px] font-bold leading-[130%] ${
          tabValue === "confirmados"
            ? "text-[#3857F4] border-[#3857F4]"
            : "text-[#B1ACB9] border-transparent"
        }`}
        onClick={() => handleTabChange("confirmados")}
      >
        Confirmados
      </button>

      {/* Pendentes */}
      <button
        type="button"
        className={`flex justify-center items-center w-1/3 h-[42px] px-2 gap-[10px] border-b-2 text-[20px] font-bold leading-[130%] ${
          tabValue === "pendentes"
            ? "text-[#3857F4] border-[#3857F4]"
            : "text-[#B1ACB9] border-transparent"
        }`}
        onClick={() => handleTabChange("pendentes")}
      >
        Pendentes
      </button>

      {/* Cancelados */}
      <button
        type="button"
        className={`flex justify-center items-center w-1/3 h-[42px] px-2 gap-[10px] border-b-2 text-[20px] font-bold leading-[130%] ${
          tabValue === "cancelados"
            ? "text-[#3857F4] border-[#3857F4]"
            : "text-[#B1ACB9] border-transparent"
        }`}
        onClick={() => handleTabChange("cancelados")}
      >
        Cancelados
      </button>
    </div>
  );
}
