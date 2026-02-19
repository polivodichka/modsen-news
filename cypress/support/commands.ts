import { encodeArticleId } from "../../src/entities/article/model/article-id";

Cypress.Commands.add("visitArticle", (params = {}) => {
  const { category = "sport", title = `article`, options } = params;

  const id = encodeArticleId(`${category}/${title}`);
  cy.visit(`/articles/${id}`, options);
});

export const CATEGORIES = {
  business: "Business",
  entertainment: "Entertainment",
  health: "Health",
  science: "Science",
  sport: "Sports",
  technology: "Technology",
};
