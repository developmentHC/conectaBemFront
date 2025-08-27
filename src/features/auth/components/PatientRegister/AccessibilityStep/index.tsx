import { useState } from "react";
import { usePatientRegisterStore } from "../usePatientRegisterStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { SelectableTag } from "@/components/SelectableTag";

const accessibilityMock = ["Piso tátil", "Atendimento em libras", "Audiodescrição", "Corrimão", "Rampas"];

type Data = z.infer<typeof schema>;

const schema = z.object({
  accessibility: z.array(z.string()),
});

export const AccessibilityStep = () => {
  const { setValue, handleSubmit, watch, getValues } = useForm<Data>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: { accessibility: [] },
  });

  const [collapseSpecialty, setCollapseSpecialty] = useState<boolean>(false);
  const { changeStep, updateFields } = usePatientRegisterStore();

  const selectedAccessibilities = watch("accessibility");

  const visibleCollapse = collapseSpecialty ? accessibilityMock : accessibilityMock?.slice(0, 8);

  const handleClickAccessibility = (accessibility: string) => {
    let newAccessibility = getValues("accessibility");

    if (newAccessibility.includes(accessibility)) {
      newAccessibility = newAccessibility.filter((item) => item !== accessibility);
    } else {
      newAccessibility = [...newAccessibility, accessibility];
    }

    setValue("accessibility", newAccessibility, { shouldValidate: true });
  };

  const onSubmit = handleSubmit(async (data: Data) => {
    updateFields(data as any);

    window.scrollTo({ top: 0, behavior: "smooth" });

    changeStep("complete_profile");
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <ul className={`flex flex-wrap gap-2`}>
        {visibleCollapse?.map((accessibility) => (
          <SelectableTag
            onClick={() => handleClickAccessibility(accessibility)}
            key={accessibility}
            active={selectedAccessibilities.includes(accessibility)}
          >
            {accessibility}
          </SelectableTag>
        ))}

        <div className="flex justify-end w-full">
          <span
            onClick={() => setCollapseSpecialty(!collapseSpecialty)}
            className="cursor-pointer w-fit text-end text-gray-600 mt-4"
          >
            {collapseSpecialty ? "+ Ver menos" : "+ Ver mais"}
          </span>
        </div>
      </ul>

      <div className="flex gap-2 flex-col-reverse">
        <Button className="w-full" sx={{ padding: "12px 0", borderRadius: "8px" }} variant="outlined" onClick={() => changeStep("complete_profile")}>
          Pular
        </Button>
        <Button className="w-full" sx={{ padding: "12px 0", borderRadius: "8px" }} variant="contained" type="submit">
          Continuar
        </Button>
      </div>
    </form>
  );
};
