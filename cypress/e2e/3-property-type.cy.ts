/// <reference types="cypress" />
import moment from "moment";
import selectBusiness from "../utils/select-business";

describe("Property Type Flow Test", () => {
  beforeEach(() => {
    selectBusiness(); // login & select business
  });

  it("should create get update successfully", () => {
    cy.get(`[data-cy="menu-parent-property"]`).click(); // find & click menu property
    cy.get(`[data-cy="menu-subs-property_type"]`).click(); // find sub menu & click property type
    cy.wait(2000);
    cy.get(`[data-cy="create-new"]`).click(); // find & click button create
    const name = `Property Test Cypress - ${moment().format(
      "YYYY MMM DD HH:mm:ss"
    )}`; // create uniqe name
    cy.get(`[data-cy="property-name"]`).focus().type(name); // find & type input name property type
    cy.get(`[data-cy="property-price"]`).clear().type("1000000").blur(); // find & type input name property price
    cy.wait(2000);
    cy.get(`[data-cy="property-btn-submit"]`).click(); // find & click button create
    cy.wait(2000);
    cy.contains(name); // checking if new data created succesfully & contains in get new data table
    cy.get(`[data-cy="edit-property-type-${name}"]`).click(); // find & click button
    cy.wait(2000);
    const update = `Property Test Cypress Update - ${moment().format(
      "YYYY MMM DD HH:mm:ss"
    )}`; // create new uniqe name
    cy.get(`[data-cy="property-name"]`) // find input name
      .should("have.value", name) // checking is have correct value
      .focus()
      .clear()
      .type(update); // input new data
    cy.get(`[data-cy="property-price"]`).focus().clear().type("1500000").blur(); // find & update value input price
    cy.wait(2000);
    cy.get(`[data-cy="property-btn-submit"]`).click(); // find & click button save
    cy.wait(2000);
    cy.contains(update); // checking if data successfully updated
  });
});
