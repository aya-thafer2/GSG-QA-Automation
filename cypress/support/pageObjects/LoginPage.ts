class LoginPage{

    elements={
        userName:()=>cy.getByPlaceholder('Username'),
        password:()=>cy.getByPlaceholder('Password'),
        loginBtn:()=>cy.get('button'),
        forgetPassword:()=>cy.get(".orangehrm-login-forgot-header"),
        resetUserName:()=>cy.get(".oxd-input"),
        resetBtn:()=>cy.get(".orangehrm-forgot-password-button--reset"),
        forgetPasswordTitle:()=>cy.get('.orangehrm-forgot-password-title')
    }

    login(userName:string, password:string){
        this.elements.userName().type(userName);
        this.elements.password().type(password);
        this.elements.loginBtn().click();
    }
    checkForgetPassword(resetUserName:string){
        this.elements.forgetPassword().click();
        this.elements.resetUserName().type(resetUserName);
        this.elements.resetBtn().click();
        this.elements.forgetPasswordTitle().should('contain','Reset Password link sent successfully');
    }

}
export default LoginPage;