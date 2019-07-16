<template>
    <div>
        <ProgressBar :loading="loading" />
        <div v-if="!loading">
            <v-card class="mb-3">
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">
                            {{ name }}
                        </h3>
                        <div>By User: {{ author }}</div>
                    </div>
                    <v-spacer></v-spacer>
                </v-card-title>

                <v-card-text></v-card-text>

                <v-card-actions>
                    <v-btn flat color="orange">Download</v-btn>
                </v-card-actions>
            </v-card>
            <v-sheet class="d-flex" color="grey lighten-3" height="424">{{
                content
            }}</v-sheet>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import ProgressBar from '@/components/ProgressBar';

export default {
    name: 'Snippet',
    components: { ProgressBar },
    data() {
        return {
            loading: true,
            name: '',
            author: '',
            content: ''
        };
    },
    created() {
        this.loadSnippet(this.id).then((response) => {
            this.loading = false;
            this.name = response.name;
            this.author = response.author;
            this.content = response.content;
        });
    },
    computed: {
        id() {
            return this.$route.params.id;
        }
    },
    methods: {
        ...mapActions('snippets', ['loadSnippet'])
    }
};
</script>
