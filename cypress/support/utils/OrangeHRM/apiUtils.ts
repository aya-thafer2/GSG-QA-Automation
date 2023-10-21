
//This file must be imported in the e2e.js file in order for cypress to recognize it as a custom command 

declare namespace Cypress {
        interface Chainable<Subject> {
            searchTableRow: typeof searchTableRow;
        }
    }


function searchTableRow(tableSelector:any, columns:any){
    cy.get(tableSelector).find('tr').each((row) => {
        const rowText = row.text();
        let found = true;
    
        for (const columnName in columns) {
          if (columns.hasOwnProperty(columnName)) {
            if (!rowText.includes(columns[columnName])) {
              found = false;
              break;
            }
          }
        }
        if(found) {
            
        }
    
      });
}
Cypress.Commands.add('searchTableRow', searchTableRow);