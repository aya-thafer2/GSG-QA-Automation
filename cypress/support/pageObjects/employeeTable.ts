import { waitUntilVisible2 } from "../utils/waitUntilVisible";

class employeeTable
{
    private JobTitle: any;
    private EmploymentStatus: any;
    private SubUnit: any;
    private Supervisor: any;

    setJobTitle(JobTitle: string){
        this.JobTitle=JobTitle;
    }
    getJobTitle():string{
        return this.JobTitle;
    }

    setEmploymentStatus(EmploymentStatus: string){
        this.EmploymentStatus=EmploymentStatus;
    }
    getEmploymentStatus():string{
        return this.EmploymentStatus;
    }

    setSubUnit(SubUnit: string){
        this.SubUnit=SubUnit;
    }
    getSubUnit():string{
        return this.SubUnit;
    }

    setSupervisor(firstName: string, lastName:string){
        this.Supervisor=firstName+' '+lastName;
    }
    getSupervisor():string{
        return this.Supervisor;
    }

    elements={
        employeeListTap:()=>cy.get('.oxd-topbar-body-nav > ul > :nth-child(2)'),
        employeeNameHeader:()=>cy.get('.orangehrm-edit-employee-name > .oxd-text'),
        EmployeeName: () => cy.get(':nth-child(1) > .oxd-input'),
        EmployeeId: () => cy.get(':nth-child(2) > .oxd-input'),
        SaveBtn: () => cy.get('.oxd-form-actions > .oxd-button--secondary'),
        loader: ()=>cy.get('.oxd-loading-spinner')
    }

    clickEmployeeListTap(){
        this.elements.employeeListTap().click();
    }

    getDetails(EmpNumber:any):Cypress.Chainable<any> {
        return cy.wrap(undefined).then(() => {
        //**Get Employee Job Details**
        cy.request({
            method: "GET",
            url: `/web/index.php/api/v2/pim/employees/${EmpNumber}/job-details`,
          }).then((response) => {
            expect(response).property("status").to.equal(200);
            this.setJobTitle(response.body?.data.jobTitle.title);
            this.setEmploymentStatus(response.body?.data.empStatus.name);
            this.setSubUnit(response.body?.data.subunit.name);
          });
        //**Get Employee Supervisor**
        cy.request({
            method: "GET",
            url: `/web/index.php/api/v2/pim/employees/${EmpNumber}/supervisors`,
          }).then((response) => {
            expect(response).property("status").to.equal(200);
            this.setSupervisor(response.body?.data[0].supervisor.firstName,response.body?.data[0].supervisor.lastName);
          });
        });
    }

    checkSearch(id:string, firstName:string, middleName:string ,lastName:string){
        this.elements.EmployeeId().type(id);
        this.elements.SaveBtn().click({force:true});
        waitUntilVisible2(this.elements.loader());
        //***Assertion***
        //Assertion for Employee Record
        cy.contains('.oxd-table-card > .oxd-table-row',id).should("exist");
        //Assertion for Employee ID
        cy.contains('.oxd-table-body > :nth-child(1) > .oxd-table-row > :nth-child(2) > div',id).should("exist");
        //Assertion for Employee First Name & Middle Name
        cy.contains('.oxd-table-body > :nth-child(1) > .oxd-table-row > :nth-child(3) > div',firstName+' '+middleName).should("exist");
        //Assertion for Employee Last Name
        cy.contains('.oxd-table-body > :nth-child(1) > .oxd-table-row > :nth-child(4) > div',lastName).should("exist");
        //Assertion for Employee Job Title
        cy.contains('.oxd-table-body > :nth-child(1) > .oxd-table-row > :nth-child(5) > div',this.getJobTitle()).should("exist");
        //Assertion for Employee Employment Status
        cy.contains('.oxd-table-body > :nth-child(1) > .oxd-table-row > :nth-child(6) > div',this.getEmploymentStatus()).should("exist");
        //Assertion for Employee Subunit
        cy.contains('.oxd-table-body > :nth-child(1) > .oxd-table-row > :nth-child(7) > div',this.getSubUnit()).should("exist");
        //Assertion for Employee Supervisor
        cy.contains('.oxd-table-body > :nth-child(1) > .oxd-table-row > :nth-child(8) > div',this.getSupervisor()).should("exist");
    }

}
export default employeeTable;