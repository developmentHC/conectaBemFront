import { render, screen } from "@testing-library/react"
import { Footer } from "../../components/Footer/Footer"

describe("Footer", () => {
    it("renderiza o Footer com as seções e links", () => {
        render(<Footer />)

        expect(screen.getByText("Profissionais")).toBeInTheDocument()
        expect(screen.getByText("Suporte")).toBeInTheDocument()
        expect(screen.getByText("Sobre o Conecta Bem")).toBeInTheDocument()
    })
})