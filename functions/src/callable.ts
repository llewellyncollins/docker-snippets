import * as functions from 'firebase-functions';
import getTagsFunc from './tags/getTags';
import addTagFunc from './tags/addTag';
import deleteTagFunc from './tags/deleteTag';
import addSnippetFunc from './snippets/addSnippet';
import getSnippetsFunc from './snippets/getSnippets';
import getSnippetFunc from './snippets/getSnippet';
import editSnippetFunc from './snippets/editSnippet';

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

export const addSnippet = functions.https.onCall( ( data, context ) => {
    const uid = context.auth.uid;
    const { name, description, content } = data;
    return addSnippetFunc( {
        name,
        description,
        content,
        copyCount: 0,
        starCount: 0,
        tags: [],
        author: {
            uid
        }
    } ).catch( e => { throw new functions.https.HttpsError( 'cancelled', e.message ) } );
} );

export const editSnippet = functions.https.onCall( ( data, context ) => {
    const uid = context.auth.uid;
    const { id, name, description, content } = data;
    return editSnippetFunc( {
        id,
        name,
        description,
        content,
        copyCount: 0,
        starCount: 0,
        tags: [],
        author: {
            uid
        }
    } ).catch( e => { throw new functions.https.HttpsError( 'cancelled', e.message ) } );
} );

export const getSnippets = functions.https.onCall( ( data, context ) => {
    const { name, tag, limit } = data;
    return getSnippetsFunc( name, tag, limit )
        .catch( e => { throw new functions.https.HttpsError( 'cancelled', e.message ) } );
} );

export const getSnippet = functions.https.onCall( ( data, context ) => {
    const { id } = data;
    return getSnippetFunc( id )
        .catch( e => { throw new functions.https.HttpsError( 'cancelled', e.message ) } );
} );
