import { CATEGORIES } from "cypress/support/commands";

describe("Header / Навигация", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("отображает логотип «M News»", () => {
    cy.get("header").contains("M News").should("be.visible");
  });

  it("логотип является ссылкой на главную «/»", () => {
    cy.get("header").contains("M News").should("have.attr", "href", "/");
  });

  it("отображает ссылку «News» на главную", () => {
    cy.get("header nav").contains("News").should("be.visible");
  });

  it("отображает все ссылки категорий", () => {
    Object.values(CATEGORIES).forEach((label) => {
      cy.get("header nav").contains(label).should("be.visible");
    });
  });

  Object.keys(CATEGORIES).forEach((key) => {
    it(`ссылка «${CATEGORIES[key as keyof typeof CATEGORIES]}» ведёт на /category/${key}`, () => {
      cy.get("header nav")
        .contains(CATEGORIES[key as keyof typeof CATEGORIES])
        .click();
      cy.url().should("include", `/category/${key}`);
    });
  });

  it("header является sticky (имеет sticky позиционирование)", () => {
    cy.get("header").should("have.css", "position", "sticky");
  });
});
