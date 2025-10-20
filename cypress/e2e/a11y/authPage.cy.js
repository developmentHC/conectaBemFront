describe('Teste de Acessibilidade - Login Page (Cypress + Axe)', () => {
  it('Deve carregar a Página de Login sem violações de acessibilidade', () => {
    cy.visit('/auth'); 
    cy.injectAxe();

    cy.checkA11y(null, null, (violations) => {
      if (violations.length) {
        cy.task('log', `${violations.length} violações de acessibilidade encontradas na Página de Login:`);

        const dadosViolacoes = violations.map(({ id, impact, description, nodes }) => ({
          id,
          impacto: impact,
          descricao: description,
          elementos_afetados: nodes.length
        }));

        cy.task('table', dadosViolacoes);
      } else {
        cy.task('log', 'Nenhuma violação de acessibilidade encontrada na Página de Login 🎉');
      }
    });
  });
  
  it('Deve carregar a Página de Registro sem violações de acessibilidade', () => {
    cy.visit('/auth/registro'); 
    cy.injectAxe();

    cy.checkA11y(null, null, (violations) => {
      if (violations.length) {
        cy.task('log', `${violations.length} violações de acessibilidade encontradas na Página de Login:`);

        const dadosViolacoes = violations.map(({ id, impact, description, nodes }) => ({
          id,
          impacto: impact,
          descricao: description,
          elementos_afetados: nodes.length
        }));

        cy.task('table', dadosViolacoes);
      } else {
        cy.task('log', 'Nenhuma violação de acessibilidade encontrada na Página de Login 🎉');
      }
    });
  });

  it('Deve carregar a Página de Registro de Paciente sem violações de acessibilidade', () => {
    cy.visit('/auth/registro-paciente'); 
    cy.injectAxe();

    cy.checkA11y(null, null, (violations) => {
      if (violations.length) {
        cy.task('log', `${violations.length} violações de acessibilidade encontradas na Página de Login:`);

        const dadosViolacoes = violations.map(({ id, impact, description, nodes }) => ({
          id,
          impacto: impact,
          descricao: description,
          elementos_afetados: nodes.length
        }));

        cy.task('table', dadosViolacoes);
      } else {
        cy.task('log', 'Nenhuma violação de acessibilidade encontrada na Página de Login 🎉');
      }
    });
  });

  it('Deve carregar a Página de Registro de Profissional sem violações de acessibilidade', () => {
    cy.visit('/auth/registro-profissional'); 
    cy.injectAxe();

    cy.checkA11y(null, null, (violations) => {
      if (violations.length) {
        cy.task('log', `${violations.length} violações de acessibilidade encontradas na Página de Login:`);

        const dadosViolacoes = violations.map(({ id, impact, description, nodes }) => ({
          id,
          impacto: impact,
          descricao: description,
          elementos_afetados: nodes.length
        }));

        cy.task('table', dadosViolacoes);
      } else {
        cy.task('log', 'Nenhuma violação de acessibilidade encontrada na Página de Login 🎉');
      }
    });
  });
});
