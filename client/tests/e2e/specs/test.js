// https://docs.cypress.io/api/introduction/api.html

describe( 'Home Page', () => {
    beforeEach( () => {
        cy.visit( '/' );
    } );

    it( 'has snippets', () => {
        cy
            .get( '.snippet-list' )
            .children()
            .should( 'have.length.greaterThan', 2 );
    } );

    it( 'can navigate to snippet', () => {
        cy.navigateToSnippet( 0 );
        cy.url().should( 'include', 'snippet' );
    } );

    it( 'can star/unstar a snippet', () => {
    } );

    it( 'can navigate to snippet creation page', () => {
        cy
            .get( 'nav' )
            .find( '[name="create"]' )
            .click();

        cy.url().should( 'include', 'snippet/create' );
    } );

    it( 'can navigate to sign in page', () => {

    } );

    it( 'can log a user out', () => {

    } );
} );
