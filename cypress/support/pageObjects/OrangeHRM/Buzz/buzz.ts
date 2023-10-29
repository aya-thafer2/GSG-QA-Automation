class buzz {

    elements = {
        MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
        postInput: () => cy.get('.oxd-buzz-post-input'),
        postBtn: () => cy.get(".oxd-button"),
        toastAlert: () => cy.get('.oxd-toast')
    }

    selectBuzz() {
        this.elements.MainMenuItems().contains('Buzz').click();
    }
    writePost(post: any) {
        this.elements.postInput().type(post);
    }
    clickPost() {
        this.elements.postBtn().contains("Post").click()
    }
    assertion(post: any) {
        this.elements.toastAlert().should('not.exist');
        cy.contains('.orangehrm-buzz-post-body-text', post)
    }

}
export default buzz;