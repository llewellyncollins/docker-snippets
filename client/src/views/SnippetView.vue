<template>
    <div class="page view">
        <ProgressBar :loading="loading || !activeSnippet" />
        <div v-if="!loading && activeSnippet">
            <v-card class="mb-3">
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0 info-name">{{ activeSnippet.name }}</h3>
                        <div class="info-author">By User: {{ activeSnippet.author.displayName }}</div>
                    </div>
                    <v-spacer></v-spacer>
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
                    <v-btn name="copy" flat color="orange">Copy</v-btn>
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
import ProgressBar from '@/components/ProgressBar';

const regex = /{{([a-zA-Z]+):([a-zA-Z0-9]+)}}/g;

export default {
    name: 'Snippet',
    components: { ProgressBar },
    data() {
        return {
            loading: true,
            liveContent: '',
            variables: []
        };
    },
    async created() {
        await this.loadSnippet(this.id);

        this.loading = false;
        const variables = [...this.activeSnippet.content.matchAll(regex)];

        this.variables = variables.map((variable) => {
            return {
                name: variable[1],
                value: variable[2]
            };
        });
    },
    computed: {
        ...mapGetters('snippets', ['activeSnippet']),
        id() {
            return this.$route.params.id;
        }
    },
    watch: {
        variables() {
            const content = this.variables.reduce((output, variable) => {
                const regexStr = `{{${variable.name}:[a-zA-Z0-9]+}}`;
                return output.replace(new RegExp(regexStr, 'g'), variable.value);
            }, this.activeSnippet.content);

            this.liveContent = content;
        }
    },
    methods: {
        ...mapActions('snippets', ['loadSnippet']),
        onValueChanged(index, value) {
            this.variables.splice(index, 1, Object.assign(this.variables[index], { value }));
        }
    }
};
</script>
