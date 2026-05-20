import { render, screen, fireEvent } from "@testing-library/react";
import { SpecialitiesSelection } from "@/features/auth/components/PatientRegister/SpecialityStep/SpecialitiesSelection";

jest.mock("@/kubb/hooks/useGetSpecialties", () => ({
  useGetSpecialties: () => ({
    data: {
      specialties: [
        { id: "reiki", name: "Reiki" },
        { id: "yoga", name: "Yoga" },
        { id: "acupuntura", name: "Acupuntura" },
      ],
      page: 1,
      pageCount: 1,
    },
  }),
}));

describe("SpecialitiesSelection", () => {
  it("renderiza especialidades retornadas pela API", () => {
    render(<SpecialitiesSelection selecteds={[]} onChange={jest.fn()} />);

    expect(screen.getByText("Reiki")).toBeInTheDocument();
    expect(screen.getByText("Yoga")).toBeInTheDocument();
    expect(screen.getByText("Acupuntura")).toBeInTheDocument();
  });

  it("chama onChange ao selecionar uma especialidade", () => {
    const onChangeMock = jest.fn();
    render(<SpecialitiesSelection selecteds={[]} onChange={onChangeMock} />);

    fireEvent.click(screen.getByText("Reiki"));

    expect(onChangeMock).toHaveBeenCalledWith(["Reiki"]);
  });

  it("chama onChange removendo especialidade já selecionada", () => {
    const onChangeMock = jest.fn();
    render(<SpecialitiesSelection selecteds={["Reiki"]} onChange={onChangeMock} />);

    fireEvent.click(screen.getByText("Reiki"));

    expect(onChangeMock).toHaveBeenCalledWith([]);
  });
});