import React from "react";
import { ListButton } from "../ListButton";
import { FilterBody } from "./FilterBody";

const preferences = ["LGBTQIA+ Friendly", "Pet Friendly", "Aceita Wellhub"];

export const PreferenceFilter = ({
  selecteds,
  onChange,
}: {
  selecteds: string[];
  onChange: (preferences: string[]) => void;
}) => {
  const handleSelectFilter = (preference: string) => {
    let newValue = selecteds;

    if (newValue.includes(preference)) {
      newValue = newValue.filter((item) => item !== preference);
    } else {
      newValue = [...newValue, preference];
    }

    onChange(newValue);
  };

  return (
    <FilterBody>
      <p className="text-xl font-semibold">Atendimento</p>
      <ul className="flex gap-2 flex-wrap">
        {preferences.map((preference) => (
          <ListButton
            key={preference}
            active={selecteds.includes(preference)}
            onClick={() => handleSelectFilter(preference)}
          >
            {preference}
          </ListButton>
        ))}
      </ul>
    </FilterBody>
  );
};
