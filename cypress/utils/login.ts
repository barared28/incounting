/// <reference types="cypress" />

const login = () => {
  cy.visit("/"); // visit page
  cy.url().should("include", "/login"); // check if redirect successfully
  cy.get("#email").type("administrator@internal.com"); // find & type email / username
  cy.get("#password").type("00000000"); // find & type password
  cy.get("#login-submit").click(); // find & click submit login
  cy.url().should("include", "/business"); // check if successfully logined & directly successfully
};

export default login;
