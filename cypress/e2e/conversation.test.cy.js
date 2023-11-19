describe('template spec', () => {
  it.only('should search jjaljuria2 and init conversation', () => {
    cy.login('jose@email.com', '12345')

    cy.get('input[type="search"]').type('jjaljuria2')
    cy.contains('jjaljuria2').click()
  })
})