import { useState } from "react";
import { SelectableTag } from "../../../../../components/SelectableTag";

const services = ["LGBTQIAP+ Friendly", "Pet Friendly", "Aceita Wellhub"];

export const ServicesSelection = ({
  selecteds,
  onChange,
}: {
  selecteds: string[];
  onChange: (services: string[]) => void;
}) => {
  const [collapseServices, setCollapseServices] = useState<boolean>(false);

  const visibleCollapse = collapseServices ? services : services?.slice(0, 8);

  const handleClickService = (service: string) => {
    let newServices = selecteds;

    if (newServices.includes(service)) {
      newServices = newServices.filter((item) => item !== service);
    } else {
      newServices = [...newServices, service];
    }

    onChange(newServices);
  };

  return (
    <div className="flex flex-col gap-6">
      <ul className="flex flex-wrap gap-2">
        {visibleCollapse.map((service) => (
          <SelectableTag
            key={service}
            active={selecteds.includes(service)}
            onClick={() => handleClickService(service)}
          >
            {service}
          </SelectableTag>
        ))}
        <div className="flex w-full justify-end">
          <span
            onClick={() => setCollapseServices(!collapseServices)}
            className="mt-4 w-fit cursor-pointer text-end text-gray-600"
          >
            {collapseServices ? "+ Ver menos" : "+ Ver mais"}
          </span>
        </div>
      </ul>
    </div>
  );
};
