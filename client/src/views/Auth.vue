<template>
    <div class="auth">
        <div id="auth-container"></div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import ProgressBar from '@/components/ProgressBar';
import 'firebase/auth';

export default {
    name: 'Auth',
    components: {
        ProgressBar
    },
    computed: {},
    mounted() {
        const uiConfig = {
            signInSuccessUrl: '/',
            signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
        };
        const ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#auth-container', uiConfig);
    }
};
</script>
