import { MdOutlineEdit } from "react-icons/md";

export const PersonalAddress = () => {
  return (
    <div className="flex items-center justify-center lg:justify-start gap-2 cursor-pointer text-lg w-fit">
      <span>Rua Fulaninho, 000, cidade, estado</span>
      <MdOutlineEdit className="text-blue-secondary"/>
    </div>
  )
}