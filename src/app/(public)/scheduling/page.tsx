"use client";

import { useState } from "react";
import AppointmentStatusTabs from "@/features/agentamentos/components/AppointmentStatusTabs";
import { AppointmentDateTags } from "@/features/agentamentos/components/AppointmentDateTags";
import { AppointmentsSection } from "@/features/agentamentos/components/AppointmentsSection";
import { InlineCalendar } from "@/features/agentamentos/components/InlineCalendar";

export default function AppointmentsPage() {
  const [tabValue, setTabValue] = useState<string>("a_realizar");
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  return (
    <main className="w-full flex flex-col gap-6 justify-start overflow-hidden">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Meus Agendamentos</h1>
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
        <section className="w-full max-w-[929px] mx-auto">
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
      <AppointmentsSection
        tabValue={tabValue}
        selectedDate={selectedDate}
      />
    </main>
  );
}
