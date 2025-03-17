import React from "react";
import { ListButton } from "../ListButton";
import { FilterBody } from "./FilterBody";

const accessibility = [
  "Piso Tatil",
  "Libras",
  "Audiodescrição",
  "Corrimão",
  "Rampas",
];

export const AccessibilityFilter = ({
  selecteds,
  onChange,
}: {
  selecteds: string[];
  onChange: (Accessibility: string[]) => void;
}) => {
  const handleSelectFilter = (accessibility: string) => {
    let newValue = selecteds;

    if (newValue.includes(accessibility)) {
      newValue = newValue.filter((item) => item !== accessibility);
    } else {
      newValue = [...newValue, accessibility];
    }

    onChange(newValue);
  };

  return (
    <FilterBody>
      <p className="text-xl font-semibold">Acessibilidade</p>

      <ul className="flex gap-2 flex-wrap">
        {accessibility.map((item) => (
          <ListButton
            key={item}
            active={selecteds.includes(item)}
            onClick={() => handleSelectFilter(item)}
          >
            {item}
          </ListButton>
        ))}
      </ul>
    </FilterBody>
  );
};
