import firebase from 'firebase/app';
import { Store } from 'vuex';
import Snippet from '../../../../interfaces/Snippet';

interface State {
    activeSnippet?: Snippet;
    snippetList?: Snippet[];
}

const defaultState: State = {
    activeSnippet: undefined,
    snippetList: undefined
};

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
        }
    },
    actions: {
        loadSnippets( { commit }: Store<State> ) {
            return firebase.firestore().collection( 'snippets' ).limit( 10 ).get()
                .then( ( querySnapShot ) => {
                    const payload: Snippet[] = querySnapShot.docs.map( ( doc ) => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            name: data.name,
                            content: data.content,
                            description: data.description,
                            tags: data.tags,
                            author: {
                                uid: data!.author.uid,
                                displayName: data!.author.displayName
                            }
                        };
                    } );

                    commit( 'setSnippets', payload );
                } );
        },
        loadSnippet( { commit }: Store<State>, id: string ) {
            return firebase.firestore().collection( 'snippets' ).doc( id ).get()
                .then( ( doc ) => {
                    const data = doc.data();

                    const payload: Snippet = {
                        id: doc.id,
                        name: data!.name,
                        content: data!.content,
                        description: data!.description,
                        tags: data!.tags,
                        author: {
                            uid: data!.author.uid,
                            displayName: data!.author.displayName
                        }
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
                const payload: Snippet = {
                    id: doc.id,
                    name: snippet.name,
                    content: snippet.content,
                    description: snippet.description,
                    tags: snippet.tags,
                    author: {
                        uid,
                        displayName
                    }
                };

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
        }
    },
    getters: {
        activeSnippet( state: State ) {
            return state.activeSnippet;
        },
        snippetList( state: State ) {
            return state.snippetList;
        }
    }
};