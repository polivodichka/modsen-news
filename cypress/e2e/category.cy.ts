import { CATEGORIES } from "cypress/support/commands";

describe("Страница категории", () => {
  it("отображает статьи категории sport", () => {
    cy.visit("/category/sport");
    cy.contains("Headline for sport article").should("be.visible");
  });

  it("отображает статьи категории technology", () => {
    cy.visit("/category/technology");
    cy.contains("Headline for technology article").should("be.visible");
  });

  it("карточка отображает дату 08.08.2021", () => {
    cy.visit("/category/sport");
    cy.contains("08.08.2021").should("be.visible");
  });

  it("карточка отображает автора «By Journalist»", () => {
    cy.visit("/category/sport");
    cy.contains("By Journalist").should("be.visible");
  });

  it("карточка без byline отображает название секции", () => {
    cy.visit("/category/entertainment");
    cy.contains(/^By /).should("exist");
  });

  it("клик по карточке переходит на /articles/...", () => {
    cy.visit("/category/sport");
    cy.get("[href^='/articles/']").first().click();
    cy.url().should("include", "/articles/");
  });

  Object.keys(CATEGORIES).forEach((id) => {
    it(`/category/${id} рендерится с заголовком "${CATEGORIES[id as keyof typeof CATEGORIES]}"`, () => {
      cy.visit(`/category/${id}`);
      cy.get("h1")
        .should("contain", "Category -")
        .and("contain", CATEGORIES[id as keyof typeof CATEGORIES]);
    });
  });

  it("несуществующая категория показывает 404", () => {
    cy.visit("/category/nonexistent-xyz", { failOnStatusCode: false });
    cy.contains("404").should("be.visible");
    cy.contains("Oops, source not found :(").should("be.visible");
  });

  it("на 404 странице есть кнопка Back", () => {
    cy.visit("/category/nonexistent-xyz", { failOnStatusCode: false });
    cy.contains("Back").should("be.visible");
  });
});
