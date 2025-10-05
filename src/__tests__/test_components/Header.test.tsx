import { render, screen, fireEvent } from "@testing-library/react"
import { Header } from "../../components/Header"
import { useSession } from "next-auth/react"


// mocks default
const pushMock = jest.fn()
const backMock = jest.fn()
let mockPathname = "/"

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock, back: backMock }),
  usePathname: () => mockPathname,
}))

const setMockPathname = (value: string) => {
  mockPathname = value
}

jest.mock("../../libs/getMenuData", () => ({
  useMenuData: () => ({
    data: [
      { menuitemtext: "Home", menuitemlink: { url: "/" }, showtounsignedusers: true },
      {
        menuitemtext: "Serviços",
        menuitemlink: { url: "" },
        submenu: [
          { text: "Opção A", link: "/opcao-a", showtoWhichUsertype: "patient" },
          { text: "Opção B", link: "/opcao-b", showtoWhichUsertype: "professional" },
        ],
        showtounsignedusers: true,
      },
      { menuitemtext: "Quero Ser Um Profissional", menuitemlink: { url: "" }, showtounsignedusers: true },
    ],
  }),
}))

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
  SessionProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    document.body.classList.remove("overflow-hidden")
    setMockPathname("/")

    ;(useSession as jest.Mock).mockReturnValue({
      status: "unauthenticated",
      data: null,
    })
  })

  it("renderiza o Header com o logo", () => {
    render(<Header />)
    const logo = screen.getAllByAltText("logo")
    
    expect(logo).toHaveLength(2)
    fireEvent.click(logo[0])
    expect(pushMock).toHaveBeenCalledWith("/")

    fireEvent.click(logo[1])
    expect(pushMock).toHaveBeenCalledWith("/")
  })
  
  it("mostra menu de paciente quando usuário é paciente", () => {
    render(<Header />)

    fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }))
    expect(screen.getByRole("heading", { name: "Serviços" })).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "Quero Ser Um Profissional" })
    ).toBeInTheDocument()
  })

  it("mostra menu de profissional quando usuário é profissional", () => {
    ;(useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: { user: { type: "professional" } },
    })

    render(<Header />)
  })

  it("abre e fecha o menu mobile ao clicar no botão", () => {
    render(<Header />)

    const openButton = screen.getByRole("button", { name: "Abrir menu" })
    fireEvent.click(openButton)
    expect(screen.getByRole("button", { name: "Fechar menu" })).toBeInTheDocument()
    expect(document.body.classList.contains("overflow-hidden")).toBe(true)

    const closeButton = screen.getByRole("button", { name: "Fechar menu" })
    fireEvent.click(closeButton)
    expect(screen.getByRole("button", { name: "Abrir menu" })).toBeInTheDocument()
    expect(document.body.classList.contains("overflow-hidden")).toBe(false)
  })

  it("mostra botão 'Entrar' quando usuário não está autenticado", () => {
    render(<Header />)

    const loginLink = screen.getByRole("link", { name: "Entrar" })

    fireEvent.click(loginLink)

    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveAttribute("href", "/auth")
  })

  it("mostra submenu ao passar mouse em item com submenu", () => {
    render(<Header />)
    const menuItem = screen.getByText("Serviços")
    fireEvent.mouseEnter(menuItem)
    expect(screen.getByText("Opção A")).toBeInTheDocument()
  })

  it("esconde submenu ao sair do item (onMouseLeave)", () => {
    render(<Header />)
    const menuItem = screen.getByText("Serviços")

    // abre
    fireEvent.mouseEnter(menuItem)
    expect(screen.getByText("Opção A")).toBeInTheDocument()

    // fecha
    fireEvent.mouseLeave(menuItem)
    expect(screen.queryByText("Opção A")).not.toBeInTheDocument()
  })

  it("renderiza botão de voltar na home mas ele fica oculto (opacity-0)", () => {
    setMockPathname("/auth")
    render(<Header />)

    const loginLink = screen.getByRole("link", { name: "Entrar" })

    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveClass("opacity-0")
    expect(loginLink).toHaveClass("lg:hidden")
  })

  it("chama router.back() ao clicar no botão de voltar", () => {
    setMockPathname("/auth")
    render(<Header />)
    const backButton = screen.getByRole("button", { name: 'Voltar' })
    fireEvent.click(backButton)
    expect(backMock).toHaveBeenCalled()
  })

  it("leva para /search ao clicar no botão de busca", () => {
    render(<Header />)
    const searchButton = screen.getByRole("button", { name: "Buscar" })
    fireEvent.click(searchButton)
    expect(pushMock).toHaveBeenCalledWith("/search")
  })
})
