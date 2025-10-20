import RegistroProficional from '@/app/(auth)/auth/registro-profissional/page';
import {render, screen, fireEvent} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PersonalDataStep } from '@/features/auth/components/ProfissionalRegister/PersonalDataStep';

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

describe("Registro Profissional Page", () => {
    it("should render the Registro Profissional page", () => {
        render(<RegistroProficional />, { wrapper });
        expect(screen.getByText("Cadastro profissional")).toBeInTheDocument();
    })

    it("should have the required fields", () => {
        render(<PersonalDataStep />, { wrapper });
        expect(screen.getByText("Nome Completo")).toBeInTheDocument();
        expect(screen.getByText("Data de Nascimento")).toBeInTheDocument();
        expect(screen.getByText("CEP Residencial")).toBeInTheDocument();
        expect(screen.getByText("Número")).toBeInTheDocument();
        expect(screen.getByText("Longradouro")).toBeInTheDocument();
        expect(screen.getByText("Bairro")).toBeInTheDocument();
        expect(screen.getByText("Cidade")).toBeInTheDocument();
        expect(screen.getByText("Estado")).toBeInTheDocument();
    })

    it("should have the required fields", async() => {
        render(<PersonalDataStep />, { wrapper });

        const continueButton = screen.getByText("Continuar");
        fireEvent.click(continueButton);

        await screen.findByText("Data de nascimento é obrigatória!");

        const nameLabelElement = screen.getByText("Data de Nascimento");
        expect(nameLabelElement).toHaveClass("text-red-600");

        expect(screen.getByText("Data de nascimento é obrigatória!")).toBeInTheDocument();
        expect(screen.getByText("CEP inválido")).toBeInTheDocument();
    })
})