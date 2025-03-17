import { HTMLAttributes } from "react"
import { twMerge } from 'tailwind-merge'


export const Header = ({className, ...props}: HeaderProps) => {
  return (
    <div className={twMerge('flex flex-col gap-2', className)}>
      {props.children}
    </div>
  )
}

type HeaderProps = HTMLAttributes<HTMLDivElement>