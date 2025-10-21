"use client";

import { AppointmentDateTags } from "@/features/agentamentos/components/AppointmentDateTags";
import { AppointmentsSection } from "@/features/agentamentos/components/AppointmentsSection";
import AppointmentStatusTabs from "@/features/agentamentos/components/AppointmentStatusTabs";
import { useState } from "react";

export default function AppointmentsPage() {
  const [tabValue, setTabValue] = useState<string>("a_realizar");
  return (
    <main className="w-full flex flex-col gap-6 justify-start overflow-hidden">
      <section className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Meus Agendamentos</h1>
      </section>
      <section className="flex flex-col gap-3">
        <AppointmentStatusTabs tabValue={tabValue} setTabValue={setTabValue} />
        <AppointmentDateTags tabValue={tabValue} />
      </section>
      <AppointmentsSection tabValue={tabValue} />
    </main>
  );
}
