import { enterOTPCode } from "../../utils/mailtm.js";

/**
 * Testes de login com bypass de OTP para usuários @test.conectabem.com.
 *
 * Pré-requisito: ambiente deve ter NODE_ENV !== "production" e TEST_OTP_ENABLED=true.
 * Os usuários seed (patient e professional) devem estar presentes no banco — rode
 * `npm run seed:test-users` na API antes de executar essa suite.
 */
describe("Login com bypass de OTP — usuários de teste", () => {
  before(function () {
    if (!Cypress.env("OTP_BYPASS_ENABLED")) {
      this.skip();
    }
  });

  beforeEach(() => {
    cy.visit("/");
    cy.get(".MuiButtonBase-root").first().click();
  });

  it("Paciente faz login com OTP 0000", () => {
    cy.get('input[name="email"]').type("patient@test.conectabem.com");
    cy.get(".gap-7 > .MuiButtonBase-root").click();

    enterOTPCode("0000");

    cy.url({ timeout: 15000 }).should("not.include", "/auth");
  });

  it("Profissional faz login com OTP 0000", () => {
    cy.get('input[name="email"]').type("professional@test.conectabem.com");
    cy.get(".gap-7 > .MuiButtonBase-root").click();

    enterOTPCode("0000");

    cy.url({ timeout: 15000 }).should("not.include", "/auth");
  });
});
