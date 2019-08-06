import Snippet from '../../../interfaces/Snippet';

export interface RootState {
    version?: string;
    ready: boolean;
}

export interface SnippetsState {
    selectedSnippet?: Snippet;
    snippetList?: Snippet[];
}

export interface UserState {
    isLoggedIn: boolean;
    displayName?: string;
    email?: string;
    uid?: string;
}
