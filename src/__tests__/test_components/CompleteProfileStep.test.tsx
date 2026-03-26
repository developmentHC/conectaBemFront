import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { CompleteProfileStep } from "@/features/auth/components/ProfissionalRegister/CompleteProfileStep";

const mockCreateProfissional = jest.fn();

jest.mock("@/features/auth/components/ProfissionalRegister/useProfissionalRegisterStore", () => ({
  useProfissionalRegisterStore: jest.fn(),
}));

jest.mock("@/features/auth/hooks/useRegisterProfissional", () => ({
  useRegisterProfissional: () => ({ mutate: mockCreateProfissional, isPending: false }),
}));

jest.mock("@/stores/userSessionStore", () => ({
  useUserStore: () => ({ idUser: "user-123", setProfilePhoto: jest.fn() }),
}));

jest.mock("@/utils/gtm", () => ({
  gtmEvents: { professionalRegistrationComplete: jest.fn() },
}));

const { useProfissionalRegisterStore } = jest.requireMock(
  "@/features/auth/components/ProfissionalRegister/useProfissionalRegisterStore",
);

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const baseStoreState = {
  updateFields: jest.fn(),
  birthdate: new Date("1990-01-01"),
  cepProfessional: "01310-100",
  cepResidencial: "01310-100",
  enderecoResidencial: "Rua A",
  bairroResidencial: "Centro",
  cidadeResidencial: "São Paulo",
  estadoResidencial: "SP",
  clinicName: "Clínica Teste",
  enderecoClinica: "Rua B",
  bairroClinica: "Centro",
  cidadeClinica: "São Paulo",
  estadoClinica: "SP",
  complementoClinica: "",
  numeroClinica: 100,
  cpfCNPJ: "123.456.789-09",
  name: "João Silva",
  photo: null,
  servicePreferences: ["Presencial"],
  specialties: ["Fisioterapia"],
};

describe("CompleteProfileStep - accessibility payload", () => {
  beforeEach(() => {
    mockCreateProfissional.mockClear();
  });

  it("envia accessibility do store no payload quando o usuário selecionou opções", () => {
    useProfissionalRegisterStore.mockReturnValue({
      ...baseStoreState,
      accessibility: ["Piso tátil", "Rampas"],
    });

    render(<CompleteProfileStep />, { wrapper });

    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /começar/i }));

    expect(mockCreateProfissional).toHaveBeenCalledWith(
      expect.objectContaining({ acessibility: ["Piso tátil", "Rampas"] }),
    );
  });

  it("envia array vazio quando o usuário pulou a etapa de acessibilidade", () => {
    useProfissionalRegisterStore.mockReturnValue({
      ...baseStoreState,
      accessibility: undefined,
    });

    render(<CompleteProfileStep />, { wrapper });

    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /começar/i }));

    expect(mockCreateProfissional).toHaveBeenCalledWith(
      expect.objectContaining({ acessibility: [] }),
    );
  });
});
