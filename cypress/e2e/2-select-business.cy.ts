/// <reference types="cypress" />
import selectBusiness from "../utils/select-business";

describe("Select Business Flow Test", () => {
  it("should select business successfully", () => {
    selectBusiness(); // login & select business
  });

  it("should change business successfully", () => {
    selectBusiness(); // login & select business
    cy.get(`[data-cy="menu-user"]`).click(); // find & click menu user
    cy.get(`[data-cy="change-business"]`).click(); // find & click menu change user
    cy.wait(2000);
    cy.url().should("include", "/select-business"); // checking is direct correctly
    cy.get(`[data-cy="btn-business"]`).first().click(); // find & click first option
    cy.wait(2000);
    cy.url().should("include", "/dashboard"); // checking is direct correctly
  });
});
