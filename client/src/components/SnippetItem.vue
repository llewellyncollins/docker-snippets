<template>
    <v-card class="mb-3 snippet-item" hover>
        <v-card-title primary-title>
            <div>
                <h3 class="snippet-name headline mb-0">{{ name }}</h3>
                <div>
                    By User:
                    <span class="snippet-author">
                        {{
                        author
                        }}
                    </span>
                </div>
            </div>
            <v-spacer></v-spacer>
            <Counter label="downlads" :value="downloads" />
            <Counter label="stars" :value="stars" />
        </v-card-title>

        <v-card-text class="snippet-description">
            {{
            description
            }}
        </v-card-text>

        <v-card-actions>
            <v-btn name="star" flat color="orange">Star</v-btn>
            <v-btn name="customise" flat color="orange" :to="`/snippet/${id}`">Customise</v-btn>
            <v-btn name="edit" flat color="orange" :to="`/snippet/edit/${id}`">Edit</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import Counter from "@/components/Counter";
export default {
    name: "SnippetItem",
    components: {
        Counter
    },
    props: {
        id: String,
        name: String,
        author: String,
        content: String,
        description: String,
        downloads: Number,
        stars: Number
    },
    data() {
        return {
            liveContent: ""
        };
    },
    computed: {
        downloadLink: function() {
            const file = new Blob([this.content], {
                type: "text/plain;charset=utf-8"
            });

            return URL.createObjectURL(file);
        }
    },
    methods: {
        download() {}
    }
};
</script>