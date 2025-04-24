'use client'

import { getMenuData } from '@/libs/getMenuData';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MenuIcon, CloseIcon, SearchIcon, ChevronDownIcon } from '../../../public/images/icons/index';
import { ProfileMenu } from './ProfileMenu';
import { MobileMenu } from './MobileMenu';
import Link from 'next/link';
import { ModalChangeAccountType } from '../ModalChangeAccountType';
import { Button } from '@mui/material';

interface DesktopItems {
  menuitemtext: string;
  submenu: Array<{
    text: string;
    link: string | null;
  }>;
}

export const Header = () => {
  const [menuData, setMenuData] = useState<DesktopItems[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [changeAccountTypeOpen, setChangeAccountTypeOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [userExists, setUserExists] = useState<string | null>(null);

  useEffect(() => {
    const verifyUser = async () => {
      const userExists = localStorage.getItem("userId");
      setUserExists(userExists);
    };

    verifyUser();
  }, [])

  useEffect(() => {
    setIsMounted(true);
    const fetchMenuData = async () => {
      const data = await getMenuData();
      setMenuData(data);
    };
    fetchMenuData();
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isMobileMenuOpen])

  if (!isMounted) return null;

  return (
    <div className="">
      <header className="flex items-center text-blue-600 lg:bg-white w-full px-8 lg:py-2 pt-6">
        <div className="flex items-center justify-between w-full lg:pt-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
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

        <ul className="gap-8 relative whitespace-nowrap mr-8 hidden lg:flex">
          {menuData.map((item, index) => (
            <li
              key={item.menuitemtext}
              className="relative group"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <button className="text-[#1D1B20] flex items-center gap-2">
                {item.menuitemtext}
                <ChevronDownIcon className={`w-4 h-4 fill-[#1D1B20] transition-transform`} />
              </button>

              {hoveredItem === index && (
                <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg py-2 z-50 whitespace-normal">
                  <ul className="space-y-2">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subItem.link || '#'}
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
          ))}
        </ul>

        <div className="space-x-4 flex">
          <button type="submit" className="border-[#253E99] border rounded-full hidden lg:block">
            <SearchIcon className="fill-[#000] h-10 w-10 p-2" />
          </button>
          {/* {menuData
            ?.filter(item => item.menuitemtext === "Perfil")
            ?.map((perfilItem) => (
              <ProfileMenu
                key={perfilItem.menuitemtext}
                data={perfilItem}
              />
            ))} */}

          {userExists
            ? (
              <ProfileMenu
                setChangeAccountTypeOpen={setChangeAccountTypeOpen}
                onClose={() => setChangeAccountTypeOpen(false)}
              />
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="large">
                Entrar
              </Button>
            )
          }
        </div>
      </header>

      {isMobileMenuOpen && (
        <MobileMenu
          menuData={menuData}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}

      {changeAccountTypeOpen && (
        <ModalChangeAccountType
          setChangeAccountTypeOpen={setChangeAccountTypeOpen}
        />
      )}

    </div>
  );
};