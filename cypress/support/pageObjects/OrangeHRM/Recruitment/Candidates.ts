class Candidates {

    elements = {
        goToRecruitment: () => cy.get(':nth-child(5) > .oxd-main-menu-item'),
        table: () => cy.get('.oxd-table-body'),
        scheduleInterviewBtn: () => cy.get('.oxd-button--success'),
        interviewTitle: () => cy.get(':nth-child(2) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input'),
        interviewer: () => cy.get('[placeholder="Type for hints..."]'),
        selectInterviewer: () => cy.get('.oxd-autocomplete-dropdown > :nth-child(1)'),
        Date: () => cy.get('.oxd-date-input > .oxd-icon'),
        selectDate: () => cy.get(':nth-child(12) > .oxd-calendar-date'),
        saveBtn: () => cy.get('.oxd-button--secondary'),

        userName: () => cy.getByPlaceholder("Username"),
        password: () => cy.getByPlaceholder("Password"),
        loginBTN: () => cy.get("[type=submit]"),
        firstName: () => cy.get('.oxd-input.oxd-input--active.orangehrm-firstname'),
        lastName: () => cy.get(".oxd-input.oxd-input--active.orangehrm-lastname"),
        email: () => cy.getByPlaceholder("Type here").first(),
        uploadFile: () => cy.get('input[type="file"]'),
        SaveBtn: () => cy.get('button[type="submit"]'),
        uploadIcon: () => cy.get(".oxd-icon.bi-upload.oxd-file-input-icon"),
        FileName: () => cy.get('.orangehrm-file-preview > .oxd-text')
    }

    goToRecruitment() {
        this.elements.goToRecruitment().click();
        cy.contains(':nth-child(5) > .oxd-main-menu-item', "Recruitment").should("exist");
    }
    getRecords(APItotal: number) {
        this.elements.table().find('.oxd-table-row').should('have.length', APItotal);
    }
    clickScheduleInterviewBtn() {
        this.elements.scheduleInterviewBtn().click({ force: true })
    }
    clickSaveBtn() {
        this.elements.saveBtn().click({ force: true })
    }
    fillScheduleInterviewData() {
        this.elements.interviewTitle().type('IDC')
        this.elements.interviewer().type('s')
        cy.wait(2000)
        this.elements.selectInterviewer().click();
        this.elements.Date().click();
        this.elements.selectDate().click();
        this.clickSaveBtn();
        cy.wait(5000);
        cy.contains('.orangehrm-recruitment-status > .oxd-text', "Status: Interview Scheduled").should("exist");
    }

    UploadFile(file: string) {
        cy.fixture('employeeInfo').as('EmpInfo');
        cy.get('@EmpInfo').then((data: any) => {
            this.elements.firstName().type(data.FirstName);
            this.elements.lastName().type(data.LastName);
            this.elements.email().type(data.Email);
            this.elements.uploadFile().selectFile(file, { force: true })
            this.elements.saveBtn().click()
            this.elements.FileName().should('contain', data.FileName)
        })

    }

}
export default Candidates;