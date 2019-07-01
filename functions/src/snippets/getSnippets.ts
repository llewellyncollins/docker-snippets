import { escape } from 'validator';
import { db } from '../firebase-local';
import Snippet from '../../../interfaces/Snippet';

export default async ( name: string, tag: string, limit: number ) => {
    try {
        const cleanName = name.trim();
        const cleanTag = tag.trim();
        const clampedLimit = Math.min( Math.max( limit, 1 ), 20 );
        const snippetsRef = db.collection( 'snippets' );

        if ( cleanName && cleanName !== '' ) {
            // https://stackoverflow.com/questions/38618953/how-to-do-a-simple-search-in-string-in-firebase-database
            snippetsRef.orderBy( 'name' ).startAt( name ).endAt( `${ name }\uf8ff` );
        }

        if ( cleanTag && cleanTag !== '' ) {
            snippetsRef.where( 'tag', 'array-contains', cleanTag );
        }

        snippetsRef.limit( clampedLimit );

        const snapShot = await snippetsRef.get();
        const snippets: Snippet[] = [];

        snapShot.forEach( ( doc ) => {
            const data = doc.data();
            snippets.push( {
                id: doc.id,
                userId: data.userId,
                name: escape( data.name ),
                content: escape( data.content ),
                description: escape( data.description ),
                tags: data.tags
            } );
        } );

        return snippets;
    } catch ( e ) {
        console.log( e );
        throw new Error( e );
    }

};