"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { ChevronRightIcon } from "@/assets/icons";
import type { ProfileMenuProps } from "./types";

export const ProfileMenu = (props: ProfileMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="relative z-10 hidden lg:flex" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex aspect-square h-[40px] w-[40px] items-center gap-1 transition-colors hover:text-blue-700"
        aria-expanded={isOpen}
        aria-label="Menu do perfil"
      >
        {session?.user?.image ? (
          <Image
            src={session?.user?.image}
            alt=""
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-full object-cover object-center"
            fill
          />
        ) : (
          <FaUser
            className="text-4xl"
            style={{
              backgroundColor: "#3858F4",
              padding: "5px",
              borderRadius: "50%",
              color: "white",
            }}
          />
        )}
      </button>

      <div
        className={clsx(
          "absolute top-0 right-0 mt-12 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all",
          {
            "visible translate-y-0 opacity-100": isOpen,
            "-translate-y-2 invisible opacity-0": !isOpen,
          },
        )}
      >
        <ul>
          {props.items?.submenu.map((item, index) => {
            const shouldShowItem =
              (session?.user?.type === "patient" && item.showtowhichusertype === "patient") ||
              (session?.user?.type === "professional" &&
                item.showtowhichusertype === "professional");

            if (!shouldShowItem) return null;

            return (
              <li key={index}>
                <Link
                  href={item.link || `#`}
                  className="flex items-center justify-between p-3 text-secondary-900 text-sm hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <p className="pr-4">{item.text}</p>
                  <ChevronRightIcon className="fill-secondary" height={24} width={24} />
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="#"
              className="flex items-center justify-between p-3 text-secondary text-sm hover:bg-gray-100"
              onClick={() => signOut({ redirect: false })}
            >
              Sair
              <ChevronRightIcon className="fill-secondary" height={24} width={24} />
            </Link>
          </li>
          <div className="mx-3 hidden border-t border-t-black-600 lg:block" />
          <li>
            <Link
              href="#"
              className="flex items-center justify-between p-3 text-alert text-sm hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Excluir conta
              <ChevronRightIcon className="text-secondary" height={24} width={24} />
            </Link>
          </li>
          <div className="mx-3 hidden border-t border-t-black-600 lg:block" />
          <li className="hidden lg:block">
            <Link
              href="#"
              className="block items-center p-3 text-[#3857F4] text-sm hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Trocar para Perfil{" "}
              {session?.user?.type === "professional" ? "de Cliente" : "Profissional"}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
