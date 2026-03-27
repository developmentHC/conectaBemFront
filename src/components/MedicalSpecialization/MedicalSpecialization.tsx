import { specializationOptions } from "./options";

export const MedicalSpecialization = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 px-1">
      {specializationOptions.map((item) => (
        <div
          className="inline-flex min-w-[120px] cursor-pointer justify-center border border-[#253E99] bg-white px-4 py-2 text-base text-gray-800"
          style={{ borderRadius: "8px 8px 8px 0" }}
          key={item.id}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
