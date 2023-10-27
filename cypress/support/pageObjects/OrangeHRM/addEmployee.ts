import { waitUntilVisible2 } from "../../utils/waitUntilVisible";
import GenericHelper from "../../helpers/Conduit/genericFunctions";
import { Assertion } from "chai";
class addEmployee {
  private id: any;
  private empNumber: any;
  private userName: string='';
  private leaveId: any;

  setEmpLoyeeId(id: string) {
    this.id = id;
  }
  getEmployeeId(): string {
    return this.id;
  }
  setEmpNumber(num: number) {
    this.empNumber = num;
  }
  getEmpNumber(): number {
    return this.empNumber;
  }
  
  elements = {
    MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
    AddEmp: () => cy.get('.oxd-button--secondary'),
    EmployeeInputName: () => cy.get('.--name-grouped-field'),
    employeeId: () => cy.get('.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input'),
    saveNewEmp: () => cy.get('button[type="submit"]'),
    createLoginDetailsSwitch: () => cy.get('.oxd-switch-wrapper'),
    userName: () => cy.get(':nth-child(4) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input'),
    password: () => cy.get('[type="password"]'),
    saveBtn: () => cy.get('[type="submit"]'),
    editEmployeeName: () => cy.get('.orangehrm-edit-employee-name'),
    loader: () => cy.get('.oxd-loading-spinner'),

  }

  selectPIM() {
    this.elements.MainMenuItems().contains('PIM').click();
  }
  employeePersonalDetails(firstName: string, lastName: string) {
    cy.intercept("/web/index.php/pim/viewPersonalDetails/empNumber/" + this.getEmpNumber()).as("EmployeePersonalDetails");
    cy.visit("/web/index.php/pim/viewPersonalDetails/empNumber/" + this.getEmpNumber());
    //This function is imported from utils and it waits for the loader until it does Not Exist
    waitUntilVisible2(this.elements.loader());
    //Assertion for Employee Name in the Header
    cy.contains('.orangehrm-edit-employee-name > .oxd-text', firstName + ' ' + lastName).should("exist");
  }
  addNewEmployee(firstName: string, middleName: string, LastName: string, employeeId: string): Cypress.Chainable<any> {
    return cy.wrap(undefined).then(() => {
      cy.request({
        method: "POST",
        url: "/web/index.php/api/v2/pim/employees",
        body: {
          firstName: firstName,
          middleName: middleName,
          lastName: LastName,
          empPicture: null,
          employeeId: employeeId
        },
      }).then((response) => {
        expect(response).property("status").to.equal(200);
        this.setEmpNumber(response.body?.data.empNumber);
      });
    });
  }
}
export default addEmployee;