import checkCandidates from "../../../../support/helpers/OrangeHRM/CandidatesHelper";
import LoginPage from "../../../../support/pageObjects/OrangeHRM/LoginPage";
const LoginObj: LoginPage = new LoginPage();

describe("Recruitment - Candidates", () => {
  beforeEach(() => {
    cy.intercept("/web/index.php/dashboard/index").as("LoginPage");
    cy.visit("/");
    LoginObj.login("Admin", "admin123");
  });

  it("Recruitment - Check the Count of Candidates", () => {
    checkCandidates.checkCandidatesCount();
  });

  it.only("Recruitment - Schedule Interview for Candidates", () => {
    checkCandidates.addCandidateViaAPI();
  });

});
