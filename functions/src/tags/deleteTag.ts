import { db } from '../firebase-local';

export default async ( id: string ) => {
    try {
        await db
            .collection( 'tags' )
            .doc( id )
            .delete();
    } catch ( e ) {
        console.log( e );
        throw new Error( `Failed to delete tag (${ id })` );
    }
};
