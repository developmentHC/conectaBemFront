import { MdFilterList } from "react-icons/md";

type FilterButtonProps = {
  onClick: () => void;
};

export const FilterButton = ({ onClick }: FilterButtonProps) => {
  return (
    <div
      className="inline-flex min-w-[120px] justify-center items-center gap-2 px-4 py-2 bg-primary-500 rounded-lg whitespace-nowrap cursor-pointer"
      onClick={onClick}
    >
      <MdFilterList size={24} className="text-[#F2F1F3]" aria-hidden />
      <p className="text-base font-medium text-[#F2F1F3]">Filtros</p>
    </div>
  );
};
