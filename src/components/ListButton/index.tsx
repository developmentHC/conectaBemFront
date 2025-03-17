import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ListButtonProps = {
  active?: boolean;
  children: React.ReactNode;
} & HTMLAttributes<HTMLLIElement>;

export const ListButton = ({
  active,
  children,
  ...props
}: ListButtonProps) => {
  return (
    <li
      className={twMerge(
        "cursor-pointer p-[10px] text-sm border border-blue-600 rounded-t-lg rounded-br-lg hover:bg-blue-600/50 transition-all",
        active && "bg-blue-600/50"
      )}
      {...props}
    >
      {children}
    </li>
  );
};
