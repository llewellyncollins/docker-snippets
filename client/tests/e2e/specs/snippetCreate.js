import Chance from 'chance';

const chance = new Chance();

const createButtonSelector = 'button[name="create"]';
const nameFieldSelector = 'input[name="name"]';
const descriptionFieldSelector = 'textarea[name="description"]';
const contentFieldSelector = 'textarea[name="content"]';

describe( 'Snippet Create', () => {
    beforeEach( () => {
        cy.visit( '/snippet/create' );
    } );

    it( 'validates an empty form', () => {
        const createButton = cy.get( 'button[name="create"]' );

        createButton
            .click();

        cy.buttonIsDisabled( createButtonSelector );
    } );

    it( 'validates the name field', () => {
        cy
            .get( descriptionFieldSelector )
            .clear()
            .type( chance.sentence( { words: 10 } ) );

        cy
            .get( contentFieldSelector )
            .clear()
            .type( chance.word( { length: 10 } ) );

        cy
            .get( 'input[name="name"]' )
            .type( chance.word( { length: 3 } ) );

        cy.buttonIsDisabled( createButtonSelector );

        cy
            .get( nameFieldSelector )
            .clear()
            .type( chance.word( { length: 35 } ) );

        cy.buttonIsDisabled( createButtonSelector );

        cy
            .get( nameFieldSelector )
            .clear()
            .type( chance.word( { length: 5 } ) );

        cy.buttonIsEnabled( createButtonSelector );
    } );

    it( 'validates the description field', () => {
        cy
            .get( nameFieldSelector )
            .clear()
            .type( chance.word( { length: 5 } ) );

        cy
            .get( contentFieldSelector )
            .clear()
            .type( chance.paragraph( { sentences: 1 } ) );

        cy
            .get( descriptionFieldSelector )
            .clear()
            .type( chance.word( { length: 5 } ) );

        cy.buttonIsDisabled( createButtonSelector );

        cy
            .get( descriptionFieldSelector )
            .clear()
            .type( chance.word( { length: 510 } ), { delay: 1 } );

        cy.buttonIsDisabled( createButtonSelector );

        cy
            .get( descriptionFieldSelector )
            .clear()
            .type( chance.sentence( { words: 5 } ) );

        cy.buttonIsEnabled( createButtonSelector );
    } );

    it( 'validates the content field', () => {
        cy
            .get( nameFieldSelector )
            .clear()
            .type( chance.word( { length: 5 } ) );

        cy
            .get( descriptionFieldSelector )
            .clear()
            .type( chance.paragraph( { sentences: 1 } ) );

        cy
            .get( contentFieldSelector )
            .clear()
            .type( chance.word( { length: 5 } ) );

        cy.buttonIsDisabled( createButtonSelector );

        cy
            .get( contentFieldSelector )
            .clear()
            .type( chance.word( { length: 1010 } ), { delay: 1 } );

        cy.buttonIsDisabled( createButtonSelector );

        cy
            .get( contentFieldSelector )
            .clear()
            .type( chance.paragraph( { sentences: 2 } ) );

        cy.buttonIsEnabled( createButtonSelector );
    } );
} );
