// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("createUser", ({ username, password, name }) => {
  cy.request("POST", "http://localhost:3003/api/users", {
    name,
    password,
    username,
  });
});

Cypress.Commands.add("LoginAndCreateBlog", (LoginCredentials,Blog) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("BACKEND")}/login`,
    body: LoginCredentials,
  }).then(({ body }) => {
    cy.request({
        method: "POST",
        url: `${Cypress.env("BACKEND")}/blogs`,
        body: Blog,
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      });
  });
});

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  
});

// Cypress.Commands.add('CreateBlog',({}))
