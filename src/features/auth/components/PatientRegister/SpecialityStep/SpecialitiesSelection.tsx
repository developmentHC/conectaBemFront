import { useState } from "react";
import { SelectableTag } from "@/components/SelectableTag";
import { useGetSpecialties } from "@/kubb/hooks/useGetSpecialties";

export const SpecialitiesSelection = ({
  selecteds,
  onChange,
}: {
  selecteds: string[];
  onChange: (specialties: string[]) => void;
}) => {
  const [collapseSpecialty, setCollapseSpecialty] = useState<boolean>(false);
  const { data } = useGetSpecialties();
  const specialties = data?.specialties;

  const visibleCollapse = collapseSpecialty ? specialties : specialties?.slice(0, 8);

  const handleClick = (speciality: string) => {
    let newSpecialties = selecteds;

    if (newSpecialties.includes(speciality)) {
      newSpecialties = newSpecialties.filter((item) => item !== speciality);
    } else {
      newSpecialties = [...newSpecialties, speciality];
    }

    onChange(newSpecialties);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="opacity-80">Escolha as especialidades que mais pesquisa ou utiliza</p>

      <ul className={`flex flex-wrap gap-2`}>
        {visibleCollapse
          ?.filter((s): s is { id?: string; name: string } => s.name !== undefined)
          .map((specialty) => (
            <SelectableTag
              key={specialty.id}
              active={selecteds.includes(specialty.name)}
              onClick={() => handleClick(specialty.name)}
            >
              {specialty.name}
            </SelectableTag>
          ))}

        <div className="flex w-full justify-end">
          <span
            onClick={() => setCollapseSpecialty(!collapseSpecialty)}
            className="mt-4 w-fit cursor-pointer text-end text-gray-600"
          >
            {collapseSpecialty ? "+ Ver menos" : "+ Ver mais"}
          </span>
        </div>
      </ul>
    </div>
  );
};
