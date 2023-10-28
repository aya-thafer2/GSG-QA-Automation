import { waitUntilVisible2 } from "../../utils/waitUntilVisible";
import GenericHelper from "../../helpers/Conduit/genericFunctions";
import { Assertion } from "chai";
class addEmployee {
  private id: any;
  private empNumber: any;
  private userName: any
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
  setUserName(userName: string) {
    this.userName = userName;
  }
  getUserName(): string {
    return this.userName;
  }
  setLeaveId(leaveId: number) {
    this.leaveId = leaveId;
  }
  getLeaveId(): number {
    return this.leaveId;
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

    dropDown: () => cy.get('.oxd-userdropdown-tab > .oxd-icon'),
    logout: () => cy.get(':nth-child(4) > .oxd-userdropdown-link'),

    userNameEmp: () => cy.getByPlaceholder('Username'),
    passwordEmp: () => cy.getByPlaceholder('Password'),
    loginBtnEmp: () => cy.get('button'),

    leaveTable: () => cy.get('.oxd-table-body'),

    employeeNameInput: () => cy.get('.oxd-autocomplete-text-input > input'),
    selectEmployee: () => cy.get('.oxd-autocomplete-option'),
    viewBtn: () => cy.get('.oxd-form-actions > .oxd-button'),
    submitStatus: () => cy.get('.orangehrm-timesheet-footer--title > .oxd-text')
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

  createLoginDetails(username: string, password: string): Cypress.Chainable<any> {
    return cy.wrap(undefined).then(() => {
      cy.request({
        method: "POST",
        url: "/web/index.php/api/v2/admin/users",
        body: {
          empNumber: this.getEmpNumber(),
          password: password,
          status: true,
          userRoleId: 2,
          username: username
        },
      }).then((response) => {
        console.log(response.body.data.userName);
        this.setUserName(response.body.data.userName);
        expect(response).property("status").to.equal(200);
      });
    });
  }

  logout() {
    this.elements.dropDown().click()
    this.elements.logout().click()
  }

  addLeaveEntitlement() {
    cy.request({
      method: "POST",
      url: `/web/index.php/api/v2/leave/leave-entitlements`,
      body: {
        empNumber: this.getEmpNumber(),
        leaveTypeId: 8,
        fromDate: "2023-01-01",
        toDate: "2023-12-31",
        entitlement: "40"
      }

    }).then((response) => {
      expect(response).property("status").to.equal(200);
    });
  }

  applyLeave() {
    cy.request({
      method: "POST",
      url: `/web/index.php/api/v2/leave/leave-requests`,
      body: {
        leaveTypeId: 8,
        fromDate: "2023-10-30",
        toDate: "2023-10-30",
        comment: null
      }

    }).then((response) => {
      console.log(response.body.data.id);
      this.setLeaveId(response.body.data.id);
      expect(response).property("status").to.equal(200);
    });
  }

  adminApprovesLeave() {
    cy.request({
      method: "PUT",
      url: `/web/index.php/api/v2/leave/employees/leave-requests/${this.getLeaveId()}`,
      body: {
        action: "APPROVE"
      }

    }).then((response) => {
      console.log(response);
      expect(response).property("status").to.equal(200);
    });
  }

  selectLeave() {
    this.elements.MainMenuItems().contains('Leave').click();
  }

  leaveAssertion() {
    cy.contains('.oxd-table-card > .oxd-table-row', 'Scheduled').should("exist");
  }

  deleteEmployee() {
    cy.request({
      method: "DELETE",
      url: "/web/index.php/api/v2/pim/employees",
      body: {
        ids: [this.getEmpNumber()],
      }
    }).then((response) => {
      expect(response).property("status").to.equal(200);
    });
  }

  searchEmployeeName(firstName: string, middleName: string, lastName: string) {
    this.elements.employeeNameInput().type(`${firstName} ${middleName} ${lastName}`, { force: true })
  }
  selectEmployeeName() {
    this.elements.selectEmployee().click({ force: true })
  }
  clickViewBtn() {
    this.elements.viewBtn().click({ force: true })
  }
  statusAssertion() {
    this.elements.submitStatus().should('contain', "Status: Submitted");
  }
}
export default addEmployee;