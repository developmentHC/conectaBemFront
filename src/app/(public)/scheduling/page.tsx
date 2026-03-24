"use client";

import { useState } from "react";
import { AppointmentDateTags } from "@/features/agentamentos/components/AppointmentDateTags";
import { AppointmentsSection } from "@/features/agentamentos/components/AppointmentsSection";
import AppointmentStatusTabs from "@/features/agentamentos/components/AppointmentsStatusTabs";
import { InlineCalendar } from "@/features/agentamentos/components/InlineCalendar";

export default function AppointmentsPage() {
  const [tabValue, setTabValue] = useState<string>("a_realizar");
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  return (
    <main className="flex w-full flex-col justify-start gap-6 overflow-hidden">
      <section className="flex flex-col gap-2">
        <h1 className="font-semibold text-2xl">Meus Agendamentos</h1>
        <p>Selecione o status e a data para exibir seus agendamentos</p>
      </section>

      {/* abas + faixa de dias */}
      <section className="flex flex-col gap-3">
        <AppointmentStatusTabs tabValue={tabValue} setTabValue={setTabValue} />

        <AppointmentDateTags
          tabValue={tabValue}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
        />
      </section>

      {/* calendário aberto (igual figma) */}
      {showCalendar && (
        <section className="mx-auto w-full max-w-[929px]">
          <InlineCalendar
            selectedDate={selectedDate}
            onSelectDate={(iso) => {
              setSelectedDate(iso);
              setShowCalendar(false);
            }}
          />
        </section>
      )}

      {/* timeline filtrando por status + data */}
      <AppointmentsSection tabValue={tabValue} selectedDate={selectedDate} />
    </main>
  );
}
