//Conduit Task-1

//This file must be imported in the e2e.js file in order for cypress to recognize it as a custom command 
import { CreateEmployeePayload } from "../../ConduitAPI-interfaces/payload/userAPIpayload";
import { CreateEmployeeResponse } from "../../ConduitAPI-interfaces/response/userAPIresponse";

declare global {
    namespace Cypress {
        interface Chainable {
            addNewUser: (requestURL: string, userPayload: CreateEmployeePayload) => Chainable<CreateEmployeeResponse>;
        }
    }
}


Cypress.Commands.add('addNewUser', (requestURL: string, userPayload: CreateEmployeePayload) => {
    return cy.api({
        method: 'POST',
        url: requestURL,
        body: userPayload,
        headers: {
            'Content-Type': 'application/json'
        }
    }).its('body');
});
