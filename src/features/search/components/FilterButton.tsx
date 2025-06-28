import { FilterIcon } from "../../../../public/images/icons";

type FilterButtonProps = {
  onClick: () => void;
};

export const FilterButton = ({ onClick }: FilterButtonProps) => {
  return (
    <div
      className="flex max-w-[90px] p-2 justify-center items-center gap-1 bg-blue-800 rounded-lg whitespace-nowrap cursor-pointer"
      onClick={onClick}
    >
      <p className="text-button text-sm">Filtros</p>
      <FilterIcon />
    </div>
  );
};
