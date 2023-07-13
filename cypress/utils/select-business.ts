/// <reference types="cypress" />

const selectBusiness = () => {
  cy.visit("/"); // visit page
  cy.url().should("include", "/login"); // check if redirect successfully
  cy.get("#email").type("administrator@internal.com"); // find & type email / username
  cy.get("#password").type("00000000"); // find & type password
  cy.get("#login-submit").click(); // find & click submit login
  cy.url().should("include", "/business"); // check if successfully logined & directly successfully
  cy.wait(1000); // waiting dom load
  cy.get(`[data-cy="btn-business"]`, { timeout: 10000 }).first().click(); // find & click first option business
  cy.wait(1000); // wait dom load
  cy.url().should("contain", "/dashboard"); // check if successfully select & success directly
};

export default selectBusiness;
