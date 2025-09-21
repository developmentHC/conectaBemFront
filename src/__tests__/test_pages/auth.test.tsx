import { render, screen, fireEvent, waitFor, act, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCredentialLogin } from "@/features/auth/hooks/useCredentialLogin";
import Register from "../../app/auth/page";

jest.mock("@/libs/api", () => ({
  api: { post: jest.fn() },
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

const setIdUserMock = jest.fn();
jest.mock("@/stores/userSessionStore", () => ({
  useUserStore: jest.fn(() => ({ setIdUser: setIdUserMock })),
}));

const consoleErrorMock = jest
  .spyOn(console, "error")
  .mockImplementation(() => {});

const queryClient = new QueryClient();
const wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("Auth Page", () => {
  it("renders the Auth page with title", () => {
    render(<Register />, { wrapper });
    expect(screen.getByText("Prazer ter você no ConectaBem!")).toBeInTheDocument();
  });

  it("calls useCredentialLogin mutation and updates store", async () => {
    const { api } = require("@/libs/api");
    api.post.mockResolvedValue({ data: { id: "123" } });

    const TestComponent = () => {
      const mutation = useCredentialLogin();
      return (
        <button onClick={() => mutation.mutate({ email: "teste@test.com" })}>
          Test Login
        </button>
      );
    };

    render(<TestComponent />, { wrapper });
    fireEvent.click(screen.getByText("Test Login"));

    await waitFor(() => expect(setIdUserMock).toHaveBeenCalledWith("123"));
  });

  it("calls console.error on API error", async () => {
    const { api } = require("@/libs/api");
    const fakeError = new Error("API failure");
    api.post.mockRejectedValueOnce(fakeError);

    const { result } = renderHook(() => useCredentialLogin(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync({ email: "test@example.com" });
      } catch (e) {
        // não quebra o teste
      }
    });

    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Erro ao enviar o OTP:",
      fakeError
    );
  });
});
