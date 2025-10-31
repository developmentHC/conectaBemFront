"use client";
import { useMemo, useRef, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import {
  LuCalendarDays,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";

dayjs.locale("pt-br");

export const AppointmentDateTags = ({
  tabValue,
  selectedDate,
  setSelectedDate,
  showCalendar,
  setShowCalendar,
}: {
  tabValue: string;
  selectedDate?: string;
  setSelectedDate: (value: string) => void;
  showCalendar: boolean;
  setShowCalendar: (v: boolean) => void;
}) => {
  const today = dayjs();
  const todayIso = today.format("YYYY-MM-DD");

  const days = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => today.add(i, "day"));
  }, [today]);

  // garante que hoje entra selecionado
  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(todayIso);
    }
  }, [selectedDate, todayIso, setSelectedDate]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 120;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const labelTop = (d: dayjs.Dayjs) => d.format("DD/MM");
  const labelBottom = (d: dayjs.Dayjs) => {
    if (d.isSame(today, "day")) return "hoje";
    if (d.isSame(today.add(1, "day"), "day")) return "amanhã";
    return d.format("dddd");
  };

  return (
    <div className="w-full relative">
      {/* setas mobile */}
      <button
        type="button"
        onClick={() => handleScroll("left")}
        className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-white/90 shadow flex items-center justify-center"
      >
        <LuChevronLeft className="text-[#253E99]" />
      </button>
      <button
        type="button"
        onClick={() => handleScroll("right")}
        className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-white/90 shadow flex items-center justify-center"
      >
        <LuChevronRight className="text-[#253E99]" />
      </button>

      <div className="mt-2 w-full border border-[#E7EBFE] rounded-lg overflow-hidden">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto md:overflow-visible hide-scrollbar"
        >
          {days.map((d, index) => {
            const iso = d.format("YYYY-MM-DD");
            const isSelected = iso === selectedDate;

            return (
              <button
                key={iso}
                type="button"
                onClick={() => {
                  setSelectedDate(iso);
                  // se o calendário estiver aberto, ao clicar num dia da faixa, também posso atualizar o calendário
                  // (não fecho aqui pra ficar igual ao figma)
                }}
                className={`h-[72px] flex flex-col items-center justify-center gap-1 border-r border-[#E7EBFE] text-center transition-all duration-150
                  w-[110px] flex-shrink-0
                  md:w-auto md:flex-1 md:flex-shrink
                  ${
                    isSelected
                      ? "bg-[#3857F4] text-white"
                      : "bg-white text-[#19171C]"
                  }
                  ${index === days.length - 1 ? "md:border-r-0" : ""}
                `}
              >
                <span className="text-[16px] font-bold leading-[150%]">
                  {labelTop(d)}
                </span>
                <span className="text-[14px] leading-[150%] capitalize">
                  {labelBottom(d)}
                </span>
              </button>
            );
          })}

          {/* Botão Calendário */}
          <button
            type="button"
            onClick={() => setShowCalendar(!showCalendar)}
            className={`h-[72px] flex flex-col items-center justify-center gap-2 border-l border-[#E7EBFE] w-[120px] flex-shrink-0
              md:w-auto md:flex-1 md:flex-shrink
              ${
                showCalendar
                  ? "bg-[#0B29C1] text-white"
                  : "bg-[#0B29C1] text-white"
              }
            `}
          >
            <LuCalendarDays size={20} className="text-[#E7EBFE]" />
            <span className="text-[14px] leading-[150%]">Calendário</span>
          </button>
        </div>
      </div>
    </div>
  );
};
