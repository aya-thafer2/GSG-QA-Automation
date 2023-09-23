class LoginTest{

    elements={
            UserName:()=>cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input'),
            Password:()=>cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input'),
            LoginBtn:()=>cy.get('.oxd-button'),
            Dashboard:()=>cy.get('.oxd-topbar-header-title'),
            errorAlert:()=>cy.get('.oxd-alert'),
            usernameValidationMessage:()=>cy.get(':nth-child(2) > .oxd-input-group > .oxd-text'),
            passwordValidationMessage:()=>cy.get(':nth-child(3) > .oxd-input-group > .oxd-text'),
        }

    validLogin(userName:string, password:string){
        this.elements.UserName().type(userName);
        this.elements.Password().type(password);
        this.elements.LoginBtn().click();
        this.elements.Dashboard().should('contain','Dashboard');
    }

    invalidLogin(userName:string, password:string){
        this.elements.UserName().type(userName);
        this.elements.Password().type(password);
        this.elements.LoginBtn().click();
        this.elements.errorAlert().should('contain','Invalid credentials');
        //TODO:
        // instead TRY this: cy.contains('.oxd-topbar-header-title',"Dashboard").should("exist");
    }

    invalidLoginBothEmpty(){
        this.elements.LoginBtn().click();
        this.elements.usernameValidationMessage().should('contain','Required');
        this.elements.passwordValidationMessage().should('contain','Required');
    }

    invalidLoginUserEmpty(password:string){
        this.elements.Password().type(password);
        this.elements.LoginBtn().click();
        this.elements.usernameValidationMessage().should('contain','Required');
    }
    //TODO: verify parent using (.parent OR .parents)
    invalidLoginPassEmpty(userName:string){
        this.elements.UserName().type(userName);
        this.elements.LoginBtn().click();
        this.elements.passwordValidationMessage().should('contain','Required');
    }

    checkPassType(){
        this.elements.Password().should('have.attr', 'type', 'password');
    }
   
}
export default LoginTest;