import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { db } from './firebase-local';

const increment = admin.firestore.FieldValue.increment( 1 );
const decrement = admin.firestore.FieldValue.increment( -1 );

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

export const addStar = functions.firestore.document( 'star/{starId}' ).onCreate( ( snapshot ) => {
    const data = snapshot.data();

    return db.collection( 'snippets' ).doc( data.snippetId ).update( {
        starCount: increment
    } );
} );

export const removeStar = functions.firestore.document( 'star/{starId}' ).onCreate( ( snapshot ) => {
    const data = snapshot.data();

    return db.collection( 'snippets' ).doc( data.snippetId ).update( {
        starCount: decrement
    } );
} );