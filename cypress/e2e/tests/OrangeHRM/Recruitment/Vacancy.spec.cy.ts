import vacanciesHelper from '../../../../support/helpers/OrangeHRM/VacanciesHelper'
import LoginPage from "../../../../support/pageObjects/OrangeHRM/LoginPage";
const LoginObj: LoginPage = new LoginPage();

describe("Recruitment - Vacancies attached files", () => {
    beforeEach(() => {
        cy.intercept("/web/index.php/dashboard/index").as("LoginPage");
        cy.visit("/");
        LoginObj.login("Admin", "admin123");
        vacanciesHelper.createVacancy();
    });

    afterEach(() => {
        vacanciesHelper.deleteVacancy();
    });

    it("Vacancy: Attach Excel File", () => {
        vacanciesHelper.attachFile();
        vacanciesHelper.attachFileAssertion();
    });

    it.only("Vacancy: Check Downloaded Excel File", () => {
        vacanciesHelper.attachFile();
        vacanciesHelper.attachFileAssertion();
        vacanciesHelper.downloadAttachment();
        vacanciesHelper.convertXlsxToJson();
    });

});
