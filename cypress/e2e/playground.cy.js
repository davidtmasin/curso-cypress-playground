describe('Cypress Playground', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })
  it('verifica que a página inicial da aplicação web está online', () => {
    cy.title().should('be.equal', 'Cypress Playground - Talking About Testing')
    cy.contains('h1', '🌲 Cypress Playground 🛝').should('be.visible')
  })

  it('verifica que o banner promocional está visível na página', () => {
    cy.get('#promotional-banner')
      .should('be.visible')
      .should('contain', '📣 Get to know the Cypress, from Zero to the Cloud course!')
  })

})