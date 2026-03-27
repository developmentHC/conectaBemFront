import { IconButton, type IconButtonProps } from "@mui/material";
import { IoMdArrowBack } from "react-icons/io";

export const BackStepButton = ({ ...props }: IconButtonProps) => {
  return (
    <IconButton className="h-fit w-fit" {...props}>
      <IoMdArrowBack />
    </IconButton>
  );
};
