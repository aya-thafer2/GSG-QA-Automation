import employee from "../interfaces/employee";
import { waitUntilVisible2 } from "../utils/waitUntilVisible";

class employeeTable
{
    elements={
        employeeListTap:()=>cy.get('.oxd-topbar-body-nav > ul > :nth-child(2)'),
        EmployeeName: () => cy.get(':nth-child(1) > .oxd-input'),
        EmployeeId: () => cy.get(':nth-child(2) > .oxd-input'),
        //TODO: the other fields
        SaveBtn: () => cy.get('.oxd-form-actions > .oxd-button--secondary'),
        record:()=>cy.get('.oxd-table-card > .oxd-table-row'),
        loader: ()=>cy.get('.oxd-loading-spinner')

    }

    clickEmployeeListTap(){
        this.elements.employeeListTap().click();
    }

    // findEmp(employeeId:string,response: any): employee{
    //     let emp = response.body?.data.find((empl: employee) => empl.employeeId === employeeId);
    //     return emp;
    // }
    // getEmployeeInfo(employeeId: string):any{
    //     cy.request({
    //         method: "GET",
    //         url: "/web/index.php/api/v2/pim/employees", 
    //       }).then((response) => {
    //         expect(response).property("status").to.equal(200);
    //         return this.findEmp(employeeId,response);
    //       });
    // }

    getJobDetails(EmpNumber:any){
        cy.request({
            method: "GET",
            url: `/web/index.php/api/v2/pim/employees/${EmpNumber}/job-details`,
          }).then((response) => {
            expect(response).property("status").to.equal(200);
            console.log(response.body);
          });
    }

    //TODO: key,value
    checkSearch(id:string){
        this.elements.EmployeeId().type(id);
        this.elements.SaveBtn().click({force:true});
        waitUntilVisible2(this.elements.loader());
        cy.contains('.oxd-table-card > .oxd-table-row',id).should("exist");
        cy.contains('.oxd-table-body > :nth-child(1) > .oxd-table-row > :nth-child(2) > div',id).should("exist");
    }
   

}
export default employeeTable;