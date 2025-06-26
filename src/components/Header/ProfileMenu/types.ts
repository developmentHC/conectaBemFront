import { MenuItem } from "../types";

export interface ModalProps {
  setChangeAccountTypeOpen: (value: boolean) => void;
  onClose: () => void;
  onConfirm?: () => void;
}

export interface ProfileMenuProps {
  items: MenuItem | undefined;
}
