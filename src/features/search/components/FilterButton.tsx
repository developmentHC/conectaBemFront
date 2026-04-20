import { MdFilterList } from "react-icons/md";

type FilterButtonProps = {
  onClick: () => void;
};

export const FilterButton = ({ onClick }: FilterButtonProps) => {
  return (
    <div
      className="inline-flex min-w-[120px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2"
      onClick={onClick}
    >
      <MdFilterList size={24} className="text-neutral-50" aria-hidden />
      <p className="font-medium text-base text-neutral-50">Filtros</p>
    </div>
  );
};
