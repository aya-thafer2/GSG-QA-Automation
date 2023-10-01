import LoginPage from "../../../support/pageObjects/LoginPage";
import DashboardActions from "../../../support/pageObjects/dashboard/actions";
const LoginObj:LoginPage = new LoginPage();
const DashboardActionsObj:DashboardActions = new DashboardActions();

describe("Time at Work",()=>{
    beforeEach(()=>{
        cy.intercept("/web/index.php/dashboard/index").as("LoginPage");
        cy.visit("/");
        LoginObj.login("Admin", "admin123");
    })
//TODO: rami said sth abt branch on Github ++ finish this
    it("Dashboard - Select Time",()=>{
       // DashboardActionsObj.getTimeAtWorkCard().then();
    })
})