describe('Cypress Playground', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('verifica que a aplicação web está acessível', () => {
    cy.title().should('be.equal', 'Cypress Playground - Talking About Testing')
    cy.contains('h1', '🌲 Cypress Playground 🛝').should('be.visible')
  })

  it('verifica que o banner promocional está visível na página', () => {
    cy.get('#promotional-banner')
      .should('be.visible')
      .should('contain', '📣 Get to know the Cypress, from Zero to the Cloud course!')
  })

  it('ao clicar no botão "Subscribe" uma mensagem de sucesso será apresentada', () => {
    cy.contains('button', 'Subscribe')
      .should('be.visible')
      .click()

    cy.contains('#success', "You've been successfully subscribed to our newsletter.")
      .should('be.visible')
  })

  it('digita um nome no campo "Sign here" e verifica que ele aparece no "preview" da assinatura', () => {
    cy.get('#signature-textarea')
      .should('be.visible')
      .type('Xablau')

    cy.contains('#signature', 'Xablau')
      .should('be.visible')
  })

  it('digita um nome no campo "Sign here", marca o checkbox para visualizar o preview da assinatura e depois desmarca', () => {
    cy.get('#signature-textarea-with-checkbox')
      .should('be.visible')
      .type('Xablau')

    cy.get('#signature-checkbox').check()

    cy.contains('#signature-triggered-by-check', 'Xablau').should('be.visible')

    cy.get('#signature-checkbox').uncheck()

    cy.contains('#signature-triggered-by-check', 'Xablau').should('not.exist')
  })

  it('verifica se o texto sai conforme a marcação dos radio buttons "On" e "Off"', () => {
    cy.contains('#on-off', "ON").should('be.visible')
    cy.contains('#on-off', "OFF").should('not.exist')

    cy.get('input[type="radio"][value="off"]').check()

    cy.contains('#on-off', "OFF").should('be.visible')
    cy.contains('#on-off', "ON").should('not.exist')

    cy.get('input[type="radio"][value="on"]').check()

    cy.contains('#on-off', "ON").should('be.visible')
    cy.contains('#on-off', "OFF").should('not.exist')
  })

  it('seleciona um dos tipos disponíveis e exibe texto informando qual foi o tipo selecionado', () => {
    cy.contains('p', "You haven't selected a type yet.")
      .should('be.visible')

    cy.get('#selection-type')
      .as('availableTypes')
    cy.get('#select-selection')
      .as('paragraphWithSelectionType')

    cy.get('@availableTypes').select(1)

    cy.get('@paragraphWithSelectionType')
      .should('contain', 'BASIC')

    cy.get('@availableTypes').select('standard')

    cy.get('@paragraphWithSelectionType')
      .should('have.text', "You've selected: STANDARD")

    cy.get('@availableTypes').select('VIP')

    cy.contains('p', "You've selected: VIP")
      .should('be.visible')
  })

  it('verifica que realizou uma múltipla seleção', () => {
    cy.contains('p', "You haven't selected any fruit yet.")
      .should('be.visible')

    cy.get('select[name="fruit"][multiple]')
      .select(['apple', 'cherry', 'elderberry'])

    cy.contains('p', "You've selected the following fruits:")
      .should('be.visible')
  })

  it('realiza o upload de um arquivo e verifica se seu nome aparece corretamente no parágrafo', () => {
    cy.get('#file').should('be.empty')
    
    cy.get('input[type="file"]')
      .selectFile('./cypress/fixtures/example.json')
    
    cy.contains('p', 'example.json')
      .should('be.visible')
  })
})