import LoginPage from "../../../pageObjects/LoginPage";


const LoginObj:LoginPage = new LoginPage();

describe("Login", () => {
    beforeEach(() => {
        cy.intercept("/web/index.php/dashboard/index").as("LoginPage");
        cy.visit("/");//https://opensource-demo.orangehrmlive.com >>> baseUrl in cypress.config.js

    })
    it("check login",()=>{
        LoginObj.login('Admin','admin123');
    })
})

