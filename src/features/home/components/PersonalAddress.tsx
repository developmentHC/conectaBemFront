"use client";

import Link from "next/link";
import { MdOutlineEdit } from "react-icons/md";

export const PersonalAddress = () => {
  return (
    <div className="flex w-fit cursor-pointer items-center justify-center gap-2 text-lg lg:justify-start">
      <span>Rua Fulaninho, 000, cidade, estado</span>
      <Link href="/address">
        <MdOutlineEdit className="text-secondary-500" />
      </Link>
    </div>
  );
};
