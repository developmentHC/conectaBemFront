import { Button, Modal } from "@mui/material";
import { Header } from "../Header";
import { FaArrowLeft } from "react-icons/fa";
import { ValueFilter } from "./ValueFilter";
import { AccessibilityFilter } from "./AccessibilityFilter";
import { PreferenceFilter } from "./PreferenceFilter";
import { DistanceFilter } from "./DistanceFilter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFilterStore } from "@/stores/filterStore";
import { GrClose } from "react-icons/gr";

type ModalFilterProps = {
  open: boolean;
  onClose: () => void;
};

const schema = z.object({
  value: z.array(z.string()),
  accessibility: z.array(z.string()),
  preferences: z.array(z.string()),
  distance: z.number().min(0),
});

type Data = z.infer<typeof schema>;

export const ModalFilter = ({ open, onClose }: ModalFilterProps) => {
  const { value, accessibility, preferences, setFilters } = useFilterStore();

  const { watch, handleSubmit, setValue } = useForm<Data>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      value,
      accessibility,
      preferences,
      distance: 10,
    },
  });

  const selectedValue = watch("value");
  const selectedAccessibility = watch("accessibility");
  const selectedPreferences = watch("preferences");
  const selectedDistance = watch("distance");

  const onSubmit = handleSubmit((data: Data) => {
    setFilters({
      value: data.value,
      accessibility: data.accessibility,
      preferences: data.preferences,
      distance: data.distance,
    });

    onClose();
  });

  return (
    <Modal
      open={open}
      className="flex items-center justify-center bg-black/50"
      disableEnforceFocus
    >
      <div className="bg-white flex flex-col lg:rounded-lg w-full h-screen max-w-[780px] lg:max-h-[630px] px-6 overflow-auto">
        <div className="lg:hidden">
          <Header />
        </div>
        <div className="flex flex-col gap-3 mb-6 pt-6">
          <div className="lg:flex justify-end hidden">
            <GrClose onClick={onClose} className="cursor-pointer" />
          </div>
          <FaArrowLeft onClick={onClose} className="cursor-pointer lg:hidden" />
          <h3 className="text-2xl font-semibold capitalize">Filtros</h3>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-10 lg:gap-6">
          <ValueFilter
            onChange={(value) => setValue("value", value)}
            selecteds={selectedValue}
          />
          <AccessibilityFilter
            onChange={(selecteds) => setValue("accessibility", selecteds)}
            selecteds={selectedAccessibility}
          />
          <PreferenceFilter
            onChange={(selecteds) => setValue("preferences", selecteds)}
            selecteds={selectedPreferences}
          />
          <DistanceFilter
            onChange={(distance) => setValue("distance", distance)}
            selected={selectedDistance}
          />
          <Button
            type="submit"
            variant="contained"
            className="text-button bg-blue-700 font-semibold"
          >
            Filtrar
          </Button>
        </form>
      </div>
    </Modal>
  );
};
