import employee from "../interfaces/employee";
import { waitUntilVisible } from "../utils/waitUntilVisible";

class addEmployee
{
    private id: any;
    setEmpLoyeeId(id: string){
        this.id=id;
    }
    getEmployeeId():string{
        return this.id;
    }
    elements={
    // TODO: get elements using inpector
        MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
        AddEmp: () => cy.get('.oxd-button--secondary'),
        EmployeeInputName: () => cy.get('.--name-grouped-field'),
        employeeId:()=>cy.get('.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input'),
        saveNewEmp: () => cy.get('button[type="submit"]'),
        createLoginDetailsSwitch: () => cy.get('.oxd-switch-wrapper'),
        userName: () => cy.get(':nth-child(4) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input'),
        password: () => cy.get('[type="password"]'),
        saveBtn:()=> cy.get('[type="submit"]'),
        editEmployeeName: ()=> cy.get('.orangehrm-edit-employee-name'),
        loader: ()=>cy.get('.oxd-loading-spinner')
    }
    
    selectPIM(){
        this.elements.MainMenuItems().contains('PIM').click();
    }

    addNewEmployee(firstName:string, MiddleName:string, LastName:string){
     this.elements.AddEmp().eq(1).click();
     this.elements.EmployeeInputName().children().eq(0).type(firstName);
     this.elements.EmployeeInputName().children().eq(1).type(MiddleName);
     this.elements.EmployeeInputName().children().eq(2).type(LastName);
     this.EmployeeId().then((employeeId) => {
        this.setEmpLoyeeId(employeeId);
      });
      
     console.log(this.getEmployeeId());
     
     this.elements.createLoginDetailsSwitch().click();
     const currentDate = new Date();
     this.elements.userName().type("Hakoona"+currentDate.getMilliseconds().toString());
     this.elements.password().eq(0).type('123456h');
     this.elements.password().eq(1).type('123456h');
     this.elements.saveBtn().click();
     waitUntilVisible(this.elements.loader());
     this.elements.editEmployeeName().should('contain',firstName+' '+LastName);
     
    }
    EmployeeId(): Cypress.Chainable<any> {
        // Return the Cypress.Chainable<string> from the .invoke('val') command
        return this.elements.employeeId().invoke('val').then((value) => {
          return value;
        });
      }
      
     
    

    
}
export default addEmployee;