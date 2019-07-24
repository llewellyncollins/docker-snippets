import Chance from 'chance';

const chance = new Chance();

describe( 'Snippet View', () => {
    beforeEach( () => {
        cy.visit( '/' );
        cy.navigateToSnippet( 0 );
    } );

    it( 'has the snippet information', () => {
        cy.get( '.info-name' );

        cy.get( '.info-author' );

        cy
            .get( '.variables>.variable' )
            .should( 'have.length.greaterThan', 0 );

        cy.get( 'button[name="copy"]' );

        cy.get( '.content' );
    } );

    it( 'can customise the snippet', () => {
        cy
            .get( 'input[type="text"]' )
            .each( ( $input, index ) => {
                const input = cy.wrap( $input );
                const variable = chance.string();
                input.clear();
                input.type( variable );

                cy
                    .get( '.content' )
                    .contains( variable );
            } );
    } );

    it( 'can copy the snippet', () => {
    } );
} );
