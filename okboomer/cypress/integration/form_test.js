describe("Testing our form inputs", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000/")
  })
  it("Adds text to inputs and submits form", function() {
    cy.get('input[name="name"]')
      .type("Christina")
      .should("have.value", "Christina");
    cy.get("input[name='email']")
      .type("email@gmail.com")
      .should("have.value", "email@gmail.com")
    cy.get("input[name='password']")
      .type("password")
      .should("have.value", "password")
});
});