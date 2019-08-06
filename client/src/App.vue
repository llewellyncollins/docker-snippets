<template>
    <v-app>
        <ProgressBar :loading="!ready" />
        <Nav v-if="ready" :visible="true" :isLoggedIn="isLoggedIn" :onSignOut="onSignOut" />
        <v-content>
            <v-container v-if="ready">
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ProgressBar from '@/components/ProgressBar';
import Nav from '@/components/Nav';

export default {
    name: 'App',
    components: {
        Nav,
        ProgressBar
    },
    created() {
        // TODO: Fetch the latest snippets. Find a better place for this
        this.loadSnippets();
    },
    methods: {
        ...mapActions('snippets', [`loadSnippets`]),
        ...mapActions('user', [`signOut`]),
        async onSignOut() {
            await this.signOut();
            this.$router.push('/auth');
        }
    },
    computed: {
        ...mapState('user', ['isLoggedIn']),
        ...mapState(['ready'])
    }
};
</script>
