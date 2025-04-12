'use client';

import Image from 'next/image';
import { IoMdMenu } from 'react-icons/io';
import DesktopMenu from '../Menu/DesktopMenu';
import MobileMenu from '../Menu/MobileMenu';
import { useState } from 'react';
import { MenuItem, SubmenuItem } from '../Menu/types';
import Link from 'next/link';

interface SubMenuItemType {
  text: string;
  link: string;
  // Add other properties that exist in your submenu objects
}

interface MenuItemType {
  menuitemtext: string;
  submenu: SubMenuItemType[];
}

// Update component props type
interface HeaderProps {
  menuData: MenuItemType[];
}

export default function Header({ menuData }: HeaderProps) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  const toggleMenuItemVisibility = () => {
    setIsMenuVisible(prevState => !prevState);
  };

  const toogleMobileMenuVisibility = () => {
    setIsMobileMenuVisible(prevState => !prevState);
  };

  return (
    <header className="relative flex items-center text-blue-600 lg:bg-white w-full px-8 lg:py-2 pt-6">
      <div className="flex items-center justify-between w-full lg:pt-2">
        <IoMdMenu
          className="text-5xl absolute cursor-pointer lg:hidden"
          onClick={toogleMobileMenuVisibility}
        />
        {isMobileMenuVisible && <MobileMenu />}
        <div className="w-full lg:justify-normal justify-center items-center flex">
          <Image src="/images/logo.svg" alt="logo" width={80} height={80} priority />
        </div>
      </div>
      <ul className="hidden lg:block justify-end gap-8 text-gray-600">
        {menuData?.length > 0 && <DesktopMenu menuData={menuData} />}
      </ul>
      {menuData?.filter((item: MenuItem) => item.menuitemtext === 'Perfil')
        .map((item: MenuItem, index: number) => (
          <div className="relative" key={index}>
            <button
              className="relative h-10 w-10 cursor-pointer"
              onClick={() => toggleMenuItemVisibility}
            >
              <Image
                src="/images/jackie-chan.jpeg"
                alt="Perfil"
                fill
                className="rounded-full object-cover"
              />
            </button>
            {isMenuVisible && (
              <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-fit">
                {item.submenu.map((submenuItem: SubmenuItem, subIndex: number) => (
                  <li key={submenuItem.text + subIndex}>
                    <Link
                      href={submenuItem.link || '/'}
                      className="block px-4 py-2 text-[#1D1B20] hover:text-[#3857F4] transition-colors"
                    >
                      {submenuItem.text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
    </header>
  );
}
