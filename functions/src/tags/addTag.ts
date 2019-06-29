import { db } from '../firebase-local';

export default async ( name: string ) => {
    try {
        // TODO: Validation
        const ref = await db.collection( 'tags' ).add( { name } );
        return {
            id: ref.id,
            name
        };
    } catch ( e ) {
        console.log( e );
        throw new Error( `Failed to add ${ name } tag` );
    }
};
