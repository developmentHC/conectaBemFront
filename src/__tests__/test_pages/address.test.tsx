import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Addresses from '@/app/(public)/address/page';
import { useAddresses } from '@/features/addresses/hooks/useAddresses';

// Cria uma nova instância de QueryClient para o teste
const queryClient = new QueryClient();

// Componente Wrapper para fornecer o QueryClient
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

jest.mock('@/features/addresses/hooks/useAddresses', () => ({
  useAddresses: jest.fn(),
}));

const emptyAddresses = { enderecos: { lista: [] } };

const sampleAddresses = {
  enderecos: {
    lista: [
      {
        id: '1',
        tipo: 'Casa',
        rua: 'Rua A',
        bairro: 'Bairro B',
        cidade: 'Cidade C',
        estado: 'Estado D',
        cep: '12345-678',
        complemento: 'Apto 101',
        principal: true,
      },
    ],
  },
};

const setMockAddresses = (data: any) => {
  (useAddresses as jest.Mock).mockReturnValue({ data });
};

describe('Addresses Page', () => {
  it('renders the Addresses component', () => {
    setMockAddresses(emptyAddresses);
    render(<Addresses />, { wrapper });
    expect(screen.getByText('Endereços')).toBeInTheDocument();
  });

  it('renders a list of addresses when data is available', () => {
    // Simula dados com endereços
    setMockAddresses(sampleAddresses);
    render(<Addresses />, { wrapper });

    expect(screen.getByText('ADICIONAR')).toBeInTheDocument();

    expect(screen.getByText('Casa')).toBeInTheDocument();
    expect(screen.getByText('Rua A - Bairro B, Cidade C - Estado D')).toBeInTheDocument();

    expect(screen.getByText('Endereço principal')).toBeInTheDocument();
  });
});