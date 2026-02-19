describe("Страница статьи", () => {
  it("отображает дату 08.08.2021", () => {
    cy.visitArticle();
    cy.get("article time").should("contain", "08.08.2021");
  });

  it("отображает автора Journalist", () => {
    cy.visitArticle();
    cy.get("article").contains("Journalist").should("be.visible");
  });

  it("отображает bodyText статьи", () => {
    cy.visitArticle();
    cy.contains("Body text for sport article").should("be.visible");
  });

  it("отображает кнопку Back", () => {
    cy.visitArticle();
    cy.contains("Back").should("be.visible");
  });

  it("BackButton без lastCategory возвращает на главную", () => {
    cy.visit("/");
    cy.visitArticle();
    cy.contains("Back").click();
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });

  it("BackButton с lastCategory возвращает на /category/sport", () => {
    cy.visit("/");
    cy.window().then((win) => {
      win.localStorage.setItem("last-category", JSON.stringify("sport"));
    });
    cy.visitArticle();
    cy.contains("Back").click();
    cy.url().should("include", "/category/sport");
  });

  it("несуществующая статья показывает 404", () => {
    cy.visitArticle({ title: "404", options: { failOnStatusCode: false } });
    cy.contains("404").should("be.visible");
    cy.contains("Oops, source not found :(").should("be.visible");
  });
});
