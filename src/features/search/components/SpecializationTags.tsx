type SpecializationTagsProps = {
  specializations: string[];
  specializationsList: string[];
  setSpecialization: (specializations: string[]) => void;
};

export const SpecializationTags = ({
  specializations,
  specializationsList,
  setSpecialization,
}: SpecializationTagsProps) => {
  return (
    <div className="flex gap-2 overflow-x-scroll hide-scrollbar justify-start cursor-pointer">
      {specializationsList.map((item, index) => (
        <div
          className={`border border-blue-600 p-2 rounded-t-lg rounded-br-lg cursor-pointer whitespace-nowrap ${
            specializations.includes(item) ? "bg-indigo-300" : ""
          }`}
          key={index}
          onClick={() =>
            specializations.includes(item)
              ? setSpecialization(
                  specializations.filter((spec) => spec !== item)
                )
              : setSpecialization([...specializations, item])
          }
        >
          <p className="text-sm">{item}</p>
        </div>
      ))}
    </div>
  );
};
