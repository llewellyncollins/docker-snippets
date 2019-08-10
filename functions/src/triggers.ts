import * as functions from 'firebase-functions';
import { db } from './firebase-local';

export const createUser = functions.auth.user().onCreate( ( user ) => {
    const { email, displayName, uid } = user;

    return db.collection( 'users' ).doc( uid ).set( {
        email,
        displayName,
        favourites: [],
        starCount: 0,
        snippetCount: 0
    } );
} );

export const createSnippet = functions.firestore.document( 'snippets/{snippetId}' ).onCreate( ( snapshot ) => {
    return snapshot.ref.set( {
        copyCount: 0,
        starCount: 0
    }, { merge: true } )
} );