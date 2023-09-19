class addEmployee
{
    elements={
    
        MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
        AddEmp: () => cy.get('.oxd-button--secondary'),
        EmployeeInputName: () => cy.get('.--name-grouped-field'),
        saveNewEmp: () => cy.get('button[type="submit"]'),
        createLoginDetailsSwitch: () => cy.get('.oxd-switch-wrapper'),
        //FIXME:
        userName: () => cy.get('#app > div.oxd-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > form > div.orangehrm-employee-container > div.orangehrm-employee-form > div:nth-child(4) > div > div:nth-child(1) > div > div:nth-child(2) > input'),
        password: () => cy.get('[type="password"]'),
        saveBtn:()=> cy.get('[type="submit"]'),
        editEmployeeName: ()=> cy.get('.orangehrm-edit-employee-name'),
    }
    

    addNewEmployee(firstName:string, MiddleName:string, LastName:string){
     this.elements.MainMenuItems().contains('PIM').click();
     this.elements.AddEmp().eq(1).click();
     this.elements.EmployeeInputName().children().eq(0).type(firstName);
     this.elements.EmployeeInputName().children().eq(1).type(MiddleName);
     this.elements.EmployeeInputName().children().eq(2).type(LastName);
     this.elements.createLoginDetailsSwitch().click();
     this.elements.userName().type("teemmoonnn");
     this.elements.password().eq(0).type('123456h');
     this.elements.password().eq(1).type('123456h');
     this.elements.saveBtn().click();
     //FIXME: 
     cy.wait(5000); //FIX THIS 
     this.elements.editEmployeeName().should('exist');

    }

}
export default addEmployee;