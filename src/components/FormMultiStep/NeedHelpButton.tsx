import { ButtonBase, ButtonBaseProps } from "@mui/material";
import { FaRegQuestionCircle } from "react-icons/fa";

export const NeedHelpButton = ({ children, ...props }: ButtonBaseProps) => {
  return (
    <ButtonBase className="w-fit h-fit flex" {...props}>
      <FaRegQuestionCircle />
      {children}
      {!children && <span>Precisa de ajuda?</span>}
    </ButtonBase>
  );
};