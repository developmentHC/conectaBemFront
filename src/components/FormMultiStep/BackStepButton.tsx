import {
  IconButton,
  IconButtonProps,
} from "@mui/material";
import { IoMdArrowBack } from "react-icons/io";

export const BackStepButton = ({ ...props }: IconButtonProps) => {
  return (
    <IconButton className="w-fit h-fit" {...props}>
      <IoMdArrowBack />
    </IconButton>
  );
};