import {
  createTempAccount,
  enterOTPCode,
  extractOTPCode,
  getEmailContent,
  getLatestEmail,
} from "../../utils/mailtm.js";

describe("Fluxo de Cadastro", () => {
  let emailAddress;
  let token;

  beforeEach(() => {
    cy.visit("/");

    // Abre o modal de cadastro/login
    cy.get(".MuiButtonBase-root").click();
  });

  context("Validações do campo de e-mail", () => {
    it("Impede continuar com campo de e-mail vazio", () => {
      cy.get("#email").should("be.visible").should("have.value", "");

      cy.get(".gap-7 > .MuiButtonBase-root").should("be.disabled");
    });

    it("Impede continuar com e-mail inválido", () => {
      cy.get("#email").type("emailinvalido");

      cy.get(".gap-7 > .MuiButtonBase-root").should("be.disabled");
    });
  });

  context("Cadastro completo com código via e-mail (Mail.tm)", () => {
    before(() => {
      createTempAccount().then((res) => {
        emailAddress = res.emailAddress;
        token = res.token;
      });
    });

    it("Realiza cadastro com sucesso usando OTP recebido por e-mail", () => {
      cy.get("#email").type(emailAddress);
      cy.get(".gap-7 > .MuiButtonBase-root").click();

      cy.wait(5000);

      getLatestEmail(token)
        .then((message) => {
          return getEmailContent(token, message.id);
        })
        .then((emailRes) => {
          const emailBody = emailRes.body.text || emailRes.body.html || "";

          const codigo = extractOTPCode(emailBody);
          if (!codigo) {
            throw new Error("Não foi possível extrair o código OTP");
          }

          enterOTPCode(codigo);
        });

      // Continuação do fluxo de cadastro
      cy.get(".gap-5 > :nth-child(1)").click();
      cy.get(".css-1bqevrn > a > .MuiButtonBase-root").click();

      cy.get("#name").type("Nome Teste");
      cy.get(":nth-child(2) > .MuiFormControl-root > .MuiInputBase-root").type("28121999");

      cy.get('[name="cepResidencial"]').type("18870140");
      cy.get('[name="numeroResidencial"]').type("306");

      cy.wait(5000);
      cy.get("form.flex > .MuiButton-root").click();

      cy.get(":nth-child(1) > .flex-col > .flex-wrap > :nth-child(1) > .p-2").click();
      cy.get(":nth-child(2) > .flex-col > .flex-wrap > :nth-child(1) > .p-2").click();
      cy.get(".md\\:max-w-\\[450px\\] > .gap-8 > .MuiButtonBase-root").click();

      cy.get(":nth-child(2) > .p-2").click();
      cy.get(".flex-col-reverse > .MuiButton-contained").click();

      cy.get(".PrivateSwitchBase-input").click();
      cy.get(".gap-6 > .MuiButtonBase-root").click();

      cy.get(".go2072408551").should("have.text", "Cadastro realizado e sessão iniciada!");
    });
  });
});
