describe("Blog app", () => {
  // Make a test for checking thadt the application displays the login form by default.
  beforeEach(() => {
    cy.request("POST", `${Cypress.env("BACKEND")}/test/reset`);
    cy.visit("");
  });

  it("Login form is shown", () => {
    cy.contains("Login to application");
    cy.contains("login");
  });

  describe("Login", () => {
    beforeEach(() => {
      cy.createUser({
        name: "Generic Name",
        username: "commonusername",
        password: "usualpassword",
      });
    });

    it("succeeds with correct credentials", () => {
      cy.get("#username").type("commonusername");
      cy.get("#password").type("usualpassword");
      cy.get("#login").click();
      cy.contains("Generic Name is logged in");
    });

    it("Fails with credentials", () => {
      cy.get("#username").type("commonusername");
      cy.get("#password").type("wrongpassword");
      cy.get("#login").click();
      cy.contains("wrong username or password");
    });
  });
  describe("when logged in", () => {
    beforeEach(() => {
      cy.request("POST", `${Cypress.env("BACKEND")}/users`, {
        name: "Generic Name",
        username: "commonusername",
        password: "usualpassword",
      });

      cy.get("#username").type("commonusername");
      cy.get("#password").type("usualpassword");
      cy.get("#login").click();
    });

    it("A blog can be created", () => {
      cy.get("#create-blog").click();
      cy.get("#author").type("Dummy writer");
      cy.get("#title").type("The art of faking");
      cy.get("#url").type("https://www.faketax.com");
      cy.get("#create").click();

      cy.contains("a new blog The art of faking by Dummy writer");
    });
  });
});

describe("Like and Delete blog", () => {
  beforeEach(() => {
    cy.request("POST", `${Cypress.env("BACKEND")}/test/reset`);

    cy.createUser({
      name: "Generic Name",
      username: "commonusername",
      password: "usualpassword",
    });

    const LoginCredentials = {
      username: "commonusername",
      password: "usualpassword",
    };
    const Blog1 = {
      title: "The art of faking",
      author: "Dummy writer",
      url: "https://www.faketax.com",
    };
    cy.LoginAndCreateBlog(LoginCredentials, Blog1);

    cy.visit("");
    cy.get("#username").type("commonusername");
    cy.get("#password").type("usualpassword");
    cy.get("#login").click();
  });

  it("a blog can be liked", () => {
    cy.contains("The art of faking").parent().get("#view").click();
    cy.contains("The art of faking").parent().get("#like").click();
    cy.contains("1 likes");
  });

  it("user created blog can delete it", () => {
    cy.contains("The art of faking").parent().get("#view").click();
    cy.contains("The art of faking").parent().get("#remove").click();
    // cy.contains('OK').click(); // no need to this cypress do it by default
    cy.should("not.contain", "The art of faking");
  });
});

describe("Other user posts", () => {
  beforeEach(() => {
    cy.request("POST", `${Cypress.env("BACKEND")}/test/reset`);

    cy.createUser({
      name: "Other creator",
      username: "morecommonusername",
      password: "evenmoreusualpassword",
    });

    const LoginCredentials = {
      username: "morecommonusername",
      password: "evenmoreusualpassword",
    };
    const Blog1 = {
      title: "The art of faking",
      author: "Dummy writer",
      url: "https://www.faketax.com",
    };

    cy.LoginAndCreateBlog(LoginCredentials, Blog1);

    cy.createUser({
      name: "Generic Name",
      username: "commonusername",
      password: "usualpassword",
    });

    cy.visit("");
    cy.get("#username").type("commonusername");
    cy.get("#password").type("usualpassword");
    cy.get("#login").click();
  });
  it("cannot delete post by another user", () => {
    cy.contains("The art of faking").parent().get("#view").click();
    cy.contains("The art of faking").parent().should("not.contain", "remove");
  });
});

describe("sorted blogs", () => {
  beforeEach(() => {
    cy.request("POST", `${Cypress.env("BACKEND")}/test/reset`);
    cy.createUser({
      name: "Generic Name",
      username: "commonusername",
      password: "usualpassword",
    });

    const LoginCredentials = {
      username: "commonusername",
      password: "usualpassword",
    };

    const blog1 = {
      title: "Exceptions should be expections",
      author: "The exception author",
      url: "www.becomeexpecptional.com",
      likes: 22,
    };
    const blog2 = {
      title: "Debugging in Jest",
      author: "Master Tester",
      url: "www.tetrex.com",
      likes: 4,
    };
    const blog3 = {
      title: "The future of AI",
      author: "mark altman",
      url: "www.openai.com",
      likes: 1,
    };
    const blog4 = {
      title: "Revolution of India's Independence",
      author: "Netaji Subhas Chandra Bose",
      url: "https://www.AHF.com",
      likes: 10000,
    };
    const blog5 = {
      title: "The Open Society",
      author: "Gorege Soros",
      url: "www.opensocityfoundation.org",
      likes: 0,
    };

    cy.LoginAndCreateBlog(LoginCredentials, blog1);
    cy.LoginAndCreateBlog(LoginCredentials, blog2);
    cy.LoginAndCreateBlog(LoginCredentials, blog3);
    cy.LoginAndCreateBlog(LoginCredentials, blog4);
    cy.LoginAndCreateBlog(LoginCredentials, blog5);

    cy.visit("");

    cy.get("#username").type("commonusername");
    cy.get("#password").type("usualpassword");
    cy.get("#login").click();
  });

  it("blogs should be in the sorted manner", () => {
    cy.get('.blog').eq(0).should('contain', "Revolution of India's Independence")
    cy.get('.blog').eq(1).should('contain', 'Exceptions should be expections')
    cy.get('.blog').eq(2).should('contain', 'Debugging in Jest')
    cy.get('.blog').eq(3).should('contain', 'The future of AI')
    cy.get('.blog').eq(4).should('contain', 'The Open Society')
  });
});
