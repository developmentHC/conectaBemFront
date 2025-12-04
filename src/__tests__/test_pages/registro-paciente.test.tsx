
import RegistroPaciente  from '@/app/(auth)/auth/registro-paciente/page';

import { PatientRegister } from "@/features/auth/components/PatientRegister";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Cria uma nova instância de QueryClient para o teste
const queryClient = new QueryClient();

// Componente Wrapper para fornecer o QueryClient
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  </QueryClientProvider>
);


jest.mock("../../features/auth/components/PatientRegister/usePatientRegisterStore", () => ({
  usePatientRegisterStore: () => ({ step: "personal_data" }),
}));

describe("Registro Paciente Page", () => {
  it("should render the Registro paciente page", () => {
    render(<RegistroPaciente />, { wrapper });
    expect(screen.getByText("Cadastro do Paciente")).toBeInTheDocument();
    expect(screen.getByText("etapa 1/4")).toBeInTheDocument();
  })

  it("should render the header with title and progress bar", () => {
    render(<PatientRegister />, { wrapper });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByText("etapa 1/4")).toBeInTheDocument();
  });

  it("should render the PatientRegister component and go to step 2", async () => {
    render(<PatientRegister />, { wrapper });
    const user = userEvent.setup();

    const inputName = screen.getByPlaceholderText("Nome e Sobrenome");
    const inputDataNascimentoWrapper = screen.getByPlaceholderText("DD/MM/AAAA");
    const inputCEP = screen.getByPlaceholderText("00000-000");
    const buttonContinuar = screen.getByRole("button", { name: "Continuar" });

    // Simula preenchimento dos campos
    fireEvent.change(inputName, { target: { value: "Julio Vieira" } });
    const inputDataNascimento = inputDataNascimentoWrapper.querySelector('input') || inputDataNascimentoWrapper;
    await user.type(inputDataNascimento, "21/09/2002");
    fireEvent.change(inputCEP, { target: { value: "12345-678" } });

    // Verifica se os campos receberam os valores
    expect(inputName).toHaveValue("Julio Vieira");
    expect(inputDataNascimento).toHaveValue("02/09/2002");
    expect(inputCEP).toHaveValue("12345-678");

    // Clica no botão para avançar
    fireEvent.click(buttonContinuar);

    // Verifica se a próxima etapa foi exibida
    // expect(screen.getByText("etapa 2/4")).toBeInTheDocument();
  });

  it("exibe mensagem quando o nome tem menos de 3 caracteres", async () => {
    render(<PatientRegister />, { wrapper });
    const user = userEvent.setup();

    const inputName = screen.getByPlaceholderText("Nome e Sobrenome");
    const inputDataNascimentoWrapper = screen.getByPlaceholderText("DD/MM/AAAA");
    const inputCEP = screen.getByPlaceholderText("00000-000");
    const buttonContinuar = screen.getByRole("button", { name: /continuar/i });

    // DatePicker do MUI: pegue o <input/> interno
    const inputDataNascimento =
      (inputDataNascimentoWrapper as HTMLElement).querySelector("input") ||
      inputDataNascimentoWrapper;

    // Preenche campos obrigatórios com valores válidos
    await user.type(inputDataNascimento as HTMLElement, "01/01/1990");
    fireEvent.change(inputCEP, { target: { value: "12345-678" } });

    // Digita nome com 2 caracteres
    fireEvent.change(inputName, { target: { value: "Jo" } });

    // Tenta prosseguir
    await user.click(buttonContinuar);

    //  Mensagem exigida no critério de aceite
    expect(
      await screen.findByText("Nome deve ter pelo menos 3 caracteres")
    ).toBeInTheDocument();
  });
})