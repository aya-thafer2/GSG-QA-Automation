import addNewEmployee from "../../../../support/helpers/OrangeHRM/EmployeeHelper";
import LoginPage from "../../../../support/pageObjects/OrangeHRM/LoginPage";
import addEmployee from "../../../../support/pageObjects/OrangeHRM/addEmployee";
import employeePersonalInfo from "../../../../support/pageObjects/OrangeHRM/employeePersonalInfo";
import employeeTable from "../../../../support/pageObjects/OrangeHRM/employeeTable";
const LoginObj: LoginPage = new LoginPage();
const addEmployeeObj: addEmployee = new addEmployee();
const employeePersonalInfoObj: employeePersonalInfo = new employeePersonalInfo();
const employeeTableObj: employeeTable = new employeeTable();

describe("Leave: Leave Requests Process", () => {
    beforeEach(() => {
        cy.intercept("/web/index.php/dashboard/index").as("LoginPage");
        cy.visit("/");
        LoginObj.login("Admin", "admin123");
        addEmployeeObj.selectPIM();
        cy.fixture('employeeInfo').as('EmpInfo');
        cy.get('@EmpInfo').then((data: any) => {
            addEmployeeObj.addNewEmployee(data.FirstName, data.MiddleName, data.LastName, data.employeeId).then(() => {
                addEmployeeObj.createLoginDetails(data.username, data.password).then(() => {
                    addEmployeeObj.addLeaveEntitlement();
                })
            });
        })
        addNewEmployee.logout();
    })

    afterEach(()=>{
        addNewEmployee.logout();
        LoginObj.login("Admin", "admin123")
        addEmployeeObj.deleteEmployee()
    })

    it('Leave: Check Leave Requests', () => {
        addNewEmployee.login();
        addEmployeeObj.applyLeave();
        addNewEmployee.logout();
        LoginObj.login("Admin", "admin123").then(()=>{
            addEmployeeObj.adminApprovesLeave();
        })
        addNewEmployee.logout();
        addNewEmployee.login();
        addEmployeeObj.selectLeave();
        addEmployeeObj.leaveAssertion();
    })

})