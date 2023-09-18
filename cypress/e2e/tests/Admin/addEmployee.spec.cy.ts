import LoginPage from "../../../pageObjects/LoginPage";
import addEmployee from "../../../pageObjects/addEmployee";
const LoginObj:LoginPage = new LoginPage();
const addEmployeeObj:addEmployee = new addEmployee();

describe("Employee Functionality", () => {
    beforeEach(()=>{
        cy.visit('/web/index.php/auth/login');
        LoginObj.login('Admin','admin123');
    })
    it('Add New employee using UI', () => {
        addEmployeeObj.addNewEmployee("Hakoona"," ","Matata");
    })
})