import type React from "react";
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
          "cursor-pointer rounded rounded-t-lg rounded-br-lg border border-blue-800 p-2 transition-all hover:bg-blue-600/50",
          active && "bg-blue-600/50",
          className,
        )}
        {...buttonProps}
      >
        {children}
      </button>
    </li>
  );
};
