import { useState } from "react";
import { SearchIcon, ChevronDownIcon, HelpIcon } from "../../../../public/images/icons";
import { MenuItem } from "./types";

interface MobileMenuProps {
  menuData: MenuItem[];
  onClose: () => void;
}

export const MobileMenu = ({ menuData, onClose }: MobileMenuProps) => {
  const [profileType, setProfileType] = useState<'paciente' | 'profissional'>('paciente');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const handleSubmitSearchBar = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de busca aqui
  };

  const toggleItem = (itemText: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      newSet[newSet.has(itemText) ? 'delete' : 'add'](itemText);
      return newSet;
    });
  };

  return (
    <nav className="p-6 bg-default h-[100dvh] flex flex-col relative">
      <div className="flex-1 overflow-y-auto pb-24">
        <form onSubmit={handleSubmitSearchBar} className="border border-[#3857F4] rounded-xl p-1 flex mb-8">
          <input
            className="bg-transparent w-full pl-4 pr-6 appearance-none outline-none border-none focus:border-none focus:ring-0"
            placeholder='Buscar profissionais e áreas'
            type="text"
            name="search"
            id="search"
          />
          <button type="submit" className="bg-[rgb(56,88,244)] rounded-full">
            <SearchIcon className="fill-[#D7FF7B] h-10 w-10 p-2" />
          </button>
        </form>
        <div className="space-y-6 mb-10">
          {menuData.map((item, index) => (
            <div
              key={item.menuitemtext}
              className={`${index === 0 ? 'border-b border-gray-200' : ''} pb-4`}
            >
              <button
                className="w-full flex justify-between items-center"
                onClick={() => toggleItem(item.menuitemtext)}
              >
                <h3 className="text-[#000000] font-medium text-lg">
                  {item.menuitemtext}
                </h3>
                {item.submenu && (
                  <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${openItems.has(item.menuitemtext) ? 'rotate-180' : ''
                    }`} />
                )}
              </button>

              {item.submenu && openItems.has(item.menuitemtext) && (
                <ul className="space-y-3 pl-2 mt-4">
                  {item.submenu.map((subItem) => (
                    <li key={subItem.text}>
                      {subItem.link ? (
                        <a
                          href={subItem.link}
                          className="text-[#000000] hover:text-[#3858F4] transition-colors block py-1"
                          onClick={onClose}
                        >
                          {subItem.text}
                        </a>
                      ) : (
                        <span className="text-[#000000] py-1">
                          {subItem.text}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>


      <div className="fixed bottom-0 left-0 right-0 p-4 shadow-lg bg-default">
        <div className="flex space-x-2 mb-5">
          <HelpIcon className="fill-[#77737B] w-[17px] h-[20px]" />
          <p className="text-center text-sm text-gray-500">
            Saiba mais sobre os perfis disponíveis
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <span className={`text-base ${profileType === 'paciente' ? 'text-[#1D1B20] font-regular' : 'text-[#9790A2]'}`}>
            Paciente
          </span>

          <button
            role="switch"
            aria-checked={profileType === 'profissional'}
            onClick={() => setProfileType(prev => prev === 'paciente' ? 'profissional' : 'paciente')}
            className="relative inline-flex h-3.5 w-9 items-center rounded-full bg-[#B3BFFB] transition-colors"
          >
            <span className={`absolute left-0 inline-block h-5 w-5 transform rounded-full bg-[#0B29C1] shadow-lg transition-all duration-300 ${profileType === 'paciente' ? 'translate-x-0' : 'translate-x-4'
              }`} />
          </button>

          <span className={`text-base ${profileType === 'profissional' ? 'text-[#1D1B20] font-regular' : 'text-[#9790A2]'}`}>
            Profissional
          </span>
        </div>
      </div>
    </nav>
  );
};