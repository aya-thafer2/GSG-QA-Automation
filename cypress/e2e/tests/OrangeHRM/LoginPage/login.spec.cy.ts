import LoginPage from "../../../../support/pageObjects/OrangeHRM/LoginPage";
<<<<<<< HEAD
=======

>>>>>>> 14aa070290149225ca15d996508aebad7a7cf9f2
const LoginObj: LoginPage = new LoginPage();

describe("Login", () => {
  beforeEach(() => {
    cy.intercept("/web/index.php/dashboard/index").as("LoginPage");
    cy.visit("/"); //https://opensource-demo.orangehrmlive.com >>> baseUrl in cypress.config.js
  });
  it.only("Login - Check login", () => {
    LoginObj.login("Admin", "admin123");
  });
  it('Login - Check forget password', () => {
    LoginObj.checkForgetPassword("Admin");
  }
  )
});
