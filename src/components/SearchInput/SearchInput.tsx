import { GrSearch } from "react-icons/gr";

export const SearchInput = () => {
  return (
    <div className="w-full md:mx-auto md:w-4/5">
  <label className="flex h-12 w-full items-center gap-2 rounded-lg border border-[#253E99] bg-white px-2 shadow-sm">
    <GrSearch className="text-2xl text-[#9790A2]" aria-hidden />
    <input
      className="flex-1 bg-transparent text-base text-gray-800 placeholder:text-lg placeholder:text-gray-500 outline-none"
      type="text"
      placeholder="Buscar profissionais"
      aria-label="Buscar profissionais"
    />
  </label>
</div>
);
};
