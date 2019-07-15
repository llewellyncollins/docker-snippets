<template>
    <div>
        <ProgressBar :loading="!snippets" />
        <div v-if="snippets">
            <SnippetItem
                v-for="(snippet, index) in snippets"
                :key="index"
                :id="snippet.id"
                :name="snippet.name"
                author="John"
                :description="snippet.description"
                :content="snippet.content"
                :tags="snippet.tags"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'vuex';
import ProgressBar from '@/components/ProgressBar';
import SnippetItem from '@/components/SnippetItem';

export default {
    name: 'Home',
    components: {
        ProgressBar,
        SnippetItem
    },
    computed: {
        ...mapState(['snippets'])
    }
};
</script>
