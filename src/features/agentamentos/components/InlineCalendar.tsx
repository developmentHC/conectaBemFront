"use client";

import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

dayjs.locale("pt-br");

export function InlineCalendar({
  selectedDate,
  onSelectDate,
}: {
  selectedDate?: string;
  onSelectDate: (iso: string) => void;
}) {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? dayjs(selectedDate).startOf("month") : dayjs().startOf("month")
  );

  const startOfMonth = currentMonth.startOf("month");
  const startWeekday = startOfMonth.day(); // 0 dom, 1 seg...
  const daysInMonth = currentMonth.daysInMonth();

  const todayIso = dayjs().format("YYYY-MM-DD");

  const daysArray: Array<{ date: string; label: number; isToday: boolean }> = [];

  // preenche dias em branco antes do mês (pra alinhar)
  for (let i = 0; i < startWeekday; i++) {
    daysArray.push({
      date: "",
      label: 0,
      isToday: false,
    });
  }

  // preenche dias do mês
  for (let d = 1; d <= daysInMonth; d++) {
    const date = currentMonth.date(d);
    const iso = date.format("YYYY-MM-DD");
    daysArray.push({
      date: iso,
      label: d,
      isToday: iso === todayIso,
    });
  }

  const handlePrev = () => {
    setCurrentMonth((prev) => prev.subtract(1, "month"));
  };

  const handleNext = () => {
    setCurrentMonth((prev) => prev.add(1, "month"));
  };

  const monthLabel = currentMonth.format("MMMM YYYY");

  return (
    <div className="bg-white rounded-lg py-6 px-4 shadow-sm border border-[#E7EBFE]">
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handlePrev}
          className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-[#E7EBFE]"
        >
          <LuChevronLeft />
        </button>
        <h2 className="text-lg font-semibold capitalize">{monthLabel}</h2>
        <button
          type="button"
          onClick={handleNext}
          className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-[#E7EBFE]"
        >
          <LuChevronRight />
        </button>
      </div>

      {/* dias da semana */}
      <div className="grid grid-cols-7 text-center text-sm text-[#575757] mb-2">
        <span>S</span>
        <span>T</span>
        <span>Q</span>
        <span>Q</span>
        <span>S</span>
        <span>S</span>
        <span>D</span>
      </div>

      {/* dias */}
      <div className="grid grid-cols-7 gap-2">
        {daysArray.map((d, idx) => {
          if (!d.date) {
            return <div key={idx} />;
          }

          const isSelected = d.date === selectedDate;
          const isToday = d.isToday;

          return (
            <button
              key={d.date}
              type="button"
              onClick={() => onSelectDate(d.date)}
              className={`aspect-square flex items-center justify-center rounded-full
                ${
                  isSelected
                    ? "bg-[#3857F4] text-white"
                    : isToday
                    ? "border border-[#3857F4] text-[#3857F4]"
                    : "text-[#19171C] hover:bg-[#E7EBFE]"
                }
              `}
            >
              {d.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
