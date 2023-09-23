import employee from "../interfaces/employee";

class employeeTable
{
    elements={
    
        EmployeeName: () => cy.get('#app > div.oxd-layout > div.oxd-layout-container > div.oxd-layout-context > div > div.oxd-table-filter > div.oxd-table-filter-area > form > div.oxd-form-row > div > div:nth-child(1) > div > div:nth-child(2) > div > div > input'),
        EmployeeId: () => cy.get('#app > div.oxd-layout > div.oxd-layout-container > div.oxd-layout-context > div > div.oxd-table-filter > div.oxd-table-filter-area > form > div.oxd-form-row > div > div:nth-child(2) > div > div:nth-child(2) > input'),
        //TODO: the other fields
        SaveBtn: () => cy.get('.oxd-form-actions > .oxd-button--secondary'),

    }
    findEmp(employeeId:string,response: any): employee{
        let emp:employee;
        emp = response.body?.data.find((empl: employee) => empl.employeeId === employeeId);
        return emp;
    }
    getEmployeeInfo(employeeId: string){
        cy.request({
            method: "GET",
            url: "/web/index.php/api/v2/pim/employees", 
          }).then((response) => {
            expect(response).property("status").to.equal(200);
            this.findEmp(employeeId,response);
           console.log( this.findEmp(employeeId,response));
          });
    }

    //TODO: key,value
    checkSearch(EmployeeName:string,id:string){
        this.elements.EmployeeName().type(EmployeeName);
        this.elements.EmployeeId().type(id);
        this.elements.SaveBtn().click({force:true});
    }
   

}
export default employeeTable;