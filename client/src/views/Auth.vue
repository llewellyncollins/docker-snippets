<template>
    <div class="auth">
        <div id="auth-container"></div>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import ProgressBar from '@/components/ProgressBar';

const uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};
//const ui = new firebaseui.auth.AuthUI(firebase.auth());

export default {
    name: 'Auth',
    components: {
        ProgressBar
    },
    computed: {},
    created() {
        ///this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    },
    mounted() {
        //this.ui.start('#auth-container', uiConfig);
    }
};
</script>
