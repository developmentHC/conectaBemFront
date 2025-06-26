"use client";

<<<<<<<< HEAD:src/components/CodeInput/index.tsx
import React, { useEffect, useRef, useState } from "react";
import { CodeInputProps } from "./types";
========
import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

type CodeInputProps = {
  value: (string | null)[];
  onChange?: (value: (string | null)[]) => void;
  onComplete?: (value: (string | null)[]) => void;
};
>>>>>>>> registro-paciente:src/components/CodeInput/CodeInput.tsx

export type CodeInputHandle = {
  focusOnFirstInput: () => void;
};

export const CodeInput = forwardRef<CodeInputHandle, CodeInputProps>(({ value, onChange, onComplete }, ref) => {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useImperativeHandle(
    ref,
    () => ({
      focusOnFirstInput: () => {
        refs.current[0]?.focus();
      },
    }),
    []
  );

  useEffect(() => {
    const isCompleted = value.every((item) => item);

    if (isCompleted) {
      onComplete?.(value);
    }
  }, [value, onComplete]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let formatedValue = e.target.value;

    formatedValue = formatedValue.replace(/\D/g, "").slice(-1);

    const newValue = [...value.slice(0, index), formatedValue, ...value.slice(index + 1)];

    onChange?.(newValue);

    refs.current[index + 1]?.focus();
  };

  const handleClick = (index: number) => {
    const input = refs.current[index];

    if (!input) return;

    setTimeout(() => {
      input.type = "text";
      input?.setSelectionRange(input.value.length, input.value.length);
      input.type = "number";
    }, 0);
  };

  return (
    <div className="flex w-full gap-4 text-center">
      {Array.from({ length: value.length }).map((_, index) => (
        <input
          onClick={() => handleClick(index)}
          onChange={(e) => handleChange(e, index)}
          ref={(ref) => {
            refs.current[index] = ref;
          }}
          value={value[index] || ""}
          key={index}
          className="px-2 py-6 rounded-lg w-full text-center border-2 border-input-code-border focus:outline-blue-600 text-inputCodeText font-bold transition-all"
          type="number"
        />
      ))}
    </div>
  );
});

CodeInput.displayName = "CodeInput";
