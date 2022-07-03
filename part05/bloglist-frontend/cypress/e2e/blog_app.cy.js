describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Petteri Mattila',
      username: 'pettmatt',
      password: 'thisispasswordwith1number'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('can see login form', function () {
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('pettmatt')
      cy.get('#password').type('thisispasswordwith1number')
      cy.get('#loginButton').click()

      cy.contains('Logged in as pettmatt')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('pettmatt')
      cy.get('#password').type('thisispasswordwithOnenumber')
      cy.get('#loginButton').click()

      cy.contains('Wrong credentials.')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'pettmatt', password: 'thisispasswordwith1number' })
    })

    it('a blog can be created', function () {
      cy.contains('Add new blog').click()
      cy.get('#titleInput').type('This is a title')
      cy.get('#authorInput').type('This is the author')
      cy.get('#urlInput').type('This is a url')
      cy.get('#submitButton').click()

      cy.contains('This is a title')
      cy.contains('Extend').click()
      cy.contains('This is a url')
    })

    it('a blog can be liked', function () {
      cy.contains('Add new blog').click()
      cy.get('#titleInput').type('This is a title')
      cy.get('#authorInput').type('This is the author')
      cy.get('#urlInput').type('This is a url')
      cy.get('#submitButton').click()

      cy.get('#extendButton').click()
      cy.get('#likeButton').click()

      cy.visit('http://localhost:3000')
      cy.contains('This is a title')
        .contains('Extend').click()
      cy.contains('likes: 1')
    })

    it('can delete own blogs', function () {
      cy.createBlog({ title: 'Try to delete this', author: 'Fake Author', url: 'fake url' })
      cy.createBlog({ title: 'But delete this', author: 'Petteri Mattila', url: 'real url' })

      cy.contains('Try to delete this, Fake Author')
        .contains('Extend')
        .click()
      cy.contains('remove').should('not.exist')

      cy.contains('But delete this, Petteri Mattila')
        .contains('Extend')
        .click()
      cy.contains('remove').click()
    })

    describe('Several blogs can exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Blog 1', author: 'Author 1', url: 'url', likes: 1  })
        cy.createBlog({ title: 'Blog 2', author: 'Author 2', url: 'url', likes: 10 })
        cy.createBlog({ title: 'Blog 3', author: 'Fake Author', url: 'url', likes: 99 })
      })  

      it('sorts blogs by likes', function () {
        cy.visit('http://localhost:3000')
        cy.get('.blog').eq(0).should('contain', 'Blog 3')
        cy.get('.blog').eq(1).should('contain', 'Blog 2')
        cy.get('.blog').eq(2).should('contain', 'Blog 1')
      })
    })

    describe('finally', function () {
      it('can logout', function () {
        cy.contains('logout').click()

        cy.contains('Login')
        cy.contains('Username')
        cy.contains('Password')
      })
    })
  })
})