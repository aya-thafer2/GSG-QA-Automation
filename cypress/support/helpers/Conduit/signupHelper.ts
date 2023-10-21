//Conduit Task-1

import userInit from "../../init/Conduit/userInit"

export const URLs = {
    users: 'https://conduit.productionready.io/api/users'
}

export default class addNewUser {
    static addNewUserViaAPI() {
        cy.addNewUser(URLs.users, userInit.initUser())
    }
} 