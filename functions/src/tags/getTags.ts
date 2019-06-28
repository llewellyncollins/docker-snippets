import { db } from '../firebase-local';
import Tag from '../../../interfaces/Tag';

export default async ( limit: number = 10 ) => {
    const snapShots = await db.collection( 'tags' ).limit( limit ).get();
    const tags: Tag[] = [];

    snapShots.forEach( ( doc ) => {
        tags.push( {
            id: doc.id,
            name: doc.data().name
        } );
    } );

    return tags;
};
