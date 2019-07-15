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
    created: function() {
        this.setSnippets();
    },
    data() {
        return {
            //
        };
    },
    methods: {
        ...mapActions([`setSnippets`])
    }
};
</script>
