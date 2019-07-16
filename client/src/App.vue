<template>
    <v-app>
        <Nav :visible="true" :isUserSignedIn="false" />
        <v-content>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import Nav from '@/components/Nav';

export default {
    name: 'App',
    components: {
        Nav
    },
    created() {
        // TODO: Fetch the latest snippets. Find a better place for this
        this.loadSnippets();
    },
    methods: {
        ...mapActions('snippets', [`loadSnippets`])
    }
};
</script>
