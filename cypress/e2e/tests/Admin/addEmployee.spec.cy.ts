import LoginPage from "../../../support/pageObjects/LoginPage";
import addEmployee from "../../../support/pageObjects/addEmployee";
import employeePersonalInfo from "../../../support/pageObjects/employeePersonalInfo";
import employeeTable from "../../../support/pageObjects/employeeTable";
const LoginObj:LoginPage = new LoginPage();
const addEmployeeObj:addEmployee = new addEmployee();
const employeePersonalInfoObj: employeePersonalInfo = new employeePersonalInfo();
const employeeTableObj:employeeTable = new employeeTable();
import employee from "../../../support/interfaces/employee";


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
        cy.get('@EmpInfo').then((data: any)=>{
            addEmployeeObj.addNewEmployee(data.FirstName, data.MiddleName, data.LastName, data.employeeId).then(()=>{
                addEmployeeObj.createLoginDetails(data.username, data.password);
            });
        })

    })

    it.skip('Fill the Employee information',()=>{
        addEmployeeObj.employeePersonalDetails();

        employeePersonalInfoObj.fillPersonalDetails();
        cy.fixture('employeeInfo').as('EmpInfo');
        cy.get('@EmpInfo').then((infoData: any)=>{
            employeePersonalInfoObj.fillEmployeeInfo(infoData.FirstName, infoData.LastName);
        })
    })

    it.only('Search by key value', async () => {
        addEmployeeObj.employeePersonalDetails();
        employeePersonalInfoObj.fillPersonalDetails();
        cy.fixture('employeeInfo').as('EmpInfo');
        cy.get('@EmpInfo').then((infoData: any)=>{
            employeePersonalInfoObj.fillEmployeeInfo(infoData.FirstName, infoData.LastName);
            employeeTableObj.clickEmployeeListTap();
            
            //let emp= employeeTableObj.getEmployeeInfo(infoData.employeeId);
            // console.log(emp);
            employeeTableObj.checkSearch(infoData.employeeId);
            employeeTableObj.getJobDetails(addEmployeeObj.getEmpNumber());
        })
        


    })

        //TODO: delete user

})