import { escape } from 'validator';
import { db } from '../firebase-local';
import Snippet from '../../../interfaces/Snippet';

export default async ( id: string ): Promise<Snippet> => {
    try {
        const snippetRef = db.collection( 'snippets' ).doc( id );
        const document = await snippetRef.get();
        const data = document.data();

        return {
            id: document.id,
            userId: data.userId,
            name: escape( data.name ),
            content: escape( data.content ),
            description: escape( data.description ),
            tags: data.tags
        };
    } catch ( e ) {
        console.log( e );
        throw new Error( e );
    }
};