import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyC6cTNDv3SJ1hSWiENsgVe90-BWMCBwcOA',
    authDomain: 'docker-snippets.firebaseapp.com',
    databaseURL: 'https://docker-snippets.firebaseio.com',
    projectId: 'docker-snippets',
    storageBucket: 'docker-snippets.appspot.com',
    messagingSenderId: '681353270380',
    appId: '1:681353270380:web:6f7e2501b670890d'
};

firebase.initializeApp( firebaseConfig );

export default firebase;
