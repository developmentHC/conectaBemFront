export interface SubmenuItem {
  text: string;
  link?: string;
}

export interface MenuItem {
  menuitemtext: string;
  submenu: SubmenuItem[];
}

export interface MenuProps {
  menuData: MenuItem[];
}
