import * as admin from 'firebase-admin'

admin.initializeApp()

export { api } from './http'
export { getTags, addTag, deleteTag } from './callable'
