import React from "react";
import { twMerge } from "tailwind-merge";

type SelectableTagProps = {
  active?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SelectableTag = ({
  active = false,
  children,
  className = "",
  ...buttonProps
}: SelectableTagProps) => {
  return (
    <li className="list-none">
      <button
        type="button"
        aria-pressed={!!active}
        className={twMerge(
          "p-2 border border-blue-800 rounded cursor-pointer hover:bg-blue-600/50 transition-all rounded-t-lg rounded-br-lg",
          active && "bg-blue-600/50",
          className
        )}
        {...buttonProps}
      >
        {children}
      </button>
    </li>
  );
};
