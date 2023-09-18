import LoginPage from "../../../pageObjects/LoginPage";


const LoginObj:LoginPage = new LoginPage();

describe("Check Forget Password", ()=>{
    beforeEach(() => {
        cy.intercept("/web/index.php/dashboard/index").as("LoginPage");
        cy.visit("/");

    })
    it("Forget Password",()=>{
        LoginObj.checkForgetPassword('Admin');
        LoginObj.assertion();
    })
})