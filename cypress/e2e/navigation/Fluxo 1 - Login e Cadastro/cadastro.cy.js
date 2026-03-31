import { enterOTPCode } from "../../utils/mailtm.js";

describe("Fluxo de Cadastro", () => {
  beforeEach(() => {
    cy.visit("/");

    // Abre o modal de cadastro/login
    cy.get(".MuiButtonBase-root").first().click();
  });

  context("Validações do campo de e-mail", () => {
    it("Impede continuar com campo de e-mail vazio", () => {
      cy.get('input[name="email"]').should("be.visible").should("have.value", "");

      cy.get(".gap-7 > .MuiButtonBase-root").should("be.disabled");
    });

    it("Impede continuar com e-mail inválido", () => {
      cy.get('input[name="email"]').type("emailinvalido");

      cy.get(".gap-7 > .MuiButtonBase-root").should("be.disabled");
    });
  });

  context("Cadastro completo de paciente com bypass de OTP", () => {
    it("Realiza cadastro completo usando email @test.conectabem.com e OTP 0000", () => {
      // Usa email único por execução para não colidir com runs anteriores
      const email = `qa-paciente-${Date.now()}@test.conectabem.com`;

      cy.get('input[name="email"]').type(email);
      cy.get(".gap-7 > .MuiButtonBase-root").click();

      // Bypass ativo: sem espera de e-mail externo, OTP fixo 0000
      enterOTPCode("0000");

      // Seleciona tipo de conta: Paciente
      cy.get(".gap-5 > :nth-child(1)").click();
      cy.get(".css-1bqevrn > a > .MuiButtonBase-root").click();

      // Dados pessoais
      cy.get('input[name="name"]').type("QA Paciente Teste");
      cy.get('input[placeholder="DD/MM/AAAA"]').then(($input) => {
        $input.prop("readOnly", false);
        cy.wrap($input).scrollIntoView().clear({ force: true }).type("28121999", { force: true });
      });

      cy.get('[name="cepResidencial"]').scrollIntoView().type("18870140", { force: true });
      cy.get('[name="numeroResidencial"]').scrollIntoView().type("306", { force: true });

      cy.wait(5000);
      cy.get("form.flex > .MuiButton-root").click();

      // Especialidades
      cy.get(":nth-child(1) > .flex-col > .flex-wrap > :nth-child(1) > button").click();
      cy.get(":nth-child(2) > .flex-col > .flex-wrap > :nth-child(1) > button").click();
      cy.get(".md\\:max-w-\\[450px\\] > .gap-8 > .MuiButtonBase-root").click();

      // Preferências de atendimento
      cy.get(":nth-child(2) > .p-2").click();
      cy.get(".flex-col-reverse > .MuiButton-contained").click();

      // Termos
      cy.get(".PrivateSwitchBase-input").click();
      cy.get(".gap-6 > .MuiButtonBase-root").click();

      cy.get(".go2072408551").should("have.text", "Cadastro realizado e sessão iniciada!");
    });
  });
});
