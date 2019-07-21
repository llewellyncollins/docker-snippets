<template>
    <div>
        <ProgressBar :loading="loading" />
        <div v-if="!loading">
            <v-card class="mb-3">
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">{{ name }}</h3>
                        <div>By User: {{ author }}</div>
                    </div>
                    <v-spacer></v-spacer>
                </v-card-title>

                <v-card-text>
                    <v-text-field
                        v-for="(item, index) in variables"
                        :key="index"
                        :label="item.name"
                        :value="item.value"
                        @input="onValueChanged(index, $event)"
                    ></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-btn flat color="orange">Copy</v-btn>
                </v-card-actions>
            </v-card>
            <v-sheet class="d-flex" color="grey lighten-3" height="424">
                {{
                liveContent
                }}
            </v-sheet>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import ProgressBar from "@/components/ProgressBar";

const regex = /{{([a-zA-Z]+):([a-zA-Z0-9]+)}}/g;

export default {
    name: "Snippet",
    components: { ProgressBar },
    data() {
        return {
            loading: true,
            name: "",
            author: "",
            content: "",
            liveContent: "",
            variables: []
        };
    },
    created() {
        this.loadSnippet(this.id).then(response => {
            this.loading = false;
            this.name = response.name;
            this.author = response.author;
            this.content = response.content;

            const variables = [...response.content.matchAll(regex)];

            this.variables = variables.map(variable => {
                return {
                    name: variable[1],
                    value: variable[2]
                };
            });
        });
    },
    computed: {
        id() {
            return this.$route.params.id;
        }
    },
    watch: {
        variables() {
            let content = this.variables.reduce((output, variable) => {
                const regexStr = `{{${variable.name}:[a-zA-Z0-9]+}}`;
                return output.replace(
                    new RegExp(regexStr, "g"),
                    variable.value
                );
            }, this.content);

            this.liveContent = content;
        }
    },
    methods: {
        ...mapActions("snippets", ["loadSnippet"]),
        onValueChanged(index, value) {
            this.variables.splice(
                index,
                1,
                Object.assign(this.variables[index], { value })
            );
        }
    }
};
</script>
