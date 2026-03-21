import Image from "next/image";

type FilterButtonProps = {
  onClick: () => void;
};

export const FilterButton = ({ onClick }: FilterButtonProps) => {
  return (
    <div
      className="flex h-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-t-lg rounded-br-lg border border-secondary-500 bg-secondary-500 px-3 py-2 text-gray-50"
      onClick={onClick}
    >
      <Image src="/images/filter.svg" alt="Filtro" width={15} height={15} />
      <p className="text-[#F2F1F3] text-sm">Filtros</p>
    </div>
  );
};
