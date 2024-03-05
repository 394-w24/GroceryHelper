describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });

    beforeEach(() => {
        cy.visit('/')
      const lastSignIn = localStorage.getItem("lastSignIn");

      if (lastSignIn) {
        localStorage.clear();
      }

      localStorage.setItem("lastSignIn", new Date());
      localStorage.setItem("name", "test");
      localStorage.setItem("uid", "H8fSW7M5bNI9sLT5Ol5pyaDJP6Ma");
    });

    it ('opens Home Page', () => {
        cy.get('[data-cy=footer]').should('contain', 'Take Photo');
      });

    it ('show pop up if click on take photo', () => {
        cy.get('[data-cy=footer]').click();
        cy.get('[data-cy=productPage]').should('contain' ,'Take a picture of your grocery, one at a time');
    })

  });