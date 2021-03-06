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
            name: escape( data.name ),
            content: escape( data.content ),
            description: escape( data.description ),
            copyCount: 0,
            starCount: 0,
            tags: data.tags,
            author: {
                uid: data.author.uid
            }
        };
    } catch ( e ) {
        console.log( e );
        throw new Error( e );
    }
};