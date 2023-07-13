/// <reference types="cypress" />
import moment from "moment";

import selectBusiness from "../utils/select-business";

describe("Property Flow Test", () => {
  beforeEach(() => {
    selectBusiness(); // login & select business
  });

  it("should create get update successfully", () => {
    cy.get(`[data-cy="menu-parent-property"]`).click(); // find & click menu property
    cy.get(`[data-cy="menu-subs-property"]`).click(); // find & click sub menu property
    cy.wait(2000);
    cy.get(`[data-cy="create-new"]`).click(); // find & click button create property
    const name = `Property Cypress ${moment().format("YYYY MMM DD HH:mm:ss")}`; // create unique name
    cy.get(`[data-cy="property-name"]`).focus().type(name); // find & type input name property
    const code = `PTEST_${moment().format("mm:ss")}`; // create unique code
    cy.get(`[data-cy="property-code"]`).focus().type(code); // find & type input code property
    cy.get(`[data-cy="property-type"]`).focus(); // find & focus input select type
    cy.get(`[data-cy="option-property-type"]`).first().click(); // find & click first option type
    cy.get(`[data-cy="property-type"]`).blur(); // find & blur input select type
    cy.wait(2000);
    cy.get(`[data-cy="submit-property"]`).click(); // find & click button create property
    cy.contains(name); // checking if data name exist on new data table after refetch
    cy.contains(code); // checking if data code exist on new data table after refetch
    cy.wait(2000);
    cy.get(`[data-cy="update-property-${name}"]`).click(); // find & click button edit property
    cy.wait(2000);
    const newname = `Property Cypress ${moment().format(
      "YYYY MMM DD HH:mm:ss"
    )}`; // create new unique data name
    cy.get(`[data-cy="property-name"]`) // find input property name
      .should("have.value", name) // compare is have same value
      .focus()
      .clear()
      .type(newname); // input new value
    const newcode = `PTEST_${moment().format("mm:ss")}`; // create new unique data code
    cy.get(`[data-cy="property-code"]`) // find input property code
      .should("have.value", code) // compare is have same value
      .focus()
      .clear()
      .type(newcode); // input new value
    cy.get(`[data-cy="property-type"]`).focus(); // find & focus on input select property type
    cy.get(`[data-cy="option-property-type"]`).eq(2).click(); // find & click on second option property type
    cy.get(`[data-cy="property-type"]`).blur(); // find & blur on input select property type
    cy.wait(3000);
  });
});
