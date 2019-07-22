import Snippet from '../../../interfaces/Snippet';

export default ( snippetData: Snippet ) => {
    if ( snippetData.name.length < 4 && snippetData.name.length > 30 ) {
        throw new Error( 'Name must be between 4 and 30 characters' );
    }

    if ( snippetData.description.length < 10 && snippetData.description.length > 500 ) {
        throw new Error( 'Description must be between 10 and 500 characters' );
    }

    if ( snippetData.content.length < 10 && snippetData.content.length > 1000 ) {
        throw new Error( 'Content must be between 10 and 1000 characters' );
    }

    // TODO: Tag validation
};