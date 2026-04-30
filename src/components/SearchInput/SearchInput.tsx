"use client";

import { GrSearch } from "react-icons/gr";

type SearchInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
};

export const SearchInput = ({ value, onChange, onSearch }: SearchInputProps) => {
  return (
    <div className="flex w-full md:items-center md:justify-center">
      <div className="flex h-12 w-full max-w-[850px] items-center gap-2 self-stretch rounded-lg border border-secondary-500 bg-white px-2">
        <button
          type="button"
          aria-label="Buscar"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
          onClick={() => onSearch?.(value ?? "")}
        >
          <GrSearch className="text-2xl text-black-400" />
        </button>
        <input
          className="h-full w-full bg-transparent px-2 outline-none placeholder:text-base placeholder:text-gray-500 md:placeholder:text-lg"
          type="text"
          placeholder="Buscar profissionais e áreas"
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch?.(value ?? "");
          }}
        />
      </div>
    </div>
  );
};
