import Image from "next/image";

type FilterButtonProps = {
  onClick: () => void;
};

export const FilterButton = ({ onClick }: FilterButtonProps) => {
  return (
    <div
      className="flex min-w-[100px] p-2 justify-center items-center gap-2 bg-primary-500 rounded-lg whitespace-nowrap cursor-pointer"
      onClick={onClick}
    >
      <Image src="/images/filter.svg" alt="Filtro" width={15} height={15} />
      <p className="text-button text-sm">Filtros</p>
    </div>
  );
};
