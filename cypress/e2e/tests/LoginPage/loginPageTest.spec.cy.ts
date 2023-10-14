
import LoginTest from "../../../support/pageObjects/OrangeHRM/LoginTest";

const LoginObj: LoginTest = new LoginTest();
describe("Login Page", () => {
    beforeEach(() => {
      cy.intercept("/web/index.php/dashboard/index").as("LoginPage");
      cy.visit("/"); 
      cy.fixture('loginDetails').as('loginDetails');
    });

    it("Valid User Login and valid Username valid pass", () => {
        cy.get('@loginDetails').then((data: any)=>{
            LoginObj.validLogin(data[0].Username, data[0].Password);
        })
    });
    
    it("Invalid Username and Valid Password", () => {
        cy.get('@loginDetails').then((data: any)=>{
            LoginObj.invalidLogin(data[1].Username, data[1].Password);
        })
    });

    it("Valid Username and Invalid Password", () => {
        cy.get('@loginDetails').then((data: any)=>{
            LoginObj.invalidLogin(data[2].Username, data[2].Password);
        })
    });

    it("Invalid Username and Invalid Password", () => {
        cy.get('@loginDetails').then((data: any)=>{
            LoginObj.invalidLogin(data[3].Username, data[3].Password);
        })
    });

    it("Empty Username and Empty Password", () => {
            LoginObj.invalidLoginBothEmpty();
    });

    it("Empty Username", () => {
        cy.get('@loginDetails').then((data: any)=>{
            LoginObj.invalidLoginUserEmpty(data[4].Password);
        })
    });

    it("Empty Password", () => {
        cy.get('@loginDetails').then((data: any)=>{
            LoginObj.invalidLoginPassEmpty(data[5].Username);
        })
    });

    it("Check Password type", () => {
        LoginObj.checkPassType();
    });
  });