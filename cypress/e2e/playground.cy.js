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

  it('intercepta a requisição acionada pelo botão "Get TODO" e certifica que uma lista será exibida', () => {
    cy.intercept(
      'GET',
      'https://jsonplaceholder.typicode.com/todos/1'
    ).as('getTodo')

    cy.contains('button', 'Get TODO').click()

    cy.wait('@getTodo')
      .its('response.statusCode')
      .should('be.equal', 200)

    cy.contains('li', 'TODO ID: 1').should('be.visible')
    cy.contains('li', 'Title: delectus aut autem').should('be.visible')
    cy.contains('li', 'Completed: false').should('be.visible')
    cy.contains('li', 'User ID: 1').should('be.visible')
  })

  it('intercepta a requisição acionada pelo botão "Get TODO", usando uma fixture como resposta da requisição e certifica que uma lista será exibida', () => {
    const todo = require('../fixtures/todo')
    cy.intercept(
      'GET',
      'https://jsonplaceholder.typicode.com/todos/1',
      { fixture: 'todo' }
    ).as('getTodo')

    cy.contains('button', 'Get TODO').click()

    cy.wait('@getTodo')
      .its('response.statusCode')
      .should('be.equal', 200)

    cy.contains('li', `TODO ID: ${todo.id}`).should('be.visible')
    cy.contains('li', `Title: ${todo.title}`).should('be.visible')
    cy.contains('li', `Completed: ${todo.completed}`).should('be.visible')
    cy.contains('li', `User ID: ${todo.userId}`).should('be.visible')
  })

  it('intercepta a requisição acionada pelo botão "Get TODO" e simula uma falha na API', () => {
    cy.intercept(
      'GET',
      'https://jsonplaceholder.typicode.com/todos/1',
      { statusCode: 500 }
    ).as('serverFailure')

    cy.contains('button', 'Get TODO').click()

    cy.wait('@serverFailure')
      .its('response.statusCode')
      .should('be.equal', 500)

    cy.contains('.error', 'Oops, something went wrong. Refresh the page and try again.')
      .should('be.visible')
  })

  it('intercepta a requisição acionada pelo botão "Get TODO" e simula uma falha na rede', () => {
    cy.intercept(
      'GET',
      'https://jsonplaceholder.typicode.com/todos/1',
      { forceNetworkError: true }
    ).as('networkError')

    cy.contains('button', 'Get TODO').click()

    cy.wait('@networkError')

    cy.contains('.error', 'Oops, something went wrong. Check your internet connection, refresh the page, and try again.')
      .should('be.visible') 
  })

  it('realiza uma requisição HTTP e verifica se o status code é 200', () => {
    cy.request(
      'GET',
      'https://jsonplaceholder.typicode.com/todos/1'
    ).its('status')
     .should('be.equal', 200)
  })
})