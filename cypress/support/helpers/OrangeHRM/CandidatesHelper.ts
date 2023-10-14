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
    static shortlistCandidateViaAPI(){
        cy.request({
            method:'PUT',
            url:`/web/index.php/api/v2/recruitment/candidates/${this.getId()}/shortlist`,
            body:{note: null}
        }).then((response)=>{
            console.log(response);
            cy.visit(`/web/index.php/recruitment/addCandidate/${this.getId()}`);
            CandidatesObj.clickScheduleInterviewBtn();
            CandidatesObj.fillScheduleInterviewData();
        })
    }
    static addCandidateViaAPI(){
        
        cy.request({
            method: 'POST',
            url:'/web/index.php/api/v2/recruitment/candidates',
            body:{
                comment:null,
                consentToKeepData:false,
                contactNumber:null,
                dateOfApplication:"2023-10-14",
                email:faker.internet.email(),
                firstName:faker.internet.userName(),
                keywords:null,
                lastName:faker.internet.userName(),
                middleName:null,
                vacancyId: 4
            }
        }).then((response)=>{
            console.log(response);
            this.setId(response.body.data.id);
            this.shortlistCandidateViaAPI();
        })
    }
}