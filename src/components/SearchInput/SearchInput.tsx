import { GrSearch } from "react-icons/gr";

export const SearchInput = () => {
  return (
    <div className="flex lg:items-center lg:justify-center">
      <div className="flex items-center justify-between w-full h-full border border-blue-600 rounded-xl lg:max-w-[450px]">
        <input
          className="bg-transparent w-full placeholder:text-lg placeholder:text-gray-500 p-4 outline-none"
          type="text"
          placeholder="Buscar profissionais e áreas"
        />
        <div className="px-2">
          <div className="bg-blue-800 h-10 w-10 rounded-full flex items-center justify-center cursor-pointer">
            <GrSearch className="text-lime-500 text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
