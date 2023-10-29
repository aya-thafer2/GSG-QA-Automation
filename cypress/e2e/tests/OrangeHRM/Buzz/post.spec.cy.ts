import LoginPage from "../../../../support/pageObjects/OrangeHRM/LoginPage";
import buzz from "../../../../support/pageObjects/OrangeHRM/Buzz/buzz";
const LoginObj: LoginPage = new LoginPage();
const buzzObj: buzz = new buzz();


describe("Buzz: Write post", () => {
    beforeEach(() => {
        cy.intercept("/web/index.php/dashboard/index").as("LoginPage");
        cy.visit("/");
        LoginObj.login("Admin", "admin123");
        buzzObj.selectBuzz();
        const fixturePath = 'cypress/fixtures/post.txt';
        const fileContent = 'Hello World !!!';
        cy.writeFile(fixturePath, fileContent);
    })

    it('Buzz: Write post from fixture', () => {
        cy.fixture('post.txt').as('post')
        cy.get('@post').then((post) => {
            buzzObj.writePost(post)
            buzzObj.clickPost()
            buzzObj.assertion(post)
        });
    })

})