import { GrSearch } from "react-icons/gr";

export const SearchInput = () => {
  return (
    <div className="flex w-full md:items-center md:justify-center">
      <div className="flex h-12 w-full max-w-[850px] items-center gap-2 self-stretch rounded-lg border border-secondary-500 bg-white px-2">
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full">
          <GrSearch className="text-2xl text-[#9790A2]" />
        </div>
        <input
          className="h-full w-full bg-transparent px-2 outline-none placeholder:text-base placeholder:text-gray-500 md:placeholder:text-lg"
          type="text"
          placeholder="Buscar profissionais e áreas"
        />
      </div>
    </div>
  );
};
