"use client";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef } from "react";
import "dayjs/locale/pt-br";
import { LuCalendarDays, LuChevronLeft, LuChevronRight } from "react-icons/lu";

dayjs.locale("pt-br");

export const AppointmentDateTags = ({
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
    <div className="relative w-full">
      {/* setas mobile */}
      <button
        type="button"
        onClick={() => handleScroll("left")}
        className="-translate-y-1/2 absolute top-1/2 left-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow md:hidden"
      >
        <LuChevronLeft className="text-[#253E99]" />
      </button>
      <button
        type="button"
        onClick={() => handleScroll("right")}
        className="-translate-y-1/2 absolute top-1/2 right-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow md:hidden"
      >
        <LuChevronRight className="text-[#253E99]" />
      </button>

      <div className="mt-2 w-full overflow-hidden rounded-lg border border-[#E7EBFE]">
        <div ref={scrollRef} className="hide-scrollbar flex overflow-x-auto md:overflow-visible">
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
                className={`flex h-[72px] w-[110px] flex-shrink-0 flex-col items-center justify-center gap-1 border-[#E7EBFE] border-r text-center transition-all duration-150 md:w-auto md:flex-1 md:flex-shrink ${isSelected ? "bg-[#3857F4] text-white" : "bg-white text-[#19171C]"}
                  ${index === days.length - 1 ? "md:border-r-0" : ""}
                `}
              >
                <span className="font-bold text-[16px] leading-[150%]">{labelTop(d)}</span>
                <span className="text-[14px] capitalize leading-[150%]">{labelBottom(d)}</span>
              </button>
            );
          })}

          {/* Botão Calendário */}
          <button
            type="button"
            onClick={() => setShowCalendar(!showCalendar)}
            className={`flex h-[72px] w-[120px] flex-shrink-0 flex-col items-center justify-center gap-2 border-[#E7EBFE] border-l md:w-auto md:flex-1 md:flex-shrink ${showCalendar ? "bg-[#0B29C1] text-white" : "bg-[#0B29C1] text-white"}
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
