import { useGetSpecialties } from "@/kubb/hooks/useGetSpecialties";

export const MedicalSpecialization = () => {
  const { data } = useGetSpecialties({ featured: true });
  const specialties = data?.specialties;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 px-1">
      {specialties?.map((item) => (
        <div
          className="inline-flex min-w-[120px] cursor-pointer justify-center border border-secondary-500 bg-white px-4 py-2 text-base text-gray-800"
          style={{ borderRadius: "8px 8px 8px 0" }}
          key={item.id}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
