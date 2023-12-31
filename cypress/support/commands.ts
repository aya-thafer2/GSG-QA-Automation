// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


declare namespace Cypress {
    interface Chainable<Subject> {
        getByPlaceholder: typeof getByPlaceholder;
        addUser: typeof addUser;
    }
}

//----------------------------------------------------------------
//OrangeHRM
function getByPlaceholder(field: string) {
    return cy.get('[placeholder="' + field + '"]');
}
Cypress.Commands.add('getByPlaceholder', getByPlaceholder);


//----------------------------------------------------------------
//Conduit Practice
// const URLs = {
//     users: `${Cypress.config().baseUrl}/api/users`
// }
function addUser(payload: any) {
    return cy.api({
        method: "POST",
        // url: URLs.users,
        url: 'https://conduit.productionready.io/api/users',
        body: payload,
    });
}
Cypress.Commands.add('addUser', addUser);
