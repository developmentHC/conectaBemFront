import { ButtonBase, type ButtonBaseProps } from "@mui/material";
import { FaRegQuestionCircle } from "react-icons/fa";

export const NeedHelpButton = ({ children, ...props }: ButtonBaseProps) => {
  return (
    <ButtonBase className="flex h-fit w-fit" {...props}>
      <FaRegQuestionCircle />
      {children}
      {!children && <span>Precisa de ajuda?</span>}
    </ButtonBase>
  );
};
