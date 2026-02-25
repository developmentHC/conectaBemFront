/**
 * Cria uma conta temporária no Mail.tm e obtém um token JWT.
 * Retorna um objeto Cypress chainable contendo { emailAddress, token }.
 */
export function createTempAccount() {
  const uniqueId = Date.now();
  const password = 'senha123';
  let emailAddress;
  let token;

  return cy.request('GET', 'https://api.mail.tm/domains').then((res) => {
    const domain = res.body['hydra:member'][0].domain;
    emailAddress = `teste_${uniqueId}@${domain}`;

    return cy.request({
      method: 'POST',
      url: 'https://api.mail.tm/accounts',
      body: { address: emailAddress, password },
      failOnStatusCode: false
    });
  }).then((createRes) => {
    if (createRes.status === 201) {
      cy.log('Conta criada com sucesso:', emailAddress);
    } else if (createRes.status === 409) {
      cy.log('Conta já existe, continuando...');
    } else {
      throw new Error('Erro ao criar conta: ' + JSON.stringify(createRes.body));
    }

    return cy.request('POST', 'https://api.mail.tm/token', {
      address: emailAddress,
      password
    });
  }).then((tokenRes) => {
    token = tokenRes.body.token;
    cy.log('Token JWT obtido com sucesso.');

    return cy.wrap({ emailAddress, token });
  });
}

/**
 * Busca o e-mail mais recente recebido no Mail.tm.
 */
export function getLatestEmail(token, retries = 10, delay = 3000) {
  return cy.request({
    method: 'GET',
    url: 'https://api.mail.tm/messages',
    headers: { Authorization: `Bearer ${token}` }
  }).then((res) => {
    const messages = res.body['hydra:member'];
    if (messages?.length > 0) {
      return cy.wrap(messages[0]);
    } else if (retries > 0) {
      cy.wait(delay);
      return getLatestEmail(token, retries - 1, delay);
    } else {
      throw new Error('Nenhum e-mail recebido no Mail.tm');
    }
  });
}

/**
 * Retorna o conteúdo completo de um e-mail.
 */
export function getEmailContent(token, messageId) {
  return cy.request({
    method: 'GET',
    url: `https://api.mail.tm/messages/${messageId}`,
    headers: { Authorization: `Bearer ${token}` }
  });
}

/**
 * Extrai o código OTP (4 dígitos) do corpo do e-mail.
 */
export function extractOTPCode(emailBody) {
  const match = emailBody.match(/(\d{4})/);
  return match ? match[1] : null;
}

/**
 * Digita o código OTP nos campos da tela.
 */
export function enterOTPCode(codigo) {
  const digitos = codigo.split('');
  digitos.forEach((digito, index) => {
    cy.get(`.gap-3 > .flex-col > .flex > :nth-child(${index + 1})`)
      .should('be.visible')
      .clear()
      .type(digito, { delay: 200 });
  });
}