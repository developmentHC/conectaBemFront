import { ListButton } from "../ListButton";
import { FilterBody } from "./FilterBody";

const values = ["$", "$$", "$$$"];

export const ValueFilter = ({
  selecteds,
  onChange,
}: {
  selecteds: string[];
  onChange: (values: string[]) => void;
}) => {
  const handleSelectFilter = (values: string) => {
    let newValue = selecteds;

    if (newValue.includes(values)) {
      newValue = newValue.filter((item) => item !== values);
    } else {
      newValue = [...newValue, values];
    }

    onChange(newValue);
  };

  return (
    <FilterBody>
      <p className="text-xl font-semibold">Valor</p>
      <ul className="flex gap-2">
        {values.map((value) => (
          <ListButton
            key={value}
            active={selecteds.includes(value)}
            onClick={() => handleSelectFilter(value)}
          >
            {value}
          </ListButton>
        ))}
      </ul>
    </FilterBody>
  );
};
