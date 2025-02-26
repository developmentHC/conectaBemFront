import { HTMLAttributes } from "react"
import { twMerge } from 'tailwind-merge'


export const Description = ({className, ...props}: DescriptionProps) => {
  return (
    <p className={twMerge('text-gray-600', className)}>
      {props.children}
    </p>
  )
}

type DescriptionProps = HTMLAttributes<HTMLParagraphElement>