import { MutationTree } from 'vuex';
import { SnippetsState } from '../interfaces';
import Snippet from '../../../../interfaces/Snippet';

export const mutations: MutationTree<SnippetsState> = {
    SET_SNIPPETS( state, newSnippets: Snippet[] ) {
        state.snippetList = newSnippets;
    },
    SET_SNIPPET( state, id ) {
        // TODO: Error if not found
        const snippets = state && state.snippetList && state.snippetList;
        if ( snippets ) {
            // TODO
            const snippet: Snippet = snippets.filter( ( s ) => s.id === id )[ 0 ];
            state.selectedSnippet = snippet;
        }
    }
};
