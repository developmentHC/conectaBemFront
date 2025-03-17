import { useProfessional } from "./ProfessionalContext";

export const Preferences = () => {
  const professional = useProfessional();

  return professional.preferablyServices.map((item) => (
    <div
      key={item.id}
      className="border border-blue-600 px-2 py-1 rounded-full text-sm"
    >
      {item.name}
    </div>
  ));
};
