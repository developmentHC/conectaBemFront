"use client";

import React, { ChangeEvent, useState } from "react";
import { GrSearch } from "react-icons/gr";

type Size = "sm" | "md" | "lg";

type Props = {
  placeholder?: string;
  size?: Size;
  /** Controle opcional */
  value?: string;
  onChange?: (value: string) => void;
  className?: string;          // opcional para estilizar o wrapper externo
  inputClassName?: string;     // opcional para estilizar o input
};

const sizeMap: Record<Size, { wrapper: string; iconBox: string; input: string; gapX: string }> = {
  sm: { wrapper: "h-9",  iconBox: "h-8 w-8",  input: "text-sm placeholder:text-sm p-2",  gapX: "px-1.5" },
  md: { wrapper: "h-12", iconBox: "h-10 w-10", input: "text-base placeholder:text-base p-4", gapX: "px-2"   },
  lg: { wrapper: "h-14", iconBox: "h-12 w-12", input: "text-lg placeholder:text-lg p-4",  gapX: "px-2.5" },
};

export const SearchInput: React.FC<Props> = ({
  placeholder = "Buscar profissionais e áreas",
  size = "md",
  value,
  onChange,
  className = "",
  inputClassName = "",
}) => {
  const [inner, setInner] = useState("");

  const current = value ?? inner;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (value === undefined) setInner(v);
    onChange?.(v);
  };

  return (
    <div className={`flex lg:items-center lg:justify-center ${className}`}>
      <div className={[
          "flex items-center w-full border border-[#253E99] rounded-md",
          sizeMap[size].wrapper,
        ].join(" ")}
      >
        <div className={`${sizeMap[size].gapX} px-2 flex-shrink-0`}>

          <div className={`${sizeMap[size].iconBox} rounded-full flex items-center `} aria-hidden="true">
            <GrSearch className="text-[#9790A2] text-2xl" />
          </div>
        </div>

        <input
          className={[
            "flex-1 bg-transparent w-full outline-none placeholder:text-gray-500",
            sizeMap[size].input,
            inputClassName,
          ].join(" ")}
          type="text"
          placeholder={placeholder}
          value={current}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
