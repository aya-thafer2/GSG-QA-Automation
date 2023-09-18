import LoginPage from "../../../pageObjects/LoginPage";
const LoginObj:LoginPage = new LoginPage();

let userID : any;
describe("AdminAPI", () => {
    beforeEach(() => {
        cy.intercept("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index").as("LoginPage");
        cy.visit("https://opensource-demo.orangehrmlive.com");
        LoginObj.login('Admin','admin123');
    })

   it('Verify login response', ()=>{
        cy.request("https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/locations")
        .then((response)=>{
            expect(response).property('status').to.equal(200);
        })
        
   })
   function generateRandomName(length: number): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let randomName = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomName += characters.charAt(randomIndex);
    }
  
    return randomName;
  }
   it('Create user', ()=>{
    cy.request({
        method: 'POST',
        url: '/web/index.php/api/v2/admin/users',//baseUrl in cypress.config.js
        body:{
            username: "AyaThafer1",
             password: "h123456",
             status: true,
             userRoleId: 1,
             empNumber: 2
        }
    }).then((response)=>{
        expect(response).property('status').to.equal(200);
        userID = response.body.data.id;
        console.log(userID);
        
       })
   })
// Write IT AS afterEach instead******************
   it('Delete user', ()=>{
    cy.request({
        method: 'DELETE',
        url: '/web/index.php/api/v2/admin/users',
        body:{
            ids: [userID]
        }
    })
   })

})
