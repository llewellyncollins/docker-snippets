import * as functions from 'firebase-functions';
import getTagsFunc from './tags/getTags';
import addTagFunc from './tags/addTag';
import deleteTagFunc from './tags/deleteTag';

export const getTags = functions.https.onCall( ( data, context ) => {
    const limit = data.limit;
    return getTagsFunc( limit ).catch( e => { throw new functions.https.HttpsError( 'cancelled', e.message ) } );
} );

export const addTag = functions.https.onCall( async ( data ) => {
    const name = data.name;
    try {
        const tag = await addTagFunc( name );
        return tag;
    } catch ( e ) {
        throw new functions.https.HttpsError( 'cancelled', e.message );
    }
} );

export const deleteTag = functions.https.onCall( ( data, context ) => {
    const id = data.id;
    return deleteTagFunc( id ).catch( e => { throw new functions.https.HttpsError( 'cancelled', e.message ) } );
} );
