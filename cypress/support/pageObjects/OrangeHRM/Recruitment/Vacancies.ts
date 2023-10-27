class Vacancies {

    elements = {
        MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
        RecruitmentTaps: () => cy.get('.oxd-topbar-body-nav'),
        VacancyEditModeBtns: () => cy.get('.oxd-button')
    }

    selectRecruitment() {
        this.elements.MainMenuItems().contains('Recruitment').click();
    }
    selectVacanciesTap() {
        this.elements.RecruitmentTaps().contains('Vacancies').click();
    }
    clickAddAttachmentBtn() {
        this.elements.VacancyEditModeBtns().contains('Add').click()
    }
    uploadFile(filePath: string) {
        cy.get('input[type="file"]').selectFile(filePath, { force: true });
        cy.get(".oxd-form-actions").eq(1).contains("Save").click();
    }

}
export default Vacancies;