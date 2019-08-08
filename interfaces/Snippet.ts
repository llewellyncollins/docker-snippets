export default interface Snippet {
    id?: string;
    name: string;
    content: string;
    description: string;
    tags: string[];
    author?: {
        uid: string;
        displayName?: string | null;
    };
}
