"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MdNotificationsNone } from "react-icons/md";
import { ChevronDownIcon, CloseIcon, MenuIcon, SearchIcon } from "@/assets/icons/";
import { useMenuData } from "@/libs/getMenuData";
import { ArrowLeftIcon } from "../../../public/images/icons/ArrowLeftIcon";
import { MobileMenu } from "./MobileMenu";
import { ProfileMenu } from "./ProfileMenu";
import type { MenuItem } from "./types";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [profileMenuItemsState, setProfileMenuItemsState] = useState<MenuItem>();
  const { data: session, status } = useSession();
  const { data: menuData = [] } = useMenuData();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const profileMenuItems = menuData.find((item) => item.menuitemtext === "Perfil");
    setProfileMenuItemsState(profileMenuItems);
  }, [menuData]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="">
      <header className="flex w-full items-center border-gray-300 px-12 pt-6 text-blue-600 lg:border-b lg:bg-background lg:py-6">
        <div className="flex w-full items-center justify-between gap-4 lg:pt-2">
          {pathname !== "/" && (
            <button
              type="button"
              className="h-8 w-12 lg:hidden"
              onClick={() => router.back()}
              aria-label="Voltar"
            >
              <ArrowLeftIcon className="h-6 w-6 text-[#1D1B20]" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            className="relative h-8 w-12 focus:outline-none lg:hidden"
          >
            {isMobileMenuOpen ? (
              <CloseIcon className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-6 w-6 fill-[#1D1B20] transition-transform duration-300" />
            ) : (
              <MenuIcon className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-6 w-6 fill-[#1D1B20] transition-transform duration-300" />
            )}
          </button>

          <div className="flex w-full items-center justify-center lg:justify-normal">
            <Image
              className="hidden cursor-pointer lg:block"
              src="/images/logo.svg"
              alt="logo"
              width={60}
              height={60}
              onClick={() => router.push("/")}
            />
            <Image
              className="block cursor-pointer lg:hidden"
              src="/images/logo.svg"
              alt="logo"
              width={60}
              height={37}
              onClick={() => router.push("/")}
            />
          </div>
        </div>

        {isMounted && (
          <ul className="relative mr-8 hidden gap-8 whitespace-nowrap lg:flex">
            {status !== "authenticated" && (
              <li className="group relative">
                <Link
                  href="/auth/registro-profissional"
                  className="font-semibold text-secondary-900"
                >
                  Quero ser um profissional
                </Link>
              </li>
            )}

            {menuData.map((item, index) => {
              if (item.onlyonmobile) return null;
              if (item.menuitemtext === "Perfil") return null;

              const shouldShowItem =
                (session?.user?.type === "patient" && item.showtopatientusers) ||
                (session?.user?.type === "professional" && item.showtoprofessionalusers) ||
                (session?.user?.type === undefined && item.showtounsignedusers);

              if (!shouldShowItem) return null;
              return (
                <li
                  key={`menu-item-${item.menuitemtext}-${index}`}
                  className="group relative"
                  onMouseEnter={!item.menuitemlink.url ? () => setHoveredItem(index) : undefined}
                  onMouseLeave={!item.menuitemlink.url ? () => setHoveredItem(null) : undefined}
                >
                  <button
                    type="button"
                    className="flex items-center gap-2 font-semibold text-secondary-900"
                  >
                    {item.menuitemlink.url ? (
                      <Link href={item.menuitemlink.url || "#"}>{item.menuitemtext}</Link>
                    ) : (
                      <>
                        {item.menuitemtext}
                        <ChevronDownIcon className="h-4 w-4 text-[#9790A2] transition-transform" />
                      </>
                    )}
                  </button>

                  {hoveredItem === index && (
                    <div className="absolute top-full left-0 z-50 w-48 animate-fade-in whitespace-normal rounded-lg bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                      <ul className="space-y-2">
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={`submenu-item-${subItem.text}-${subIndex}`}>
                            <Link
                              href={subItem.link || "#"}
                              className="block px-4 py-2 text-gray-700 text-sm transition-colors hover:bg-gray-100 hover:text-[#3858F4]"
                            >
                              {subItem.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <div className="flex items-center justify-center space-x-4">
          <button
            type="submit"
            className="hidden lg:block"
            aria-label="Buscar"
            onClick={() => router.push("/search")}
          >
            <SearchIcon className="h-10 w-10 fill-[#1D1B20] p-2" />
          </button>
          {status === "authenticated" ? (
            <>
              <div className="cursor-pointer">
                <MdNotificationsNone
                  className="text-2xl"
                  style={{
                    color: "#3857F4",
                  }}
                />
              </div>
              <ProfileMenu items={profileMenuItemsState} />
            </>
          ) : (
            /* adicionei essa um evento e uma classe para que o link n apareça e n possa ser clicado nas telas de cadastro */
            <Link
              href="/auth"
              aria-label="Entrar"
              onClick={(e) => {
                if (pathname.startsWith("/auth")) e.preventDefault();
                setIsMobileMenuOpen(false);
              }}
              className={pathname.startsWith("/auth") ? "opacity-0 lg:hidden" : ""}
            >
              <Button variant="contained" color="primary" size="medium">
                Entrar
              </Button>
            </Link>
          )}
        </div>
      </header>

      {isMobileMenuOpen && (
        <MobileMenu menuData={menuData} onClose={() => setIsMobileMenuOpen(false)} />
      )}
    </div>
  );
};
