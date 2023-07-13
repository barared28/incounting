/// <reference types="cypress" />
import login from "../utils/login";

describe("Login Flow Test", () => {
  it("should login successfully", () => {
    login();
  });
});
