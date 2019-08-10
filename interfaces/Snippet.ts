export default interface Snippet {
    id?: string;
    name: string;
    content: string;
    description: string;
    tags: string[];
    copyCount: number,
    starCount: number,
    author?: {
        uid: string;
        displayName?: string | null;
    };
}
