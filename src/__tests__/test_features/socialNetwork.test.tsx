import { render, screen, fireEvent } from "@testing-library/react";
import { SocialNetwork } from "@/features/auth/components/SocialNetwork/SocialNetwork";
import { signIn } from "next-auth/react";

// Mock do signIn para não chamar a API real
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

// Mock do next/image para não quebrar nos testes
/* eslint-disable @next/next/no-img-element */
jest.mock("next/image", () => ({
  __esModule: true,  
 /* eslint-disable @next/next/no-img-element */
 default: (props: any) => <img alt="mocked" {...props} /> }))


describe("SocialNetwork component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // limpa chamadas anteriores do signIn
  });

  it("renders both Google and Facebook login buttons with icons", () => {
    render(<SocialNetwork />);

    const googleButton = screen.getByRole("button", { name: /entrar com o google/i });
    const facebookButton = screen.getByRole("button", { name: /entrar com o facebook/i });

    expect(googleButton).toBeInTheDocument();
    expect(googleButton.querySelector("img")).toBeInTheDocument();

    expect(facebookButton).toBeInTheDocument();
    expect(facebookButton.querySelector("img")).toBeInTheDocument();
  });

  it("calls signIn correctly for Google button", () => {
    render(<SocialNetwork />);
    const googleButton = screen.getByRole("button", { name: /entrar com o google/i });

    fireEvent.click(googleButton);
    expect(signIn).toHaveBeenCalledWith("google", { callbackUrl: "/" });
  });

  it("calls signIn correctly for Facebook button", () => {
    render(<SocialNetwork />);
    const facebookButton = screen.getByRole("button", { name: /entrar com o facebook/i });

    fireEvent.click(facebookButton);
    expect(signIn).toHaveBeenCalledWith("facebook");
  });
});
