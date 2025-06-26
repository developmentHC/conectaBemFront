"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import clsx from "clsx";
import { ChevronRightIcon } from "@/assets/icons";
import { useUserStore } from "@/stores/userSessionStore";
import { ProfileMenuProps } from "./types";

export const ProfileMenu = (props: ProfileMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { userType, profilePhoto, clearSession } = useUserStore();

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
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 hover:text-blue-700 transition-colors aspect-square h-[40px] w-[40px]"
        aria-expanded={isOpen}
        aria-label="Menu do perfil"
      >
        {profilePhoto ? (
          <Image
            src={profilePhoto}
            alt=""
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center rounded-full"
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
          "absolute right-0 top-0 mt-12 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all",
          {
            "opacity-100 visible translate-y-0": isOpen,
            "opacity-0 invisible -translate-y-2": !isOpen,
          }
        )}
      >
        <ul>
          {props.items?.submenu.map((item, index) => {
            const shouldShowItem =
              (userType === "patient" && item.showtowhichusertype === "patient") ||
              (userType === "professional" && item.showtowhichusertype === "professional");

            if (!shouldShowItem) return null;

            return (
              <li key={index}>
                <Link
                  href={item.link || `#`}
                  className="flex justify-between p-3 text-sm text-secondary hover:bg-gray-100 items-center"
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
              className="flex justify-between p-3 text-sm text-secondary hover:bg-gray-100 items-center"
              onClick={() => clearSession()}
            >
              Sair
              <ChevronRightIcon className="fill-secondary" height={24} width={24} />
            </Link>
          </li>
          <div className="border-t border-t-black-600 mx-3 hidden lg:block" />
          <li>
            <Link
              href="#"
              className="flex justify-between p-3 text-sm text-alert hover:bg-gray-100 items-center"
              onClick={() => setIsOpen(false)}
            >
              Excluir conta
              <ChevronRightIcon className="text-secondary" height={24} width={24} />
            </Link>
          </li>
          <div className="border-t border-t-black-600 mx-3 hidden lg:block" />
          <li className="hidden lg:block">
            <Link
              href="#"
              className="block p-3 text-sm text-[#3857F4] hover:bg-gray-100 items-center"
              onClick={() => setIsOpen(false)}
            >
              Trocar para Perfil {userType === "professional" ? "de Cliente" : "Profissional"}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
