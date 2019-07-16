<template>
    <div>
        <v-card class="mb-3">
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">{{ name }}</h3>
                    <div>By User: {{ author }}</div>
                </div>
                <v-spacer></v-spacer>
            </v-card-title>

            <v-card-text> </v-card-text>

            <v-card-actions>
                <v-btn flat color="orange">Download</v-btn>
            </v-card-actions>
        </v-card>
        <v-sheet class="d-flex" color="grey lighten-3" height="424">
            {{ output }}
        </v-sheet>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    name: 'ViewSnippet',
    components: {},
    props: {
        id: {
            type: String,
            default: ''
        },
        slug: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        author: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        },
        tags: {
            type: Array
        },
        downloads: {
            type: Number
        },
        stars: {
            type: Number
        }
    },
    created() {
        const regex = /{{([a-zA-Z]+)}}/g;
        const matches = this.content.match(regex);
    },
    computed: {
        variables() {
            return [];
        },
        output() {
            return 'sss';
        }
    },
    data() {
        return {
            loading: false,
            inputs: []
        };
    }
};
</script>
