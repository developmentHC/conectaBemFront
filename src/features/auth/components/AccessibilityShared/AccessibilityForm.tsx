"use client";
import { useId } from "react";
import { SelectableTag } from "@/components/SelectableTag";
import { Button } from "@mui/material";

export type AccessibilityFormProps = Readonly<{
  options: readonly string[];
  selected: readonly string[];
  onToggleOption: (value: string) => void;
  expanded: boolean;
  onToggleExpand: () => void;
  onSkip: () => void;
  onContinue: () => void;
  continueDisabled?: boolean;
}>;

export function AccessibilityForm({
  options,
  selected,
  onToggleOption,
  expanded,
  onToggleExpand,
  onSkip,
  onContinue,
  continueDisabled,
}: AccessibilityFormProps) {
  const listId = useId();
  const visible = expanded ? options : options.slice(0, 8);

  return (
    <div className="flex flex-col gap-8">
      <ul id={listId} className="flex flex-wrap gap-2">
        {visible.map((opt) => (
          <SelectableTag
            key={opt}
            active={selected.includes(opt)}
            onClick={() => onToggleOption(opt)}
          >
            {opt}
          </SelectableTag>
        ))}

        <div className="flex justify-end w-full">
          <button
            type="button"
            onClick={onToggleExpand}
            className="cursor-pointer w-fit text-end text-gray-600 mt-4"
            aria-expanded={expanded}
            aria-controls={listId}
          >
            {expanded ? "+ Ver menos" : "+ Ver mais"}
          </button>
        </div>
      </ul>

      <div className="flex gap-2 flex-col-reverse">
        <Button
          className="w-full"
          sx={{ padding: "12px 0", borderRadius: "8px" }}
          variant="outlined"
          type="button"
          onClick={onSkip}
        >
          Pular
        </Button>
        <Button
          className="w-full"
          sx={{ padding: "12px 0", borderRadius: "8px" }}
          variant="contained"
          type="button"
          onClick={onContinue}
          disabled={!!continueDisabled}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
