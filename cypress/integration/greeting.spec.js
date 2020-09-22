describe('Test Greeting', function () {
  it('Visit main page', () => {
    cy.visit('/')
  })

  it('Contains greeting text', () => {
    cy.get('[data-test=greeting]').contains('AppliedMovies')
  })
})
