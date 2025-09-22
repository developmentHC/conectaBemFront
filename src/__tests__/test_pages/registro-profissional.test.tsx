import RegistroProficional from '@/app/auth/registro-profissional/page';
import {render, screen} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

describe("Registro Profissional Page", () => {
    it("should render the Registro Profissional page", () => {
        render(<RegistroProficional />, { wrapper });
        expect(screen.getByText("Cadastro profissional")).toBeInTheDocument();
    })
})