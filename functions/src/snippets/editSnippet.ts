import { db } from '../firebase-local';
import validateSnippet from './validateSnippet';
import Snippet from '../../../interfaces/Snippet';

export default async ( snippetData: Snippet ) => {
    try {
        snippetData.name = snippetData.name.trim();
        snippetData.description = snippetData.description.trim();
        snippetData.content = snippetData.content.trim();

        validateSnippet( snippetData );

        // TODO: Check if user owns the snippet
        await db.collection( 'snippets' ).doc( snippetData.id ).update( snippetData );

        return {
            id: snippetData.id
        }
    } catch ( e ) {
        console.log( e );
        throw new Error( e );
    }
};
