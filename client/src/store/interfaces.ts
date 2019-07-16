import Snippet from '../../../interfaces/Snippet';

export interface RootState {
    version?: string;
}

export interface SnippetsState {
    selectedSnippet?: Snippet;
    snippetList?: Snippet[];
}
