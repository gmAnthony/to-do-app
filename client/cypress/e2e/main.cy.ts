describe("Todo CRUD Operations", () => {
  before(() => {
    cy.visit("/");
    cy.contains("label", "Anonymous").parent().click();
    cy.get("button").contains("Enter").click();
  });

  it("should create a new todo", () => {
    cy.get("input[type='title']").type("New Todo");
    cy.get("input[type='description']").type("New Todo Description");
    cy.get("button").contains("Add Todo").click();
    cy.contains("class", "todo-item").should("have.length", 1);
    cy.contains("class", "todo-title").should("have.text", "New Todo");
    cy.contains("class", "todo-description").should(
      "have.text",
      "New Todo Description"
    );
  });

  it("should update a todo", () => {
    // Update the todo
  });

  it("should delete a todo", () => {
    // Delete the todo
  });

  // after(() => {
  //   cy.get("button").contains("Sign out").click();
  // });
});
