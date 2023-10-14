import Candidates from "../../pageObjects/OrangeHRM/Recruitment/Candidates";
const CandidatesObj: Candidates = new Candidates();
const { faker } = require('@faker-js/faker');

export default class checkCandidates {
    private static id:any;
    static setId(id:number){
        this.id =id;
    }
    static getId(){
        return this.id;
    }

    static checkCount(APItotal:number){
        CandidatesObj.getRecords(APItotal)
    }
    static checkCandidatesCount() {
        CandidatesObj.goToRecruitment();
        cy.intercept('GET', '/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC').as('apiRequest');
        cy.wait('@apiRequest').then((res) =>{
            const APItotal=res.response?.body.meta.total;
            this.checkCount(APItotal);
        })
    }
  
}