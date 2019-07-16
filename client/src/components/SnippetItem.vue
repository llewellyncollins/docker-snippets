<template>
    <v-card :to="url" class="mb-3" hover ripple>
        <v-card-title primary-title>
            <div>
                <h3 class="snippet-name headline mb-0">{{ name }}</h3>
                <div>
                    By User: <span class="snippet-author">{{ author }}</span>
                </div>
            </div>
            <v-spacer></v-spacer>
            <Counter label="downlads" :value="downloads" />
            <Counter label="stars" :value="stars" />
        </v-card-title>

        <v-card-text class="snippet-description">
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
            default: 'John'
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
<style lang="scss">
.snippet-name,
.snippet-author {
    text-transform: lowercase;
}
</style>
