import { useGetSpecialties } from "@/kubb/hooks/useGetSpecialties";

export const MedicalSpecialization = () => {
  const { data, isLoading, isError } = useGetSpecialties({ featured: true });
  const specialties = data?.specialties?.filter(
    (s): s is { id?: string; name: string } => !!s.name,
  );

  if (isLoading) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 px-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
            key={i}
            className="inline-flex min-w-[120px] animate-pulse justify-center bg-gray-200 px-4 py-2 text-base"
            style={{ borderRadius: "8px 8px 8px 0" }}
          >
            &nbsp;
          </div>
        ))}
      </div>
    );
  }

  if (isError || !specialties || specialties.length === 0) {
    return (
      <div className="px-1 text-center text-gray-600 text-sm">
        Não foi possível carregar as especialidades.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 px-1">
      {specialties.map((item) => (
        <div
          className="inline-flex min-w-[120px] cursor-pointer justify-center border border-secondary-500 bg-white px-4 py-2 text-base text-gray-800"
          style={{ borderRadius: "8px 8px 8px 0" }}
          key={item.id ?? item.name}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
