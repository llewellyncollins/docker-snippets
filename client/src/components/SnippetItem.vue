<template>
    <v-card :to="url" class="mb-3" hover ripple>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">{{ name }}</h3>
                <div>By User: {{ author }}</div>
            </div>
            <v-spacer></v-spacer>
            <Counter label="downlads" :value="downloads" />
            <Counter label="stars" :value="stars" />
        </v-card-title>

        <v-card-text>
            {{ description }}
        </v-card-text>

        <v-card-actions>
            <v-btn flat color="orange">Star</v-btn>
            <v-btn flat color="orange">Customise</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import Counter from '@/components/Counter';
export default {
    name: 'SnippetItem',
    components: {
        Counter
    },
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
    computed: {
        url: function() {
            // TODO: Use slug
            return `/snippet/${this.id}`;
        }
    },
    data() {
        return {
            //
        };
    }
};
</script>
