"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePatientRegisterStore } from "../usePatientRegisterStore";
import { AccessibilityForm } from "../../AcessibilityShared/AcessibilityForm";

const accessibilityMock = ["Piso tátil","Atendimento em libras","Audiodescrição","Corrimão","Rampas"];
const schema = z.object({ accessibility: z.array(z.string()) });
type Data = z.infer<typeof schema>;

export const AccessibilityStep = () => {
  const { setValue, handleSubmit, watch, getValues } = useForm<Data>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: { accessibility: [] },
  });

  const { changeStep, updateFields } = usePatientRegisterStore();
  const [expanded, setExpanded] = useState(false);
  const selected = watch("accessibility");

  const toggleOption = (value: string) => {
    const cur = getValues("accessibility");
    const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
    setValue("accessibility", next, { shouldValidate: true });
  };

  const onContinue = handleSubmit((data) => {
    updateFields({ ...(data as any), skippedAccessibility: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
    changeStep("complete_profile");
  });

  const onSkip = () => {
    updateFields({ skippedAccessibility: true, accessibility: undefined });
    window.scrollTo({ top: 0, behavior: "smooth" });
    changeStep("complete_profile");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-8">
      <AccessibilityForm
        options={accessibilityMock}
        selected={selected}
        onToggleOption={toggleOption}
        expanded={expanded}
        onToggleExpand={() => setExpanded((p) => !p)}
        onSkip={onSkip}
        onContinue={onContinue}
      />
    </form>
  );
};
