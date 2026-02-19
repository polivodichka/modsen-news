import { CATEGORIES } from "cypress/support/commands";

describe("Главная страница", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("отображает заголовок «News Categories»", () => {
    cy.contains("h2", "News Categories");
  });

  it("отображает заголовок «Latest News»", () => {
    cy.contains("h2", "Latest News");
  });

  it("отображает все 6 карточек категорий", () => {
    Object.values(CATEGORIES).forEach((label) =>
      cy.contains(label).should("be.visible")
    );
  });

  it("отображает статьи ", () => {
    cy.contains("h2", "Headline for sport article");
    cy.contains("Headline for technology article");
  });

  it("карточка отображает дату 08.08.2021", () => {
    cy.contains("08.08.2021");
  });

  it("карточка отображает автора «By Journalist»", () => {
    cy.contains("By Journalist");
  });

  it("карточка без thumbnail рендерит эмодзи 📰", () => {
    cy.contains("📰");
  });

  it("карточка отображает trailText", () => {
    cy.contains("Short text for sport article");
  });

  it("клик по карточке статьи переходит на /articles/...", () => {
    cy.get("[href^='/articles/']").first().click();
    cy.url().should("include", "/articles/");
  });

  it("клик по карточке категории переходит на /category/...", () => {
    cy.get("[href^='/category/']").first().click();
    cy.url().should("include", "/category/");
  });
});
