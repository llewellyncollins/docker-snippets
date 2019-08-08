import firebase from 'firebase/app';
import { Store } from 'vuex';
import Snippet from '../../../../interfaces/Snippet';

interface State {
    activeSnippet?: Snippet;
    featuredSnippets?: Snippet[];
}

const defaultState: State = {
    activeSnippet: undefined,
    featuredSnippets: undefined
};

export default {
    namespaced: true,
    state: defaultState,
    mutations: {
        setSnippets( state: State, newSnippets: Snippet[] ) {
            state.featuredSnippets = newSnippets;
        },
        setActiveSnippet( state: State, snippet: Snippet ) {
            state.activeSnippet = snippet;
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
                            userId: data.userId,
                            name: data.name,
                            content: data.content,
                            description: data.description,
                            tags: data.tags
                        }
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
                        userId: data!.userId,
                        name: data!.name,
                        content: data!.content,
                        description: data!.description,
                        tags: data!.tags
                    };

                    commit( 'setActiveSnippet', payload );

                    return payload;
                } );
        },
        addSnippet( { commit }: Store<State>, snippet: Snippet ) {
            // TODO: Validate
            const userId = firebase.auth().currentUser!.uid;
            return firebase.firestore().collection( 'snippets' ).add( {
                ...snippet,
                userId
            } ).then( ( doc ) => {
                const payload: Snippet = {
                    id: doc.id,
                    userId,
                    name: snippet.name,
                    content: snippet.content,
                    description: snippet.description,
                    tags: snippet.tags
                };

                commit( 'setActiveSnippet', payload );
            } );
        },
        editSnippet( { commit }: Store<State>, snippet: Snippet ) {
            // TODO: Validate
            return firebase.firestore().collection( 'snippets' ).doc( snippet.id ).update( {
                name: snippet.name,
                content: snippet.content,
                description: snippet.description
            } ).then( () => {
                commit( 'setActiveSnippet', snippet );
            } );
        }
    },
    getters: {
        activeSnippet( state: State ) {
            return state.activeSnippet;
        },
        featuredSnippets( state: State ) {
            return state.featuredSnippets;
        }
    }
}