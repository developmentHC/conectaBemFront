import Registro from "@/app/auth/registro/page";
import {fireEvent, render, screen} from "@testing-library/react";

describe("Registro Page", () => {
    it("should render the Registro page", () => {
        render(<Registro />);
        expect(screen.getByText("Tudo pronto para começar")).toBeInTheDocument();
        expect(screen.getByText("Você deseja se cadastrar como:")).toBeInTheDocument();
    })

    it("abre o modal ao clicar em 'Paciente' e mostra texto correto", () => {
        render(<Registro />);
        
        const pacienteButton = screen.getByText("Paciente");
        fireEvent.click(pacienteButton);
        expect(screen.getByText("Tem certeza que deseja se cadastrar como")).toBeInTheDocument();
        expect(screen.getByText('paciente?')).toBeInTheDocument();
    })

    it("abre o modal ao clicar em 'Profissional' e mostra texto correto", () => {
        render(<Registro />);

        const profissionalBtn = screen.getByRole("button", { name: "Profissional" });
        fireEvent.click(profissionalBtn);

        expect(screen.getByText("Tem certeza que deseja se cadastrar como")).toBeInTheDocument();
        expect(screen.getByText("profissional?")).toBeInTheDocument();
    });
})