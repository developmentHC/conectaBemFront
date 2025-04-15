export interface MenuItem {
  menuitemtext: string;
  submenu: Array<{
    text: string;
    link: string | null;
  }>;
}
