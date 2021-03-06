import { db } from '../firebase-local';
import validateSnippet from './validateSnippet';
import Snippet from '../../../interfaces/Snippet';

export default async ( snippetData: Snippet ) => {
    try {
        snippetData.name = snippetData.name.trim();
        snippetData.description = snippetData.description.trim();
        snippetData.content = snippetData.content.trim();

        validateSnippet( snippetData );

        const snippetRef = await db.collection( 'snippets' ).add( snippetData );

        return {
            id: snippetRef.id
        }
    } catch ( e ) {
        console.log( e );
        throw new Error( e );
    }
};
