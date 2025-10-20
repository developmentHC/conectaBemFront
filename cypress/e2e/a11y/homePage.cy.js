describe('Teste de Acessibilidade - Home Page (Cypress + Axe)', () => {
  it('Deve carregar a Home Page sem violações de acessibilidade', () => {
    cy.visit('/'); 
    cy.injectAxe();

    cy.checkA11y(null, null, (violations) => {
      if (violations.length) {
        cy.task('log', `${violations.length} violações de acessibilidade encontradas na Home Page:`);

        const dadosViolacoes = violations.map(({ id, impact, description, nodes }) => ({
          id,
          impacto: impact,
          descricao: description,
          elementos_afetados: nodes.length
        }));

        cy.task('table', dadosViolacoes);
      } else {
        cy.task('log', 'Nenhuma violação de acessibilidade encontrada na Home Page 🎉');
      }
    });
  });
});
