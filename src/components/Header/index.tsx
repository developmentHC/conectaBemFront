"use client";

import { useMenuData } from "@/libs/getMenuData";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MenuIcon, CloseIcon, SearchIcon, ChevronDownIcon } from "@/assets/icons/";
import { ProfileMenu } from "./ProfileMenu";
import { MobileMenu } from "./MobileMenu";
import Link from "next/link";
import { Button } from "@mui/material";
import { useUserStore } from "@/stores/userSessionStore";
import { MenuItem } from "./types";
import { MdMailOutline } from "react-icons/md";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { isAuthenticated, userType } = useUserStore();
  const [profileMenuItemsState, setProfileMenuItemsState] = useState<MenuItem>();
  const { data: menuData = [] } = useMenuData();

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
      <header className="flex items-center text-blue-600 lg:bg-white w-full px-8 lg:py-2 pt-6">
        <div className="flex items-center justify-between w-full lg:pt-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            className="lg:hidden relative h-8 w-12 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <CloseIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 fill-[#3858F4] transition-transform duration-300" />
            ) : (
              <MenuIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 fill-[#3858F4] transition-transform duration-300" />
            )}
          </button>

          <div className="w-full lg:justify-normal justify-center items-center flex">
            <Image className="hidden lg:block" src="/images/logo.svg" alt="logo" width={80} height={80} />
            <Image className="block lg:hidden" src="/images/logo.svg" alt="logo" width={60} height={37} />
          </div>
        </div>

        {isMounted && (
          <ul className="gap-8 relative whitespace-nowrap mr-8 hidden lg:flex">
            {menuData.map((item, index) => {
              if (item.onlyonmobile) return null;
              if (item.menuitemtext === "Perfil") return null;

              const shouldShowItem =
                (userType === "patient" && item.showtopatientusers) ||
                (userType === "professional" && item.showtoprofessionalusers) ||
                (userType === null && item.showtounsignedusers);

              if (!shouldShowItem) return null;
              return (
                <li
                  key={`menu-item-${item.menuitemtext}-${index}`}
                  className="relative group"
                  onMouseEnter={!item.menuitemlink.url ? () => setHoveredItem(index) : undefined}
                  onMouseLeave={!item.menuitemlink.url ? () => setHoveredItem(null) : undefined}
                >
                  <button className="text-secondary font-semibold flex items-center gap-2">
                    {item.menuitemlink.url ? (
                      <Link href={item.menuitemlink.url || "#"}>{item.menuitemtext}</Link>
                    ) : (
                      <>
                        {item.menuitemtext}
                        <ChevronDownIcon className="w-4 h-4 fill-[#1D1B20] transition-transform" />
                      </>
                    )}
                  </button>

                  {hoveredItem === index && (
                    <div className="absolute top-full left-0 w-48 bg-white ring-1 ring-black ring-opacity-5 rounded-lg shadow-lg py-2 z-50 whitespace-normal animate-fade-in">
                      <ul className="space-y-2">
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={`submenu-item-${subItem.text}-${subIndex}`}>
                            <Link
                              href={subItem.link || "#"}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#3858F4] transition-colors"
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

        <div className="space-x-4 flex justify-center items-center">
          <button type="submit" className="border-[#253E99] border rounded-full hidden lg:block">
            <SearchIcon className="fill-[#000] h-10 w-10 p-2" />
          </button>
          {isAuthenticated ? (
            <>
              <div className="cursor-pointer">
                <MdMailOutline
                  className="text-2xl"
                  style={{
                    color: "#3857F4",
                  }}
                />
              </div>
              <ProfileMenu items={profileMenuItemsState} />
            </>
          ) : (
            <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="contained" color="primary" size="medium">
                Entrar
              </Button>
            </Link>
          )}
        </div>
      </header>

      {isMobileMenuOpen && <MobileMenu menuData={menuData} onClose={() => setIsMobileMenuOpen(false)} />}
    </div>
  );
};
