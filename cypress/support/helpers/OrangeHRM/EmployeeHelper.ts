import addEmployee from "../../pageObjects/OrangeHRM/addEmployee";
const addEmployeeObj: addEmployee = new addEmployee();
import LoginPage from "../../pageObjects/OrangeHRM/LoginPage";
const LoginObj: LoginPage = new LoginPage();

export default class addNewEmployee {

    static addNewEmployeeViaAPI() {

        addEmployeeObj.selectPIM();

        cy.fixture('employeeInfo').as('EmpInfo');
        cy.get('@EmpInfo').then((data: any) => {
            addEmployeeObj.addNewEmployee(data.FirstName, data.MiddleName, data.LastName, data.employeeId).then(() => {
                addEmployeeObj.createLoginDetails(data.username, data.password);
            });

        })
    }
    static logout(){
        addEmployeeObj.logout();  
    }
    static login(){
        cy.intercept("/web/index.php/dashboard/index").as("LoginPage");
        cy.visit("/");
        cy.get('@EmpInfo').then((data: any) => {
            LoginObj.login(data.username, data.password);
        })
    }
} 