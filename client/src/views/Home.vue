<template>
    <div>
        <ProgressBar :loading="!snippetList" />
        <div v-if="snippetList">
            <SnippetItem
                v-for="(snippet, index) in snippetList"
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
        ...mapState('snippets', ['snippetList'])
    }
};
</script>
