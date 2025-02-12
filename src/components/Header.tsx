import Image from 'next/image';
import { IoIosArrowDown, IoMdMenu } from 'react-icons/io';

const menu = [
  {
    id: 1,
    name: 'Profissionais',
  },
  {
    id: 2,
    name: 'Suporte',
  },
  {
    id: 3,
    name: 'Sobre o ConectaBem',
  },
];

export const Header = () => {
  return (
    <header className="flex items-center text-blue-600 lg:bg-white w-full px-8 lg:py-2 pt-6">
      <div className="flex items-center justify-between w-full lg:pt-2">
        <IoMdMenu className="text-5xl absolute cursor-pointer lg:hidden" />
        <div className="w-full lg:justify-normal justify-center items-center flex">
          <Image src="/images/logo.svg" alt="logo" width={80} height={80} />
        </div>
      </div>
      <ul className="hidden lg:flex w-full justify-end gap-8 text-gray-600">
        {menu.map((item) => (
          <li key={item.id} className="flex items-center gap-2 cursor-pointer">
            <span>{item.name}</span>
            <IoIosArrowDown />
          </li>
        ))}
      </ul>
    </header>
  );
};
