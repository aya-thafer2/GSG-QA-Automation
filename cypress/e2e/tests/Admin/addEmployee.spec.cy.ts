import LoginPage from "../../../support/pageObjects/LoginPage";
import addEmployee from "../../../support/pageObjects/addEmployee";
import employeePersonalInfo from "../../../support/pageObjects/employeePersonalInfo";
import employeeTable from "../../../support/pageObjects/employeeTable";
const LoginObj:LoginPage = new LoginPage();
const addEmployeeObj:addEmployee = new addEmployee();
const employeePersonalInfoObj: employeePersonalInfo = new employeePersonalInfo();
const employeeTableObj:employeeTable = new employeeTable();

describe("Employee's Table data validation (Add new Employee)", () => {
    beforeEach(()=>{
        cy.intercept("/web/index.php/dashboard/index").as("LoginPage");
        cy.visit("/");
        // **login to the system**
        LoginObj.login("Admin", "admin123");
        // **go to PIM page**
        addEmployeeObj.selectPIM();
        // **add new employee using API as a prerequisite & get the Employee's info data using fixture**
        cy.fixture('employeeInfo').as('EmpInfo');
        cy.get('@EmpInfo').then((infoData: any)=>{
            addEmployeeObj.addNewEmployee(infoData.FirstName, infoData.MiddleName, infoData.LastName);
        })

    })

    it.only('Fill the Employee information',()=>{
        employeePersonalInfoObj.fillPersonalDetails();
        cy.fixture('employeeInfo').as('EmpInfo');
        cy.get('@EmpInfo').then((infoData: any)=>{
            employeePersonalInfoObj.fillEmployeeInfo(infoData.FirstName, infoData.LastName);
        })
    })

    it.skip('Search by key value', () => {
        //employeeTableObj.checkSearch("Alice","0221")
        
       // employeeTableObj.getEmployeeInfo(addEmployeeObj.getEmployeeId());
    })
})