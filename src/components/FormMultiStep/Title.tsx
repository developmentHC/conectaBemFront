import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Title = ({ className, ...props }: TitleProps) => {
  return <h1 className={twMerge("w-full font-semibold text-2xl", className)}>{props.children}</h1>;
};

type TitleProps = HTMLAttributes<HTMLHeadingElement>;
