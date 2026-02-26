import { GrSearch } from "react-icons/gr";

export const SearchInput = () => {
  return (
    <div className="flex w-full md:items-center md:justify-center">
      <div className="flex h-12 w-full max-w-[850px] items-center gap-2 self-stretch rounded-lg border border-secondary-500 bg-white px-2">
        <div className="h-10 w-10 rounded-full flex items-center justify-center cursor-pointer">
          <GrSearch className="text-[#9790A2] text-2xl" />
        </div>
        <input
          className="bg-transparent w-full h-full px-2 placeholder:text-base md:placeholder:text-lg placeholder:text-gray-500 outline-none"
          type="text"
          placeholder="Buscar profissionais e áreas"
        />
      </div>
    </div>
  );
};
