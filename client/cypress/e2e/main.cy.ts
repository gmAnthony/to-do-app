describe("Todo CRUD Operations", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("label", "Anonymous").parent().click();
    cy.get("button").contains("Enter").click();
  });

  it("should create a new todo", () => {
    cy.intercept({
      method: "POST",
      url: "**/todos",
    }).as("createTodo");

    cy.get("input[type='title']").type("New Todo");
    cy.get("input[type='description']").type("New Todo Description");
    cy.get("button").contains("Add Todo").click();
    cy.wait("@createTodo");
    cy.get(".todo-list ul").contains("New Todo").should("exist");
  });

  it("should update a todo", () => {
    cy.intercept({
      method: "PATCH",
      url: "**/todos/*",
    }).as("updateTodo");

    cy.intercept({
      method: "POST",
      url: "**/todos",
    }).as("createTodo");

    cy.get("input[type='title']").type("New Todo");
    cy.get("input[type='description']").type("New Todo Description");
    cy.get("button").contains("Add Todo").click();
    cy.wait("@createTodo");
    cy.get(".todo-list ul").contains("New Todo").should("exist");
    cy.get(".todo-list ul")
      .first()
      .within(() => {
        cy.get('[data-testid="edit-todo"]').click();
      });
    cy.get('[data-testid="editable-todo-title-input')
      .clear()
      .type("Updated Todo");
    cy.get('[data-testid="editable-todo-description-input')
      .clear()
      .type("Updated Todo Description");
    cy.get('[data-testid="save-todo"]').click();
    cy.wait("@updateTodo");

    cy.get(".todo-list ul").contains("Updated Todo").should("exist");
  });

  it("should delete a todo", () => {
    cy.intercept({
      method: "DELETE",
      url: "**/todos/*",
    }).as("deleteTodo");

    cy.intercept({
      method: "POST",
      url: "**/todos",
    }).as("createTodo");

    cy.get("input[type='title']").type("New Todo");
    cy.get("input[type='description']").type("New Todo Description");
    cy.get("button").contains("Add Todo").click();
    cy.wait("@createTodo");
    cy.get(".todo-list ul").contains("New Todo").should("exist");

    cy.get(".todo-list ul")
      .first()
      .within(() => {
        cy.get('[data-testid="delete-todo"]').click();
      });
    cy.wait("@deleteTodo");
    cy.get(".todo-list ul").contains("New Todo").should("not.exist");
  });

  afterEach(() => {
    cy.get("button").contains("Sign out").click();
  });
});
