import { render, screen } from "@testing-library/react";
import { WelcomeSectionHeader } from "../WelcomeSectionHeader";

describe("WelcomeSectionHeader", () => {
  it("should render with the correct props", async () => {
    const { container } = render(
      <WelcomeSectionHeader
        href="/"
        title="Teste com batata frita"
        description="Descrição com teste"
        progress={20}
      />
    );

    const title = await screen.findByTestId("title");
    const description = await screen.findByTestId("description");
    const progress = container.querySelector(".MuiLinearProgress-bar");
    expect(title).toBeInTheDocument();

    expect(title.innerHTML).toBe("Teste com batata frita");
    expect(description.innerHTML).toBe("Descrição com teste");
    expect(progress).toHaveStyle("transform: translateX(-80%);");
  });
});
