import { Menu } from "@mui/material";

type DropdownMenuProps = {
  id?: number;
  anchorEl: HTMLElement | null;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};
export const DropdownMenu = ({
  id,
  anchorEl,
  children,
  isOpen,
  onClose,
}: DropdownMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      id={`menu-items-${id}`}
      open={isOpen}
      onClose={onClose}
      MenuListProps={{
        "aria-labelledby": `menu-${id}`,
      }}
    >
      {children}
    </Menu>
  );
};