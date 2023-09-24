

export function waitUntilVisible(loader:Cypress.Chainable<JQuery<HTMLElement>>) {
    loader.should('exist');
  }
  export function waitUntilVisible2(loader:Cypress.Chainable<JQuery<HTMLElement>>) {
    loader.should('not.exist');
  }