import Vacancies from "../../pageObjects/OrangeHRM/Recruitment/Vacancies";
const vacanciesObj = new Vacancies();

export default class vacanciesHelper {

    private static vacancyId: any;
    private static vacancyName: any;
    private static newVacancyData: any;

    static setVacancyId(vacancyId: number) {
        this.vacancyId = vacancyId;
    }
    static getVacancyId(): number {
        return this.vacancyId;
    }
    static setVacancyName(vacancyName: string) {
        this.vacancyName = vacancyName;
    }
    static getVacancyName(): string {
        return this.vacancyName;
    }
    static setNewVacancyData(newVacancyData: object) {
        this.newVacancyData = newVacancyData;
    }
    static getNewVacancyData(): object {
        return this.newVacancyData;
    }

    static createVacancy() {
        vacanciesObj.selectRecruitment();
        vacanciesObj.selectVacanciesTap();
        this.addNewVacancy();
    }
    static addNewVacancy() {
        this.createVacancyDataBody();
        const VacancyData = this.getNewVacancyData();

        cy.api({
            method: "POST",
            url: `/web/index.php/api/v2/recruitment/vacancies`,
            body: VacancyData

        }).then((response) => {
            cy.wrap(response.status).should('eq', 200);
            this.setVacancyId(response.body.data.id);
            this.setVacancyName(response.body.data.name);
            cy.log(
                "****************Add Vacancy Successfully***************",
                this.getVacancyId(),
                this.getVacancyName()
            );
        });

    }

    static createVacancyDataBody() {
        this.setNewVacancyData(
            {
                name: "QA",
                jobTitleId: 9,
                employeeId: 2,
                numOfPositions: null,
                description: "",
                status: true,
                isPublished: true
            }
        )
    }

    static openVacancyFromEditMode() {
        cy.visit(`/web/index.php/recruitment/addJobVacancy/${this.getVacancyId()}`).as('VacancyFromEditMode')
    }

    static attachFile() {
        const filePath = 'cypress/fixtures/Vacancy.xlsx'
        this.openVacancyFromEditMode();
        vacanciesObj.clickAddAttachmentBtn();
        vacanciesObj.uploadFile(filePath);
    }
    static attachFileAssertion() {
        cy.get(" .oxd-table-cell:nth-child(2)").should("contain", "Vacancy");
    }

    static deleteVacancy() {
        cy.api({
            method: "DELETE",
            url: '/web/index.php/api/v2/recruitment/vacancies',
            body: {
                ids: [this.getVacancyId()]
            }
        }).then((response) => {
            expect(response).property("status").to.equal(200);
        });
    }

}