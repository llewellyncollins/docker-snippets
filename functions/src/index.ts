import * as admin from 'firebase-admin'

admin.initializeApp()

export { createUser, createSnippet, addStar, removeStar } from './triggers';
// export { api } from './http'
// export { getTags, addTag, deleteTag, addSnippet, getSnippets, getSnippet, editSnippet } from './callable'
