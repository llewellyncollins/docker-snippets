<template>
    <div class="snippet-list">
        <SnippetItem
            :id="snippet.id"
            :name="snippet.name"
            :author="snippet.author"
            :description="snippet.description"
            :content="snippet.content"
            :downloads="snippet.downloads"
            :stars="snippet.stars"
            v-for="(snippet, index) in snippets"
            :key="index"
        />
    </div>
</template>
<script>
import SnippetItem from '@/components/SnippetItem';

export default {
    name: 'SnippetList',
    components: {
        SnippetItem
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
