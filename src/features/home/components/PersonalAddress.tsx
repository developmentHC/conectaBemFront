"use client"

import Link from "next/link";
import { MdOutlineEdit } from "react-icons/md";
import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useUserPatient } from "../hooks/useUserPatient";
import { useUserStore } from "@/stores/userSessionStore";

const ANON_ADDRESS_KEY = "home:search-address";

export const PersonalAddress = () => {
  const { isAuthenticated } = useUserStore();
  const { data: patient } = useUserPatient();
  const [inputValue, setInputValue] = useState("");
  const [searchAddress, setSearchAddress] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isAuthenticated) {
      const storedAddress = window.localStorage.getItem(ANON_ADDRESS_KEY);
      if (storedAddress) {
        setSearchAddress(storedAddress);
        setInputValue(storedAddress);
      }
      return;
    }

    
    window.localStorage.removeItem(ANON_ADDRESS_KEY);
    setSearchAddress(null);
    setInputValue("");
  }, [isAuthenticated]);

  const registeredAddress = useMemo(() => {
    if (!patient || !patient.enderecoResidencial) return null;
    const parts = [patient.enderecoResidencial];

    if (patient.complementoResidencial) {
      parts.push(patient.complementoResidencial);
    }

    if (patient.cepResidencial) {
      parts.push(`CEP ${patient.cepResidencial}`);
    }

    return parts.join(" • ");
  }, [patient]);

  const handleSearch = useCallback(() => {
    if (typeof window === "undefined") return;
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (isAuthenticated) {
      window.localStorage.setItem(ANON_ADDRESS_KEY, trimmed);
    }
    setSearchAddress(trimmed);
    setIsEditing(false);
  }, [inputValue, isAuthenticated]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSearch();
      }
    },
    [handleSearch]
  );

  const focusAddressInput = useCallback(() => {
    setIsEditing(true);
  }, []);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const headline = isAuthenticated
    ? registeredAddress ?? "Atualize seu endereço para personalizar os resultados"
    : searchAddress ?? "Digite seu endereço para encontrar profissionais próximos";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2 text-lg font-semibold text-gray-900">
        {isAuthenticated ? (
          <span>{headline}</span>
        ) : isEditing ? (
          <input
            ref={inputRef}
            className="min-w-[260px] max-w-[520px] bg-transparent text-base font-semibold text-gray-900 outline-none placeholder:text-gray-500"
            type="text"
            placeholder="Digite seu endereço para encontrar profissionais próximos"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Digite seu endereço"
          />
        ) : (
          <span>{headline}</span>
        )}
        {isAuthenticated ? (
          <Link href="/address" className="text-secondary-500">
            <MdOutlineEdit className="text-xl" aria-label="Editar endereço" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={focusAddressInput}
            className="rounded-full p-1 text-secondary-500 hover:bg-[#F2F4FF]"
            aria-label="Focar no campo de endereço"
          >
            <MdOutlineEdit className="text-xl" />
          </button>
        )}
      </div>
    </div>
  );
};