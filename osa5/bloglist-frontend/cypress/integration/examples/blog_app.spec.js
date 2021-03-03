

describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: "Ville Vallaton",
      username: "viltsu",
      password: "salasana"
    }
    cy.request('POST', 'localhost:3001/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000/')
    cy.contains('Log in')
  })


  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('viltsu')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('viltsu')
      cy.get('#password').type('salna')
      cy.get('#login-button').click()

      cy.get('html').should('not.contain','logged in')
    })
  })


  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('viltsu')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()


    })

    it('A blog can be created', function() {
      cy.get('#create-button').click()
      cy.get('#title').type('Testi blogi')
      cy.get('#author').type('Ville Ville')
      cy.get('#url').type('nwtti.fi')
      cy.get('#form-button').click()

      cy.contains('Testi blogi')
    })

  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('viltsu')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()


      cy.get('#create-button').click()
      cy.get('#title').type('Testi blogi')
      cy.get('#author').type('Ville Ville')
      cy.get('#url').type('nwtti.fi')
      cy.get('#form-button').click()
      cy.wait(700)


      cy.get('#title').type('Toka testi blogi')
      cy.get('#author').type('Ville Ville')
      cy.get('#url').type('nwtti.fi')
      cy.get('#form-button').click()
      cy.wait(700)


      cy.get('#title').type('Kolmas testi blogi')
      cy.get('#author').type('Ville')
      cy.get('#url').type('nwtti.fi')
      cy.get('#form-button').click()
      cy.wait(700)



    })

    it('You can like a blog', function() {
      cy.get('#view-button').click()
      cy.get('#like-button').click()

      cy.contains('Likes: 1')
    })

    it('You can delete your own blog', function() {
      cy.get('#view-button').click()
      cy.get('#remove-button').click()
      cy.reload()

      cy.get('html').should('not.contain','Testi blogi')
    })


    it.only('Blogs are ordered according to likes', function() {

      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.wait(2000)
      cy.get('#like-button').click()
      cy.wait(2000)
      cy.get('#like-button').click()
      cy.contains('hide').click()
      cy.get('button').last().click()
      cy.get('#like-button').click()

      cy.wait(900)
      cy.get('#view-button').click()
      cy.wait(900)
      
      cy.get('button').last().click()
      
      cy.contains("Likes: 3")
      cy.contains("Likes: 1")
      cy.contains("Likes: 0")

      




    })


  })



})
