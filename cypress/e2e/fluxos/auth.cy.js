describe('Fluxo 1 - Login e Cadastro', () => {
  describe('Login via Código de Verificação', () => {
    it('Usuário visita a página inicial', () => {
      cy.visit('/')
    })

    it('Usuário clica no botão "Entrar"', () => {
      cy.get('.MuiButtonBase-root').click()
    })

    it('Usuário digita um email válido e clica no botão "Continuar"', () => {
      cy.get('#email').type('qa@exemplo.com')
      cy.get('.gap-7 > .MuiButtonBase-root').click()
    })
  })
})