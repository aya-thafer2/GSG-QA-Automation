import LoginPage from "../../../../support/pageObjects/OrangeHRM/LoginPage";
import DashboardActions from "../../../../support/pageObjects/OrangeHRM/dashboard/actions";
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
<<<<<<< HEAD
       // DashboardActionsObj.getTimeAtWorkCard().then();
=======
       // DashboardActionsObj.getTimeAtWorkCard().then(); 
>>>>>>> 14aa070290149225ca15d996508aebad7a7cf9f2
    })
})