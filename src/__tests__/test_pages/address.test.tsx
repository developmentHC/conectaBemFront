import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import Addresses from "@/app/(public)/address/page";
import { useAddresses } from "@/features/addresses/hooks/useAddresses";
import type { Address } from "@/types/address";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock("@/features/addresses/hooks/useAddresses", () => ({
  useAddresses: jest.fn(),
}));

jest.mock("@/kubb", () => ({
  usePutActiveAddress: () => ({ mutate: jest.fn(), isPending: false }),
  getAddressQueryKey: () => ["address"],
}));

const sampleAddresses: Address[] = [
  {
    id: "1",
    type: "Casa",
    rua: "Rua A",
    bairro: "Bairro B",
    cidade: "Cidade C",
    estado: "Estado D",
    cep: "12345-678",
    complemento: "Apto 101",
    principal: true,
  },
];

const setMockAddresses = (data: Address[] | undefined, overrides: Record<string, unknown> = {}) => {
  (useAddresses as jest.Mock).mockReturnValue({
    data,
    isLoading: false,
    isError: false,
    ...overrides,
  });
};

describe("Addresses Page", () => {
  it("renders the Addresses component", () => {
    setMockAddresses([]);
    render(<Addresses />, { wrapper });
    expect(screen.getByText("Endereços")).toBeInTheDocument();
  });

  it("renders a list of addresses when data is available", () => {
    setMockAddresses(sampleAddresses);
    render(<Addresses />, { wrapper });

    expect(screen.getByText("ADICIONAR")).toBeInTheDocument();
    expect(screen.getByText("Casa")).toBeInTheDocument();
    expect(screen.getByText("Rua A - Bairro B, Cidade C - Estado D")).toBeInTheDocument();
    expect(screen.getByText("Endereço principal")).toBeInTheDocument();
  });

  it("shows loading state while fetching", () => {
    setMockAddresses(undefined, { isLoading: true });
    render(<Addresses />, { wrapper });
    expect(screen.getByText("Carregando endereços...")).toBeInTheDocument();
  });
});
