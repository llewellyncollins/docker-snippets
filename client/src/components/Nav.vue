<template>
    <v-toolbar v-if="visible" color="primary" app dark>
        <v-toolbar-title class="headline text-uppercase">
            <span>Docker</span>
            <span class="font-weight-light">Snippets</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn id="explore-button" flat to="/">Explore</v-btn>
            <v-btn id="explore-button" flat to="/snippet/create">Create</v-btn>
            <v-btn v-if="!isUserSignedIn" id="signin-button" flat to="/signin"
                >Sign In</v-btn
            >
            <v-btn v-if="isUserSignedIn" id="signout-button" flat to="/signout"
                >Sign Out</v-btn
            >
        </v-toolbar-items>
    </v-toolbar>
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
        isUserSignedIn: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            //
        };
    }
};
</script>
