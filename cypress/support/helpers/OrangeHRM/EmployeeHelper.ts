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
    static logout() {
        addEmployeeObj.logout();
    }
    static login() {
        cy.intercept("/web/index.php/dashboard/index").as("LoginPage");
        cy.visit("/");
        cy.get('@EmpInfo').then((data: any) => {
            LoginObj.login(data.username, data.password);
        })
    }

    static createTimeSheet() {
        cy.visit('/web/index.php/time/viewMyTimesheet')
        cy.api({
            method: "GET",
            url: `/web/index.php/api/v2/time/timesheets/default`,
        }).then((response) => {
            console.log(response.body.data.id);
            const sheetId = response.body.data.id;
            cy.api({
                method: "PUT",
                url: `/web/index.php/api/v2/time/timesheets/${sheetId}/entries`,
                body: {
                    entries: [{
                        projectId: 5,
                        activityId: 35,
                        dates: {
                            '2023-10-23': { duration: "12:23" },
                            '2023-10-24': { duration: "12:00" },
                            '2023-10-25': { duration: "01:05" },
                            '2023-10-26': { duration: "08:26" },
                            '2023-10-27': { duration: "06:45" },
                            '2023-10-28': { duration: "07:12" },
                            '2023-10-29': { duration: "05:16" }
                        }
                    }],
                    deletedEntries: []
                }

            }).then((response) => {
                cy.wrap(response.status).should('eq', 200);
                cy.api({
                    method: "PUT",
                    url: `/web/index.php/api/v2/time/timesheets/${sheetId}`,
                    body: {
                        action: "SUBMIT"
                    }
                });
            });
        })

    }

    static visitTime() {
        cy.visit('/web/index.php/time/viewEmployeeTimesheet')
    }
    static visitDashboard() {
        cy.visit('/web/index.php/dashboard/index')
    }

    static assertion2() {
        cy.fixture('employeeInfo').as('EmpInfo');
        cy.get('@EmpInfo').then((data: any) => {
            cy.contains('.oxd-table-card > .oxd-table-row', data.username).should("exist");
        })
    }

    static searchEmployee() {
        cy.fixture('employeeInfo').as('EmpInfo');
        cy.get('@EmpInfo').then((data: any) => {
            addEmployeeObj.searchEmployeeName(data.FirstName, data.MiddleName, data.LastName)
        })
        cy.wait(2000)
        addEmployeeObj.selectEmployeeName();
        addEmployeeObj.clickViewBtn();
    }
    static submitAssertion() {
        this.searchEmployee()
        addEmployeeObj.statusAssertion()
    }

} 