import { db } from '../firebase-local';
import Snippet from '../../../interfaces/Snippet';

export default async ( snippetData: Snippet ) => {
    try {
        // TODO: Validation
        const snippetRef = await db.collection( 'snippets' ).add( snippetData );

        return {
            id: snippetRef.id
        }
    } catch ( e ) {
        console.log( e );
        throw new Error( `Failed to add ${ snippetData.name } snippet` );
    }
};
