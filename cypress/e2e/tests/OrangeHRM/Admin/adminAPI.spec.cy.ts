import LoginPage from "../../../../support/pageObjects/OrangeHRM/LoginPage";
const LoginObj: LoginPage = new LoginPage();

let userID: any;
describe("AdminAPI", () => {
  //Login
  beforeEach(() => {
    cy.intercept("/web/index.php/dashboard/index").as("LoginPage");
    cy.visit("/");
    LoginObj.login("Admin", "admin123");
  });

  // it("Verify login response", () => {
  //   cy.request(
  //     "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/locations"
  //   ).then((response) => {
  //     expect(response).property("status").to.equal(200);
  //   });
  // });
  // function generateRandomName(length: number): string {
  //   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  //   let randomName = "";

  //   for (let i = 0; i < length; i++) {
  //     const randomIndex = Math.floor(Math.random() * characters.length);
  //     randomName += characters.charAt(randomIndex);
  //   }

  //   return randomName;
  // }

  // FIXME: rewerite this using function from loginPageObj
  it("Create user", () => {
    cy.request({
      method: "POST",
      url: "/web/index.php/api/v2/admin/users", //baseUrl in cypress.config.js
      body: {
        username: "jansenacles1",
        password: "h123456",
        status: true,
        userRoleId: 1,
        empNumber: 131,
      },
    }).then((response) => {
      expect(response).property("status").to.equal(200);
      userID = response.body?.data.id;
      console.log(userID);
    });
  });
  //Delete user
  afterEach(() => {

    cy.request({
      method: "DELETE",
      url: "/web/index.php/api/v2/admin/users",
      body: {
        ids: [userID],
      },
    }).then((response) => {
      expect(response).property("status").to.equal(200);
    });
  });
});
