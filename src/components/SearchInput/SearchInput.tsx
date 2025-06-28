"use client";
import { SearchIcon } from "../../../public/images/icons";
import { useSearchStore } from "@/stores/searchStore";
import { useState } from "react";

export const SearchInput = () => {
  const { setQuery } = useSearchStore();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(inputValue);
  };

  return (
    <div className="flex lg:items-center lg:justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between w-full h-full border border-blue-600 rounded-xl lg:max-w-[450px]"
      >
        <input
          className="bg-transparent w-full placeholder:text-base placeholder:text-gray-500 p-4 outline-none"
          type="text"
          placeholder="Buscar profissionais e áreas"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="px-2">
          <button type="submit" className="bg-[rgb(56,88,244)] rounded-full">
            <SearchIcon className="fill-[#D7FF7B] h-10 w-10 p-2" />
          </button>
        </div>
      </form>
    </div>
  );
};
