class DashboardActions{
    getTimeAtWorkCard(){
        return cy.contains("div"," Today").parents().eq(3);
    }
}
export default DashboardActions;