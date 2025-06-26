import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type SelecteableTagProps = {
  active: boolean;
  children: React.ReactNode;
} & HTMLAttributes<HTMLLIElement>;

export const SelectableTag = ({
  active,
  children,
  ...props
}: SelecteableTagProps) => {
  return (
    <li
      className={twMerge(
        `p-2 border border-blue-800 rounded cursor-pointer hover:bg-blue-600/50 transition-all rounded-t-lg rounded-br-lg`,
        active && "bg-blue-600/50"
      )}
      {...props}
    >
      {children}
    </li>
  );
};
