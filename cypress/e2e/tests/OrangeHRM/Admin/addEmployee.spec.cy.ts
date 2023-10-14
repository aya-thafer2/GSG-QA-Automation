import LoginPage from "../../../../support/pageObjects/OrangeHRM/LoginPage";
import addEmployee from "../../../../support/pageObjects/OrangeHRM/addEmployee";
import employeePersonalInfo from "../../../../support/pageObjects/OrangeHRM/employeePersonalInfo";
import employeeTable from "../../../../support/pageObjects/OrangeHRM/employeeTable";
const LoginObj: LoginPage = new LoginPage();
const addEmployeeObj: addEmployee = new addEmployee();
const employeePersonalInfoObj: employeePersonalInfo = new employeePersonalInfo();
const employeeTableObj: employeeTable = new employeeTable();

describe("Employee's Table data validation (Add new Employee)", () => {
    beforeEach(() => {
        cy.intercept("/web/index.php/dashboard/index").as("LoginPage");
        cy.visit("/");
        // **Login to the system**
        LoginObj.login("Admin", "admin123");
        // **Go to PIM page**
        addEmployeeObj.selectPIM();
        cy.fixture('employeeInfo').as('EmpInfo');
        // **Add new employee using API**
        cy.get('@EmpInfo').then((data: any) => {
            addEmployeeObj.addNewEmployee(data.FirstName, data.MiddleName, data.LastName, data.employeeId).then(() => {
                addEmployeeObj.createLoginDetails(data.username, data.password);
            });
        })
    })

    it('Employee - Fill the Employee information', () => {
        cy.get('@EmpInfo').then((infoData: any) => {
            addEmployeeObj.employeePersonalDetails(infoData.FirstName, infoData.LastName);
            employeePersonalInfoObj.fillPersonalDetails();
            employeePersonalInfoObj.fillEmployeeInfo(infoData.FirstName, infoData.LastName);
        })
    })

    it('Employee - Search by Employee ID', () => {
        //Fill the Employee information then Search
        cy.get('@EmpInfo').then((infoData: any) => {
            addEmployeeObj.employeePersonalDetails(infoData.FirstName, infoData.LastName);
            employeePersonalInfoObj.fillPersonalDetails();
            employeePersonalInfoObj.fillEmployeeInfo(infoData.FirstName, infoData.LastName);
            employeeTableObj.clickEmployeeListTap();
            employeeTableObj.getDetails(addEmployeeObj.getEmpNumber()).then(() => {
                employeeTableObj.checkSearch(infoData.employeeId, infoData.FirstName, infoData.MiddleName, infoData.LastName);
            });
        })
    })
})