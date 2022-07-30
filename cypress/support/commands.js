Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function (){
    cy.get('#firstName').type('Isabela')
    cy.get('#lastName').type('Santana')
    cy.get('#email').type('isabela.carneiro@azumo.co')
    cy.get('#open-text-area').type('teste') 
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
})
