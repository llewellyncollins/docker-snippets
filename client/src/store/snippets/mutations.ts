import { MutationTree } from 'vuex';
import { SnippetsState } from '../interfaces';
import Snippet from '../../../../interfaces/Snippet';

export const mutations: MutationTree<SnippetsState> = {
    SET_SNIPPETS( state, newSnippets: Snippet[] ) {
        state.snippetList = newSnippets;
    },
    SET_SNIPPET( state, snippet: Snippet ) {
        // TODO: Error if not found
        const snippets = state && state.snippetList && state.snippetList;
        if ( snippets ) {
            // TODO
            state.selectedSnippet = snippet;
        }
    }
};
