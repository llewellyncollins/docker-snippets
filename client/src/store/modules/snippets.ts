import firebase from 'firebase/app';
import { Store } from 'vuex';
import Snippet from '../../../../interfaces/Snippet';

interface State {
    activeSnippet?: Snippet;
    snippetList?: Snippet[];
    starredSnippetIds: string[];
}

interface EditStarPayload {
    userId: string;
    snippetId: string;
}

const defaultState: State = {
    activeSnippet: undefined,
    snippetList: undefined,
    starredSnippetIds: []
};

const increment = firebase.firestore.FieldValue.increment( 1 );

export default {
    namespaced: true,
    state: defaultState,
    mutations: {
        setSnippets( state: State, newSnippets: Snippet[] ) {
            state.snippetList = newSnippets;
        },
        setActiveSnippet( state: State, snippet: Snippet ) {
            state.activeSnippet = snippet;
        },
        addSnippet( state: State, snippet: Snippet ) {
            if ( state.snippetList && snippet ) {
                state.snippetList.push( snippet );
            }
        },
        deleteSnippet( state: State, id: string ) {
            if ( state.snippetList ) {
                const index = state.snippetList.findIndex( ( snippet ) => {
                    return snippet.id === id;
                } );

                if ( index !== -1 ) {
                    state.snippetList.splice( index, 1 );
                }
            }
        },
        editSnippet( state: State, editedSnippet: Snippet ) {
            if ( state.snippetList ) {
                const index = state.snippetList.findIndex( ( snippet ) => {
                    return snippet.id === editedSnippet.id;
                } );

                const oldSnippet = state.snippetList[ index ];
                if ( oldSnippet ) {
                    state.snippetList[ index ] = Object.assign( oldSnippet, editedSnippet );
                }
            }
        },
        incrementSnippetCopies( state: State, id: string ) {
            if ( state.snippetList ) {
                const index = state.snippetList.findIndex( ( snippet ) => {
                    return snippet.id === id;
                } );

                if ( state.snippetList[ index ] ) {
                    state.snippetList[ index ].copyCount++;
                }
            }
        },
        setStarredSnippets( state: State, starredSnippetIds: string[] ) {
            state.starredSnippetIds = starredSnippetIds;
        },
        addStar( state: State, snippetId: string ) {
            state.starredSnippetIds.push( snippetId );
        },
        removeStar( state: State, snippetId: string ) {
            const index = state.starredSnippetIds.indexOf( snippetId );
            if ( index !== -1 ) {
                state.starredSnippetIds.splice( index, 1 );
            }
        }
    },
    actions: {
        loadStarredSnippets( { commit }: Store<State>, uid: string ) {
            return firebase.firestore().collection( 'stars' )
                .where( 'userId', '==', uid ).get()
                .then( ( querySnapShot ) => {
                    const starredSnippetIds = querySnapShot.docs.map( ( doc ) => doc.data().snippetId );
                    commit( 'setStarredSnippets', starredSnippetIds );
                } );
        },
        loadSnippets( { commit }: Store<State> ) {
            return firebase.firestore().collection( 'snippets' ).limit( 10 ).get()
                .then( ( querySnapShot ) => {
                    const payload = querySnapShot.docs.map( ( doc ) => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            ...data
                        };
                    } );

                    commit( 'setSnippets', payload );
                } );
        },
        loadSnippet( { commit }: Store<State>, id: string ) {
            return firebase.firestore().collection( 'snippets' ).doc( id ).get()
                .then( ( doc ) => {
                    const data = doc.data();

                    const payload = {
                        id: doc.id,
                        ...data
                    };

                    commit( 'setActiveSnippet', payload );

                    return payload;
                } );
        },
        addSnippet( { commit }: Store<State>, snippet: Snippet ) {
            // TODO: Validate
            const currentUser = firebase.auth().currentUser;
            const uid = currentUser!.uid;
            const displayName = currentUser!.displayName;
            return firebase.firestore().collection( 'snippets' ).add( {
                ...snippet,
                author: {
                    uid,
                    displayName
                }
            } ).then( ( doc ) => {
                return doc.get();
            } ).then( ( doc ) => {
                const payload: Snippet = {
                    id: doc.id,
                    name: snippet.name,
                    content: snippet.content,
                    description: snippet.description,
                    tags: snippet.tags,
                    copyCount: snippet.copyCount,
                    starCount: snippet.starCount,
                    author: {
                        uid,
                        displayName
                    }
                };

                commit( 'addSnippet', payload );
                commit( 'setActiveSnippet', payload );
            } );
        },
        deleteSnippet( { commit }: Store<State>, id: string ) {
            return firebase.firestore().collection( 'snippets' ).doc( id ).delete()
                .then( () => {
                    commit( 'deleteSnippet', id );
                } );
        },
        editSnippet( { commit }: Store<State>, snippet: Snippet ) {
            // TODO: Validate
            return firebase.firestore().collection( 'snippets' ).doc( snippet.id ).update( {
                name: snippet.name,
                content: snippet.content,
                description: snippet.description
            } ).then( () => {
                commit( 'editSnippet', snippet );
                commit( 'setActiveSnippet', snippet );
            } );
        },
        incrementSnippetCopies( { commit }: Store<State>, snippetId: string ) {
            return firebase.firestore().collection( 'snippets' ).doc( snippetId )
                .update( { copyCount: increment } ).then( () => {
                    commit( 'incrementSnippetCopies', snippetId );
                } );
        },
        addStar( { commit }: Store<State>, payload: EditStarPayload ) {
            const { userId, snippetId } = payload;
            return firebase.firestore().collection( 'stars' ).doc( `${ userId }_${ snippetId }` ).set( {
                userId,
                snippetId
            } ).then( () => {
                commit( 'addStar', snippetId );
            } );
        },
        removeStar( { commit }: Store<State>, payload: EditStarPayload ) {
            const { userId, snippetId } = payload;
            return firebase.firestore().collection( 'stars' ).doc( `${ userId }_${ snippetId }` ).delete().then( () => {
                commit( 'removeStar', snippetId );
            } );
        }
    },
    getters: {
        activeSnippet( state: State ) {
            return state.activeSnippet;
        },
        snippetList( state: State ) {
            return state.snippetList;
        },
        starredSnippetIds( state: State ) {
            return state.starredSnippetIds;
        }
    }
};
