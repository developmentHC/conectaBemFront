'use client';

import Image from 'next/image';
import { IoIosArrowDown, IoMdMenu } from 'react-icons/io';
import DesktopMenu from '../Menu/DesktopMenu';
import MobileMenu from '../Menu/MobileMenu';
import { useState } from 'react';
import { MenuItem, SubmenuItem } from '../Menu/types';
import Link from 'next/link';

export default function Header({ menuData }) {
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
        {isMobileMenuVisible && <MobileMenu menuData={menuData} />}
        <div className="w-full lg:justify-normal justify-center items-center flex">
          <Image src="/images/logo.svg" alt="logo" width={80} height={80} />
        </div>
      </div>
      <ul className="hidden lg:block justify-end gap-8 text-gray-600">
        {menuData?.length > 0 && <DesktopMenu menuData={menuData} />}
      </ul>
      {menuData?.filter((item: MenuItem) => item.menuitemtext === 'Perfil')
        .map((item: MenuItem, index: number) => (
          <div className="relative" key={index}>
            <div
              className="h-[40px] w-[40px] cursor-pointer"
              onClick={toggleMenuItemVisibility}
            >
              <Image
                src="/images/jackie-chan.jpeg"
                alt="Perfil"
                layout="fill"
                className="rounded-full object-cover"
              />
            </div>
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
