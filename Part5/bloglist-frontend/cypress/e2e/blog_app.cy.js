
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user1 = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request("POST", "http://localhost:3001/api/users", user1)
    const user2 = {
      name: "testuser",
      username: "test",
      password: "testtest"
    }
    cy.request("POST", "http://localhost:3001/api/users", user2)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains("username")
    cy.contains("password")
    cy.contains("log in")
  })

  describe("Login", function() {

    it("User can log in with correct credentials", function() {
      cy.contains("log in")
      cy.get("#username").type("mluukkai")
      cy.get("#password").type("salainen")
      cy.get("#login-button").click()

      cy.contains("Matti Luukkainen logged in")
    })

    it("Fail with wrong credentials", function() {
      cy.contains("log in")
      cy.get("#username").type("mluukkai")
      cy.get("#password").type("test")
      cy.get("#login-button").click()

      cy.get(".error")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid")

      cy.get("html").should("not.contain", "Matti Luukkainen logged in")
    })
  })

  describe("when logged in", function() {
    beforeEach(function () {
      cy.login({username: "mluukkai", password:"salainen"})
    })

    it("A blog can be created", function() {
      cy.contains("new blog").click()

      cy.get("#title").type("test")
      cy.get("#author").type("test")
      cy.get("#url").type("test")
      cy.contains("create").click()

      cy.contains("Title: test")
      cy.contains("Author: test")
      cy.contains("URL: test")

      cy.get(".error")
        .should("contain", "A new blog test by test is added")
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    describe("and a blog exists", function() {
      beforeEach(function() {
        cy.createBlog({ title: "another test", author: "another author", url: "another url" })

      })

      it("can be liked", function() {
        cy.contains("another test")
        cy.contains("view")
          .click()
        cy.contains("Add Like")
          .click()
        cy.contains("Likes: 1")

        cy.get(".error")
          .should("contain", "Blog another test liked")
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
      })

      it("can be deleted", function() {
        cy.contains("another test")
        cy.contains("view")
          .click()
        cy.contains("Remove")
          .click()

        cy.get(".error")
          .should("contain", "Blog \"another test\" removed succesfuly")
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
        
        cy.get("html").should("not.contain", "Title: another test")
      })
    })
  })

  describe("when not logged in", function() {
    beforeEach(function() {
      cy.login({ username: "mluukkai", password:"salainen" })
      cy.createBlog({ title: "another test", author: "another author", url: "another url" })
      cy.contains("logout")
        .click()
      
      cy.login({ username: "test", password:"testtest" })
    })

    it("only creator of blog can see delete button", function() {
      cy.contains("another test")
      cy.contains("view")
        .click()

      cy.get("html").should("not.contain", "Remove")
    })
  })

  describe("blogs are ordered according to likes", function() {
    beforeEach(function() {
      cy.login({ username: "mluukkai", password:"salainen" })
      cy.createBlog({ title: "The title with the second most likes", author: "secondmostlike", url: "secondmostlikes.com" })
      cy.createBlog({ title: "The title with the most likes", author: "mostlike", url: "mostlikes.com" })
    })

    it("blog with most likes is first", function() {
      cy.contains("Title: The title with the most likes")
        .parent().find("button").contains("view").click()
        cy.contains("Title: The title with the most likes")
        .parent().find("button").contains("Add Like").click()
      
      cy.get(".blog").eq(0).should("contain", "Title: The title with the most likes")
      cy.get(".blog").eq(1).should("contain", "Title: The title with the second most likes")
    })
  })
})