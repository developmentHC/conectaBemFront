"use client";
import { useEffect, useMemo, useState } from "react";
import type { IAppointment } from "@/types/appointment";
import { AppointmentCard } from "./AppointmentProfessionalCard";

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
    <section className="relative mx-auto w-full max-w-[929px]">
      {/* linha vertical azul - desktop */}
      <div
        className="absolute top-0 bottom-0 left-[72px] hidden w-[2px] bg-[#0B29C1] md:block"
        aria-hidden
      />

      <div className="flex flex-col gap-4">
        {TIMES.map((time) => {
          const items = byTime[time] || [];
          const hasItems = items.length > 0;

          return (
            <div key={time} className="relative flex min-h-[90px] gap-4">
              {/* coluna da hora */}
              <div className="flex w-[60px] justify-end pt-2 pr-2">
                <span
                  className={`font-semibold text-[16px] transition-colors duration-150 md:text-[18px] ${
                    activeTime === time ? "text-[#0B29C1]" : "text-[#6B6B6B]"
                  }`}
                >
                  {time}
                </span>
              </div>

              {/* bolinha */}
              <div className="relative flex w-[24px] justify-center">
                {/* linha vertical azul no mobile (fica atrás da bolinha) */}
                <span className="absolute top-0 bottom-0 left-1 w-[2px] bg-[#0B29C1] md:hidden"></span>

                <span
                  className={`z-10 mt-[10px] h-[12px] w-[12px] translate-x-[8px] rounded-full transition-all duration-200 ${
                    activeTime === time ? "scale-110 bg-[#0B29C1]" : "scale-100 bg-[#9790A2]"
                  }`}
                />
              </div>

              {/* cards */}
              <div className="flex flex-1 flex-col items-stretch gap-4 pb-2">
                {hasItems ? (
                  items.map((appt) => (
                    <button
                      key={appt.id}
                      type="button"
                      onClick={() => setActiveTime(time)}
                      className="w-full text-left"
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
