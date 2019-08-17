<template>
    <v-card class="mb-3 snippet-item" hover>
        <v-card-title primary-title>
            <div>
                <h3 class="snippet-name headline mb-0">{{ name }}</h3>
                <div>
                    By User:
                    <span class="snippet-author">
                        {{ author }}
                    </span>
                </div>
            </div>
            <v-spacer></v-spacer>
            <Counter label="copies" :value="copyCount" />
            <Counter label="stars" :value="starCount" />
        </v-card-title>

        <v-card-text class="snippet-description">
            {{ description }}
        </v-card-text>

        <v-card-actions>
            <v-btn name="star" flat color="orange" :loading="starLoading" v-if="!starred" @click="onAddStar">Star</v-btn>
            <v-btn name="star" flat color="orange" :loading="starLoading" v-if="starred" @click="onRemoveStar">Un Star</v-btn>
            <v-btn name="customise" flat color="orange" :to="`/snippet/${id}`">Customise</v-btn>
            <v-btn v-if="editable" name="edit" flat color="orange" :to="`/snippet/edit/${id}`">Edit</v-btn>
            <v-btn v-if="editable" name="delete" flat color="orange" @click="deleteSnippet(id)">Delete</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import { mapActions } from 'vuex';
import Counter from '@/components/Counter';

export default {
    name: 'SnippetItem',
    components: {
        Counter
    },
    props: {
        id: String,
        name: String,
        author: String,
        authorId: String,
        content: String,
        description: String,
        copyCount: Number,
        starCount: Number,
        editable: Boolean,
        starred: Boolean
    },
    data() {
        return {
            starLoading: false
        };
    },
    methods: {
        ...mapActions('snippets', ['deleteSnippet', 'addStar', 'removeStar']),
        async onAddStar() {
            this.starLoading = true;
            await this.addStar({ userId: this.authorId, snippetId: this.id });
            this.starLoading = false;
        },
        async onRemoveStar() {
            this.starLoading = true;
            await this.removeStar({ userId: this.authorId, snippetId: this.id });
            this.starLoading = false;
        }
    }
};
</script>
