import LoginPage from "../../../pageObjects/LoginPage";
import addEmployee from "../../../pageObjects/addEmployee";
const LoginObj:LoginPage = new LoginPage();
const addEmployeeObj:addEmployee = new addEmployee();

describe("Employee Functionality", () => {
    beforeEach(()=>{
        cy.visit('/web/index.php/auth/login');
        LoginObj.login('Admin','admin123');
        cy.fixture('employeeInfo').as('EmpInfo')
    })
    it('Add New employee using UI', () => {
        cy.get('@EmpInfo').then((infoData: any)=>{
            addEmployeeObj.addNewEmployee(infoData.FirstName, infoData.MiddleName, infoData.LastName);
        })
    })
})