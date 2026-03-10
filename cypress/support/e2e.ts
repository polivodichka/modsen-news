import "./commands";
import "@testing-library/cypress/add-commands";
import "@cypress/code-coverage/support";

// Игнор внутренней ошибку Next.js/Turbopack в dev-режиме:
// "Failed to execute 'measure' on 'Performance': cannot have a negative time stamp"
// Это баг dev-сборки Next.js

Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("measure") ||
    err.message.includes("negative time stamp") ||
    err.message.includes("Performance")
  ) {
    return false;
  }
  return true;
});
