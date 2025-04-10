import { Slider } from "@mui/material";
import React from "react";
import { FilterBody } from "./FilterBody";

type DistanceFilterProps = {
  selected: number;
  onChange: (distance: number) => void;
};

export const DistanceFilter = ({ selected, onChange }: DistanceFilterProps) => {
  return (
    <FilterBody>
      <p className="text-xl font-semibold">Distância</p>
      <Slider
        aria-label="Default"
        size="medium"
        min={1}
        max={12}
        value={selected}
        onChange={(_, value) => onChange(value as number)}
        valueLabelDisplay="auto"
      />
      <div className="flex justify-between text-gray-500">
        <span>1km</span>
        <span>12km</span>
      </div>
    </FilterBody>
  );
};
