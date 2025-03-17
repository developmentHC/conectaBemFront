import { HTMLAttributes } from "react"
import { twMerge } from 'tailwind-merge'


export const Title = ({className, ...props}: TitleProps) => {
  return (
    <h1 className={twMerge('text-2xl font-semibold w-full', className)}>
      {props.children}
    </h1>
  )
}

type TitleProps = HTMLAttributes<HTMLHeadingElement>