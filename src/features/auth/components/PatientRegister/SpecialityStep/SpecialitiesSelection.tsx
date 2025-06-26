import { SelectableTag } from "@/components/SelectableTag";
import { useGetSpecialty } from "@/features/auth/hooks/useGetSpecialty";
import { useState } from "react";

export const SpecialitiesSelection = ({
  selecteds,
  onChange,
}: {
  selecteds: string[];
  onChange: (specialties: string[]) => void;
}) => {
  const [collapseSpecialty, setCollapseSpecialty] = useState<boolean>(false);
  const { data: specialties } = useGetSpecialty();

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
        {visibleCollapse?.map((specialty) => (
          <SelectableTag
            key={specialty.id}
            active={selecteds.includes(specialty.name)}
            onClick={() => handleClick(specialty.name)}
          >
            {specialty.name}
          </SelectableTag>
        ))}

        <div className="flex justify-end w-full">
          <span
            onClick={() => setCollapseSpecialty(!collapseSpecialty)}
            className="cursor-pointer w-fit text-end text-gray-600 mt-4"
          >
            {collapseSpecialty ? "+ Ver menos" : "+ Ver mais"}
          </span>
        </div>
      </ul>
    </div>
  );
};
