import { specializationOptions } from "./options";

export const MedicalSpecialization = () => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-2 px-1">
      {specializationOptions.map((item) => (
        <div
          className="inline-flex min-w-[120px] justify-center px-4 py-2 text-base text-gray-800 border border-[#253E99] cursor-pointer bg-white"
          style={{ borderRadius: "8px 8px 8px 0" }}
          key={item.id}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
