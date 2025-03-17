"use client";

import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { ModalFilter } from "./ModalFilter";
import { useState } from "react";

export const FilterSearch = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex bg-blue-600 text-button w-full max-w-[4.5rem] h-[42px] text-sm rounded-lg items-center justify-center gap-2 cursor-pointer"
      >
        <span>Filtros</span>
        <HiAdjustmentsHorizontal />
      </div>
      <ModalFilter open={open} onClose={() => setOpen(false)} />
    </>
  );
};
