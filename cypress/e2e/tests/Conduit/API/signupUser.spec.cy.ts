import addNewUser from "../../../../support/helpers/Conduit/signupHelper"

describe("Conduit - Signup Logic", () => {

    it.only('Conduit - Signup: User Should be Able to Create new Account', () => {
        addNewUser.addNewUserViaAPI();
    })

})