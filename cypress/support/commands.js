// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "./request/product";
import './assertions/shoppingCartModel';
import "../e2e/online-shop/desafio-4/data.json"

Cypress.Commands.add("login", (usuario, password) => {
  cy.session(
    "loginWithSession",
    () => {
      cy.request({
        method: "POST",
        url: `${Cypress.env().baseUrlAPI}/login`,
        body: {
          username: usuario,
          password: password,
        },
      }).then((respuesta) => {
        window.localStorage.setItem("token", respuesta.body.token);
        window.localStorage.setItem("user", respuesta.body.user.username);
        window.localStorage.setItem("userId", respuesta.body.user._id);
        Cypress.env().token = respuesta.body.token;
      });
    }
  );
});

Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-cy=${selector}]`)
})

Cypress.Commands.add('formatNumberToUSCurrency', (number) => {
  return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
  });
});