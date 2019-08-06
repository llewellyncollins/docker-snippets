<template>
    <nav>
        <v-toolbar v-if="visible" color="primary" app dark>
            <v-toolbar-title class="headline text-uppercase">
                <span>Docker</span>
                <span class="font-weight-light">Snippets</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn name="explore" id="explore-button" flat to="/">Explore</v-btn>
                <v-btn name="create" id="explore-button" flat to="/snippet/create">Create</v-btn>
                <v-btn name="sign-in" v-if="!isLoggedIn" id="signin-button" flat to="/auth">Sign In</v-btn>
                <v-btn name="sign-out" v-if="isLoggedIn" id="signout-button" flat @click="signOut">Sign Out</v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </nav>
</template>

<script>
export default {
    name: 'Nav',
    components: {},
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        isLoggedIn: {
            type: Boolean,
            default: false
        },
        onSignOut: {
            type: Function
        }
    },
    methods: {
        signOut() {
            this.onSignOut();
        }
    }
};
</script>
