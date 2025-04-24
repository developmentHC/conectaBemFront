export interface ModalProps {
  setChangeAccountTypeOpen: (value: boolean) => void;
  onClose: () => void;
  onConfirm?: () => void;
}
