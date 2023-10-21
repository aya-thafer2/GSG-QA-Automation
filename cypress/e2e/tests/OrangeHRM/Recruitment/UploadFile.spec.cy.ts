import checkCandidates from "../../../../support/helpers/OrangeHRM/CandidatesHelper";
import LoginPage from "../../../../support/pageObjects/OrangeHRM/LoginPage";
const LoginObj: LoginPage = new LoginPage();
import Candidates from "../../../../support/pageObjects/OrangeHRM/Recruitment/Candidates";
const CandidatesObj: Candidates = new Candidates();

describe("Recruitment - Candidates", () => {
    beforeEach(() => {
        cy.intercept("/web/index.php/dashboard/index").as("LoginPage");
        cy.visit("/");
        LoginObj.login("Admin", "admin123");

    });

    it("Recruitment - Upload CV", () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate")
        const file = 'cypress/fixtures/CV.txt'
        CandidatesObj.UploadFile(file);
    });

});
