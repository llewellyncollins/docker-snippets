<template>
    <v-app>
        <Nav :visible="true" :isUserSignedIn="false" />
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
import Nav from '@/components/Nav';
export default {
    name: 'App',
    components: {
        Nav
    },
    data() {
        return {
            //
        };
    }
};
</script>
