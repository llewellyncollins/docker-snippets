<template>
    <div>
        <ProgressBar :loading="loading" />
        <v-card class="mb-3" v-if="!loading && selectedSnippet">
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">{{ selectedSnippet.name }}</h3>
                    <div>By User: {{ selectedSnippet.author }}</div>
                </div>
                <v-spacer></v-spacer>
            </v-card-title>

            <v-card-text></v-card-text>

            <v-card-actions>
                <v-btn flat color="orange">Download</v-btn>
            </v-card-actions>
        </v-card>
        <v-sheet class="d-flex" color="grey lighten-3" height="424">{{ selectedSnippet.content }}</v-sheet>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import ProgressBar from "@/components/ProgressBar";
export default {
    name: "Snippet",
    components: { ProgressBar },
    data() {
        return {
            loading: true
        };
    },
    created() {
        this.loadSnippet(this.id).then(() => {
            this.loading = false;
        });
    },
    computed: {
        ...mapState("snippets", ["selectedSnippet"]),
        id() {
            return this.$route.params.id;
        }
    },
    methods: {
        ...mapActions("snippets", ["loadSnippet"])
    }
};
</script>
