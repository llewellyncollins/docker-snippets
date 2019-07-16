<template>
    <div>
        <div v-for="(snippet, index) in snippets" :key="index">
            <v-card :to="`/snippet/${snippet.id}`" class="mb-3" hover ripple>
                <v-card-title primary-title>
                    <div>
                        <h3 class="snippet-name headline mb-0">{{ snippet.name }}</h3>
                        <div>
                            By User:
                            <span class="snippet-author">
                                {{
                                snippet.author
                                }}
                            </span>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <Counter label="downlads" :value="snippet.downloads" />
                    <Counter label="stars" :value="snippet.stars" />
                </v-card-title>

                <v-card-text class="snippet-description">
                    {{
                    snippet.description
                    }}
                </v-card-text>

                <v-card-actions>
                    <v-btn flat color="orange">Star</v-btn>
                    <v-btn flat color="orange">Customise</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>
<script>
import Counter from "@/components/Counter";
export default {
    name: "SnippetList",
    components: {
        Counter
    },
    props: {
        snippets: Array
    }
};
</script>
<style lang="scss">
.snippet-name,
.snippet-author {
    text-transform: lowercase;
}
</style>
