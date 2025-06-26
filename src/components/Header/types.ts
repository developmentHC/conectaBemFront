export interface MenuItem {
  menuitemtext: string;
  menuitemlink: {
    url?: string;
  };
  onlyonmobile: boolean;
  showtopatientusers: boolean;
  showtoprofessionalusers: boolean;
  showtounsignedusers: boolean;
  submenu: Array<{
    text: string;
    link: string | null;
    showtowhichusertype?: string | null;
  }>;
}
