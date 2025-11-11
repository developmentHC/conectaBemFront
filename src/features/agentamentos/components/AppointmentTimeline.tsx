"use client";
import { useEffect, useMemo, useState } from "react";
import { AppointmentCard } from "./AppointmentCard";
import type { IAppointment } from "@/types/appointment";

const BASE_TIMES = [
  "08:00",
  "09:00",
  "10:00",
  "10:30",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export function AppointmentTimeline({ appointments }: { appointments: IAppointment[] }) {

  const timesSet = useMemo(() => {
    const s = new Set(BASE_TIMES);
    appointments.forEach((a) => {
      if (a.time) s.add(a.time);
    });
    return s;
  }, [appointments]);

  const TIMES = useMemo(() => Array.from(timesSet).sort(), [timesSet]);

  const byTime: Record<string, IAppointment[]> = useMemo(() => {
    const obj: Record<string, IAppointment[]> = {};
    TIMES.forEach((t) => {
      obj[t] = [];
    });
    appointments.forEach((a) => {
      const t = a.time && timesSet.has(a.time) ? a.time : TIMES[0];
      obj[t].push(a);
    });
    return obj;
  }, [appointments, TIMES, timesSet]);

  const [activeTime, setActiveTime] = useState<string | null>(null);

  useEffect(() => {
    setActiveTime(null);
  }, []);

  return (
    <section className="w-full max-w-[929px] mx-auto relative">
      {/* linha vertical azul - desktop */}
      <div
        className="hidden md:block absolute left-[72px] top-0 bottom-0 w-[2px] bg-[#0B29C1]"
        aria-hidden
      />

      <div className="flex flex-col gap-4">
        {TIMES.map((time) => {
          const items = byTime[time] || [];
          const hasItems = items.length > 0;

          return (
            <div
              key={time}
              className="relative flex gap-4 min-h-[90px]"
            >
              {/* coluna da hora */}
              <div className="w-[60px] flex justify-end pt-2 pr-2">
                <span
                  className={`text-[16px] md:text-[18px] font-semibold transition-colors duration-150 ${activeTime === time ? "text-[#0B29C1]" : "text-[#6B6B6B]"
                    }`}
                >
                  {time}
                </span>
              </div>

              {/* bolinha */}
              <div className="relative w-[24px] flex justify-center">
                {/* linha vertical azul no mobile (fica atrás da bolinha) */}
                <span className="md:hidden absolute left-1 top-0 bottom-0 w-[2px] bg-[#0B29C1]"></span>

                <span
                  className={`w-[12px] h-[12px] rounded-full translate-x-[8px] mt-[10px] z-10 transition-all duration-200 ${activeTime === time ? "bg-[#0B29C1] scale-110" : "bg-[#9790A2] scale-100"
                    }`}
                />
              </div>

              {/* cards */}
              <div className="flex-1 flex flex-col gap-4 pb-2 items-stretch">
                {hasItems ? (
                  items.map((appt) => (
                    <button
                      key={appt.id}
                      type="button"
                      onClick={() => setActiveTime(time)}
                      className="text-left w-full"
                    >
                      {/* no mobile o card vai ocupar 100% mesmo */}
                      <div className="w-full">
                        <AppointmentCard appointment={appt} />
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="h-[10px]" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AppointmentTimeline;
