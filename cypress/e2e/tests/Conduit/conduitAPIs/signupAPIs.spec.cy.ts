const { faker } = require('@faker-js/faker');
import addUser from "../../../../support/helpers/Conduit/signupHelper";
import genericFunctions from "../../../../support/helpers/Conduit/genericFunctions";

describe("Conduit - Signup Account", () => {

    it('Cxxx1: Conduit - Create new Account', () => {

        cy.request({
            method: 'POST',
            url: 'https://conduit.productionready.io/api/users',
            body:
            {
                user: {
                    username: faker.internet.userName(),
                    email: faker.internet.email(),
                    password: "123456"
                }
            }
        })
    })

    it('Cxxx2: Conduit - Create new Account', () => {
        // FIXME: random generator function
        addUser.conduitNewUserUsingAPI(faker.internet.userName(), faker.internet.email(), faker.internet.password())
    })

    it.only('Cxxx3: Conduit - Create new Account', () => {
        cy.addUser(genericFunctions.createPayload()).then((response) => {
            expect(response.status).to.equal(201);
        });
    })

})