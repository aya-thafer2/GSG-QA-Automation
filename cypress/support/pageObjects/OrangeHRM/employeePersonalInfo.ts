import {
  waitUntilVisible,
  waitUntilVisible2,
} from "../../utils/waitUntilVisible";

class employeePersonalInfo {
  elements = {
    job: () => cy.get(":nth-child(6) > .orangehrm-tabs-item"),
    jobTitle: () =>
      cy.get(
        ":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon"
      ),
    selectJobTitle: () => cy.get(".oxd-select-dropdown > :nth-child(3) > span"),
    employmentStatus: () =>
      cy.get(
        ":nth-child(7) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon"
      ),
    selectEmploymentStatus: () =>
      cy.get(".oxd-select-dropdown > :nth-child(2)"),
    subUnit: () =>
      cy.get(
        ":nth-child(5) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon"
      ),
    selectSubUnit: () => cy.get(".oxd-select-dropdown > :nth-child(3)"),
    jobSaveBtn: () => cy.get(".oxd-form-actions > .oxd-button"),
    reportTo: () => cy.get(":nth-child(9) > .orangehrm-tabs-item"),
    addSupervisor: () =>
      cy.get(
        ":nth-child(2) > :nth-child(1) > .orangehrm-action-header > .oxd-button"
      ),
    supervisorName: () => cy.get(".oxd-autocomplete-text-input > input"),
    selectSupervisorName: () =>
      cy.get(".oxd-autocomplete-dropdown > :nth-child(1) > span"),
    reportToSaveBtn: () => cy.get(".oxd-button--secondary"),
    reportingMethod: () => cy.get(".oxd-select-text--after > .oxd-icon"),
    selectReportingMethod: () => cy.get(".oxd-select-dropdown > :nth-child(2)"),
    licenseExpiryDate: () =>
      cy.get(
        ":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon"
      ),
    SelectLicenseExpiryDate: () =>
      cy.get(":nth-child(30) > .oxd-calendar-date"),
    maritalStatus: () =>
      cy.get(
        ":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon"
      ),
    selectMaritalStatus: () => cy.get(".oxd-select-dropdown > :nth-child(2)"),
    smoker: () =>
      cy.get(
        ":nth-child(2) > .oxd-checkbox-wrapper > label > .oxd-checkbox-input > .oxd-icon"
      ),
    personalDetailsSaveBtn: () =>
      cy.get(":nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button"),
    loader: () => cy.get(".oxd-loading-spinner"),
  };

  fillEmployeeInfo(firstName: string, LastName: string) {
    this.elements.job().click({ force: true });
    waitUntilVisible2(this.elements.loader());
    this.elements.jobTitle().click({ force: true });
    waitUntilVisible2(this.elements.loader());
    this.elements.selectJobTitle().click({ force: true });
    this.elements.employmentStatus().click({ force: true });
    this.elements.selectEmploymentStatus().click({ force: true });
    this.elements.subUnit().click({ force: true });
    this.elements.selectSubUnit().click({ force: true });
    this.elements.jobSaveBtn().click({ force: true });
    this.elements.reportTo().click({ force: true });
    waitUntilVisible2(this.elements.loader());
    this.elements.addSupervisor().click({ force: true });
    this.elements.supervisorName().type("a");
    this.elements.selectSupervisorName().click({ force: true });
    this.elements.reportingMethod().click({ force: true });
    this.elements.selectReportingMethod().click({ force: true });
    this.elements.reportToSaveBtn().click({ force: true });
    waitUntilVisible(this.elements.loader());
  }

  fillPersonalDetails() {
    waitUntilVisible2(this.elements.loader());
    this.elements.licenseExpiryDate().click({ force: true });
    this.elements.SelectLicenseExpiryDate().click({ force: true });
    this.elements.maritalStatus().click({ force: true });
    this.elements.selectMaritalStatus().click({ force: true });
    waitUntilVisible2(this.elements.loader());
    this.elements.smoker().click({ force: true });
    this.elements.personalDetailsSaveBtn().click({ force: true });
    waitUntilVisible2(this.elements.loader());
  }
}
export default employeePersonalInfo;
