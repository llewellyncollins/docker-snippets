<template>
    <div class="page view">
        <ProgressBar :loading="loading" />
        <div v-if="!loading">
            <v-card class="mb-3">
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0 info-name">{{ snippet.name }}</h3>
                        <div class="info-author">By User: {{ snippet.author.displayName }}</div>
                    </div>
                    <v-spacer></v-spacer>

                    <Counter label="copies" :value="snippet.copyCount" />
                </v-card-title>

                <v-card-text class="variables">
                    <v-text-field
                        v-for="(item, index) in variables"
                        :key="index"
                        :label="item.name"
                        :value="item.value"
                        :name="item.name"
                        @input="onValueChanged(index, $event)"
                        class="variable"
                    ></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-btn name="copy" flat color="orange" @click="onCopy">Copy</v-btn>
                </v-card-actions>
            </v-card>
            <v-sheet class="d-flex content" color="grey lighten-3" height="424">
                {{ liveContent }}
            </v-sheet>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import firebase from '../firebase';
import ProgressBar from '@/components/ProgressBar';
import Counter from '@/components/Counter';

const regex = /{{([a-zA-Z]+):([a-zA-Z0-9]+)}}/g;

export default {
    name: 'Snippet',
    components: { ProgressBar, Counter },
    data() {
        return {
            loading: true,
            liveContent: '',
            unsubscribe: null,
            snippet: null,
            variables: []
        };
    },
    destroyed() {
        this.unsubscribe();
    },
    async created() {
        // await this.loadSnippet(this.id);

        this.unsubscribe = firebase
            .firestore()
            .collection('snippets')
            .doc(this.id)
            .onSnapshot((doc) => {
                const data = doc.data();
                if (this.loading === true) {
                    this.loading = false;
                    this.snippet = {
                        id: doc.id,
                        ...data
                    };

                    const variables = [...this.snippet.content.matchAll(regex)];

                    this.variables = variables.map((variable) => {
                        return {
                            name: variable[1],
                            value: variable[2]
                        };
                    });
                } else {
                    this.snippet.copyCount = data.copyCount;
                }
            });
    },
    computed: {
        id() {
            return this.$route.params.id;
        }
    },
    watch: {
        variables() {
            const content = this.variables.reduce((output, variable) => {
                const regexStr = `{{${variable.name}:[a-zA-Z0-9]+}}`;
                return output.replace(new RegExp(regexStr, 'g'), variable.value);
            }, this.snippet.content);

            this.liveContent = content;
        }
    },
    methods: {
        ...mapActions('snippets', ['loadSnippet', 'incrementSnippetCopies']),
        onValueChanged(index, value) {
            this.variables.splice(index, 1, Object.assign(this.variables[index], { value }));
        },
        async onCopy() {
            this.$copyText(this.liveContent).then(() => {
                // TODO: Show copied message
                this.incrementSnippetCopies(this.snippet.id);
            });
        }
    }
};
</script>
