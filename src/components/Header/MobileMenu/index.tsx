import { Divider } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { ChevronRightIcon, HelpIcon, SearchIcon } from "@/assets/icons";
import type { MenuItem } from "../types";

interface MobileMenuProps {
  menuData: MenuItem[];
  onClose: () => void;
}

export const MobileMenu = ({ menuData, onClose }: MobileMenuProps) => {
  const { data: session, status } = useSession();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const handleSubmitSearchBar = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de busca aqui
  };

  const toggleItem = (itemText: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      newSet[newSet.has(itemText) ? "delete" : "add"](itemText);
      return newSet;
    });
  };

  const renderableMenuItems = menuData.filter((item) => {
    const shouldShowItem =
      (session?.user?.type === "patient" && item.showtopatientusers) ||
      (session?.user?.type === "professional" && item.showtoprofessionalusers) ||
      (session?.user?.type === undefined && item.showtounsignedusers);
    return shouldShowItem;
  });

  return (
    <nav className="relative flex h-[100dvh] flex-col bg-default p-6">
      <div className="hide-scrollbar flex-1 overflow-y-auto pb-24">
        <form
          onSubmit={handleSubmitSearchBar}
          className="mb-4 flex rounded-xl border border-[#3857F4] p-1"
        >
          <input
            className="w-full appearance-none border-none bg-transparent pr-6 pl-4 outline-none focus:border-none focus:ring-0"
            placeholder="Buscar profissionais e áreas"
            type="text"
            name="search"
            id="search"
          />
          <button type="submit" className="rounded-full bg-[rgb(56,88,244)]">
            <SearchIcon className="h-10 w-10 fill-[#D7FF7B] p-2" />
          </button>
        </form>
        <div className="mb-20">
          {renderableMenuItems.map((item, index) => {
            return (
              <div key={`menu-item-${item.menuitemtext}-${index}`}>
                <div className="py-4">
                  <button
                    className="flex w-full items-center justify-between"
                    onClick={
                      !item.menuitemlink.url ? () => toggleItem(item.menuitemtext) : undefined
                    }
                  >
                    {!item.menuitemlink.url ? (
                      <h3 className="font-normal text-base text-black">{item.menuitemtext}</h3>
                    ) : (
                      <Link
                        className="font-normal text-base text-black"
                        href={item.menuitemlink.url || "#"}
                      >
                        {item.menuitemtext}
                      </Link>
                    )}
                    <ChevronRightIcon
                      className={`h-5 w-5 transition-transform duration-200 ${
                        openItems.has(item.menuitemtext) ? "-rotate-90" : ""
                      }`}
                    />
                  </button>

                  {item.submenu && openItems.has(item.menuitemtext) && (
                    <ul className="mt-4 space-y-3 pl-5">
                      {item.submenu.map((subItem) => {
                        const shouldShowItem =
                          (session?.user?.type === "patient" &&
                            subItem.showtowhichusertype === "patient") ||
                          subItem.showtowhichusertype === null ||
                          (session?.user?.type === "professional" &&
                            subItem.showtowhichusertype === "professional") ||
                          subItem.showtowhichusertype === null;

                        if (!shouldShowItem) return null;

                        return (
                          <li key={subItem.text}>
                            {subItem.link ? (
                              <a
                                href={subItem.link}
                                className={clsx(
                                  "block py-1 text-black text-sm transition-colors",
                                  subItem.text === "Excluir Conta" && "!text-alert",
                                )}
                                onClick={onClose}
                              >
                                {subItem.text}
                              </a>
                            ) : (
                              <span className="py-1 text-black text-sm">{subItem.text}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                {index === 0 && <Divider sx={{ margin: "1rem 0" }} />}
                {item.menuitemtext === "Quero Ser Um Profissional" && (
                  <Divider sx={{ margin: "1rem 0" }} />
                )}
              </div>
            );
          })}
          {status === "authenticated" && (
            <>
              <Divider sx={{ margin: "1rem 0" }} />
              <div>
                <button
                  className="flex w-full items-center justify-between py-4"
                  onClick={() => signOut({ redirect: false })}
                >
                  Sair
                  <ChevronRightIcon className="h-5 w-5 transition-transform duration-200" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {status === "authenticated" && (
        <div className="fixed right-0 bottom-0 left-0 bg-default px-4 pt-4 pb-12 shadow-lg">
          <div className="mb-5 flex justify-end space-x-2">
            <HelpIcon className="fill-[#77737B]" height={24} width={24} />
          </div>
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-base ${session?.user?.type === "patient" ? "font-regular text-[#1D1B20]" : "text-[#9790A2]"}`}
            >
              Paciente
            </span>

            <button
              role="switch"
              aria-checked={session?.user?.type === "professional"}
              className="relative inline-flex h-3.5 w-9 items-center rounded-full bg-[#B3BFFB] transition-colors"
            >
              <span
                className={`absolute left-0 inline-block h-5 w-5 transform rounded-full bg-[#0B29C1] shadow-lg transition-all duration-300 ${
                  session?.user?.type === "patient" ? "translate-x-0" : "translate-x-4"
                }`}
              />
            </button>

            <span
              className={`text-base ${session?.user?.type === "professional" ? "font-regular text-[#1D1B20]" : "text-[#9790A2]"}`}
            >
              Profissional
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};
