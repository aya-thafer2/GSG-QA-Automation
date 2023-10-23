//OrangeHRM-Task1
class Candidates {

    elements = {
        goToRecruitment: () => cy.get(':nth-child(5) > .oxd-main-menu-item'),
        table: () => cy.get('.oxd-table-body'),
    }

    goToRecruitment() {
        this.elements.goToRecruitment().click();
        cy.contains(':nth-child(5) > .oxd-main-menu-item', "Recruitment").should("exist");
    }
    getRecords(APItotal: number) {
        this.elements.table().find('.oxd-table-row').should('have.length', APItotal);
    }

}
export default Candidates;