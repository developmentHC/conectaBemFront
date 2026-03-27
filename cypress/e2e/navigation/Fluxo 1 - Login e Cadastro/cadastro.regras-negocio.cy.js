describe("Cadastro – Regras de Negócio (Registro de Paciente)", () => {
  beforeEach(() => {
    // Acesso direto ao endpoint de registro
    cy.visit("/auth/registro-paciente");
  });

  context("Nome – análise de valores limite", () => {
    const cenarios = [
      {
        descricao: "Nome com menos de 3 caracteres",
        nome: "Jo",
        erro: "Nome deve ter pelo menos 3 caracteres",
      },
      {
        descricao: "Nome com exatamente 3 caracteres",
        nome: "Ana",
        erro: null,
      },
      {
        descricao: "Nome com mais de 3 caracteres",
        nome: "Carlos",
        erro: null,
      },
    ];

    cenarios.forEach(({ descricao, nome, erro }) => {
      it(descricao, () => {
        preencherFormularioBase({
          nome,
          dataNascimento: "01011995",
          cep: "01001000",
          numero: "10",
        });

        if (erro) {
          cy.contains(erro).should("be.visible");
        } else {
          cy.contains("Nome deve ter pelo menos 3 caracteres").should("not.exist");
        }
      });
    });
  });

  context("Idade – análise de valores limite", () => {
    const cenarios = [
      {
        descricao: "Menor de idade",
        data: "01012010",
        erro: "Você deve ser maior de idade para se cadastrar na plataforma!",
      },
      {
        descricao: "Idade acima do permitido",
        data: "01011900",
        erro: "Digite uma data de nascimento válida",
      },
      {
        descricao: "Idade válida",
        data: "01011995",
        erro: null,
      },
    ];

    cenarios.forEach(({ descricao, data, erro }) => {
      // TODO: MUI DatePicker readonly input does not accept keyboard input in CI.
      // Re-enable once the component exposes a proper data-testid or allows typing.
      it.skip(descricao, () => {
        preencherFormularioBase({
          nome: "Teste Idade",
          dataNascimento: data,
          cep: "01001000",
          numero: "10",
        });

        if (erro) {
          cy.contains(erro).should("be.visible");
        } else {
          cy.contains("Digite uma data de nascimento válida").should("not.exist");
          cy.contains("Você deve ser maior de idade").should("not.exist");
        }
      });
    });
  });

  context("CEP – formato e existência", () => {
    const cenarios = [
      {
        descricao: "Formato inválido",
        cep: "12345",
        erro: "CEP inválido",
      },
      {
        descricao: "CEP inexistente",
        cep: "00000000",
        erro: "CEP não encontrado",
      },
      {
        descricao: "CEP válido",
        cep: "01001000",
        erro: null,
      },
    ];

    cenarios.forEach(({ descricao, cep, erro }) => {
      it(`Validação de CEP: ${descricao}`, () => {
        preencherFormularioBase({
          nome: "Teste CEP",
          dataNascimento: "01011990",
          cep,
          numero: "10",
        });

        if (erro) {
          cy.contains(erro).should("be.visible");
        } else {
          cy.contains("CEP inválido").should("not.exist");
          cy.contains("CEP não encontrado").should("not.exist");
        }
      });
    });
  });
});

/**
 * Helper local (simples e explícito)
 */
function preencherFormularioBase({ nome, dataNascimento, cep, numero }) {
  cy.get('input[name="name"]').scrollIntoView().clear({ force: true }).type(nome, { force: true });
  cy.get('input[placeholder="DD/MM/AAAA"]').then(($input) => {
    $input.prop("readOnly", false);
    cy.wrap($input).scrollIntoView().clear({ force: true }).type(dataNascimento, { force: true });
  });
  cy.get('input[name="cepResidencial"]')
    .scrollIntoView()
    .clear({ force: true })
    .type(cep, { force: true });
  cy.get('input[name="numeroResidencial"]')
    .scrollIntoView()
    .clear({ force: true })
    .type(numero, { force: true });
}
