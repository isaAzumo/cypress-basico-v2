declare namespace Cypress {
    interface Chainable<Subject> {
        fillMandatoryFieldsAndSubmit(): Chainable<any>;
  }
}