declare namespace Cypress {
  interface Chainable {
    visitArticle({
      category,
      title,
      options,
    }?: {
      category?: string;
      title?: string;
      options?: Partial<VisitOptions>;
    }): Chainable;
  }
}
