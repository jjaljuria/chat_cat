describe('Page Login', () => {
  const url = 'http://localhost:3000/login'

  it('show page login', () => {
    cy.visit(url)
  })

  it('should redirect a home when login a user', ()=>{
    cy.visit(url)
    cy.get('input[name="email"]').type('jose@email.com')
    cy.get('input[name="password"]').type('12345')

    cy.get('button').contains('Login').click()

    cy.url().should('eq', 'http://localhost:3000/')
  })
})
