import { useState } from "react";
import { SearchIcon, HelpIcon, ChevronRightIcon } from "@/assets/icons";
import { MenuItem } from "../types";
import Link from "next/link";
import { Divider } from "@mui/material";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";

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
    <nav className="p-6 bg-default h-[100dvh] flex flex-col relative">
      <div className="flex-1 overflow-y-auto pb-24 hide-scrollbar">
        <form onSubmit={handleSubmitSearchBar} className="border border-[#3857F4] rounded-xl p-1 flex mb-4">
          <input
            className="bg-transparent w-full pl-4 pr-6 appearance-none outline-none border-none focus:border-none focus:ring-0"
            placeholder="Buscar profissionais e áreas"
            type="text"
            name="search"
            id="search"
          />
          <button type="submit" className="bg-[rgb(56,88,244)] rounded-full">
            <SearchIcon className="fill-[#D7FF7B] h-10 w-10 p-2" />
          </button>
        </form>
        <div className="mb-20">
          {renderableMenuItems.map((item, index) => {
            return (
              <div key={`menu-item-${item.menuitemtext}-${index}`}>
                <div className="py-4">
                  <button
                    className="w-full flex justify-between items-center"
                    onClick={!item.menuitemlink.url ? () => toggleItem(item.menuitemtext) : undefined}
                  >
                    {!item.menuitemlink.url ? (
                      <h3 className="text-black font-normal text-base">{item.menuitemtext}</h3>
                    ) : (
                      <Link className="text-black font-normal text-base" href={item.menuitemlink.url || "#"}>
                        {item.menuitemtext}
                      </Link>
                    )}
                    <ChevronRightIcon
                      className={`h-5 w-5 transition-transform duration-200 ${openItems.has(item.menuitemtext) ? "-rotate-90" : ""
                        }`}
                    />
                  </button>

                  {item.submenu && openItems.has(item.menuitemtext) && (
                    <ul className="space-y-3 pl-5 mt-4">
                      {item.submenu.map((subItem) => {
                        const shouldShowItem =
                          (session?.user?.type === "patient" && subItem.showtowhichusertype === "patient") ||
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
                                  "text-black transition-colors block py-1 text-sm",
                                  subItem.text === "Excluir Conta" && "!text-alert"
                                )}
                                onClick={onClose}
                              >
                                {subItem.text}
                              </a>
                            ) : (
                              <span className="text-black text-sm py-1">{subItem.text}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                {index === 0 && <Divider sx={{ margin: "1rem 0" }} />}
                {item.menuitemtext === "Quero Ser Um Profissional" && <Divider sx={{ margin: "1rem 0" }} />}
              </div>
            );
          })}
          {status === "authenticated" && (
            <>
              <Divider sx={{ margin: "1rem 0" }} />
              <div>
                <button
                  className="py-4 w-full flex justify-between items-center"
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
        <div className="fixed bottom-0 left-0 right-0 px-4 pt-4 pb-12 shadow-lg bg-default">
          <div className="flex space-x-2 mb-5 justify-end">
            <HelpIcon className="fill-[#77737B]" height={24} width={24} />
          </div>
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-base ${session?.user?.type === "patient" ? "text-[#1D1B20] font-regular" : "text-[#9790A2]"}`}
            >
              Paciente
            </span>

            <button
              role="switch"
              aria-checked={session?.user?.type === "professional"}
              className="relative inline-flex h-3.5 w-9 items-center rounded-full bg-[#B3BFFB] transition-colors"
            >
              <span
                className={`absolute left-0 inline-block h-5 w-5 transform rounded-full bg-[#0B29C1] shadow-lg transition-all duration-300 ${session?.user?.type === "patient" ? "translate-x-0" : "translate-x-4"
                  }`}
              />
            </button>

            <span
              className={`text-base ${session?.user?.type === "professional" ? "text-[#1D1B20] font-regular" : "text-[#9790A2]"}`}
            >
              Profissional
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};
