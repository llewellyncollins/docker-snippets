import Snippet from '../../../interfaces/Snippet';

export interface RootState {

};

export interface SnippetsState {
    selectedSnippet?: Snippet,
    snippetList?: Snippet[]
}