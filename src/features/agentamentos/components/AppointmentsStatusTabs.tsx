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
    <div className="flex w-full flex-row items-start border-[#B1ACB9] border-b">
      {/* Confirmados */}
      <button
        type="button"
        className={`flex h-[42px] w-1/3 items-center justify-center gap-[10px] border-b-2 px-2 font-bold text-[20px] leading-[130%] ${
          tabValue === "confirmados"
            ? "border-[#3857F4] text-[#3857F4]"
            : "border-transparent text-[#B1ACB9]"
        }`}
        onClick={() => handleTabChange("confirmados")}
      >
        Confirmados
      </button>

      {/* Pendentes */}
      <button
        type="button"
        className={`flex h-[42px] w-1/3 items-center justify-center gap-[10px] border-b-2 px-2 font-bold text-[20px] leading-[130%] ${
          tabValue === "pendentes"
            ? "border-[#3857F4] text-[#3857F4]"
            : "border-transparent text-[#B1ACB9]"
        }`}
        onClick={() => handleTabChange("pendentes")}
      >
        Pendentes
      </button>

      {/* Cancelados */}
      <button
        type="button"
        className={`flex h-[42px] w-1/3 items-center justify-center gap-[10px] border-b-2 px-2 font-bold text-[20px] leading-[130%] ${
          tabValue === "cancelados"
            ? "border-[#3857F4] text-[#3857F4]"
            : "border-transparent text-[#B1ACB9]"
        }`}
        onClick={() => handleTabChange("cancelados")}
      >
        Cancelados
      </button>
    </div>
  );
}
