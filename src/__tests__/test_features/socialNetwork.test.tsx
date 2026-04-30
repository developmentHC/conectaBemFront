/* eslint-disable @next/next/no-img-element -- Tests mock next/image with a bare img element to keep the DOM simple. */
import { fireEvent, render, screen } from "@testing-library/react";
import { signIn } from "next-auth/react";
import { SocialNetwork } from "@/features/auth/components/SocialNetwork/SocialNetwork";

// Mock do signIn para não chamar a API real
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

// Mock do next/image para não quebrar nos testes
/* eslint-disable @next/next/no-img-element */
jest.mock("next/image", () => ({
  __esModule: true,
  // biome-ignore lint/performance/noImgElement: jest mock requires plain img element
  default: (props: any) => <img {...props} alt={props.alt || ""} />,
}));

describe("SocialNetwork component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // limpa chamadas anteriores do signIn
  });

  it("renders Google login button with icon", () => {
    render(<SocialNetwork />);

    const googleButton = screen.getByRole("button", { name: /entrar com o google/i });

    expect(googleButton).toBeInTheDocument();
    expect(googleButton.querySelector("img")).toBeInTheDocument();
  });

  it("calls signIn correctly for Google button", () => {
    render(<SocialNetwork />);
    const googleButton = screen.getByRole("button", { name: /entrar com o google/i });

    fireEvent.click(googleButton);
    expect(signIn).toHaveBeenCalledWith("google", { callbackUrl: "/" });
  });

  it("does not render a Facebook button (removed)", () => {
    render(<SocialNetwork />);
    const facebookButton = screen.queryByRole("button", { name: /entrar com o facebook/i });
    expect(facebookButton).not.toBeInTheDocument();
  });
});
