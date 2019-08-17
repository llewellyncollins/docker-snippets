<template>
    <div class="snippet-list">
        <SnippetItem
            :id="snippet.id"
            :name="snippet.name"
            :author="snippet.author.displayName"
            :authorId="snippet.author.uid"
            :description="snippet.description"
            :content="snippet.content"
            :copyCount="snippet.copyCount"
            :starCount="snippet.starCount"
            :editable="snippet.author.uid === uid"
            :starred="starredSnippetIds.includes(snippet.id)"
            v-for="(snippet, index) in snippets"
            :key="index"
        />
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import SnippetItem from '@/components/SnippetItem';

export default {
    name: 'SnippetList',
    components: {
        SnippetItem
    },
    props: {
        snippets: Array,
        uid: String
    },
    computed: {
        ...mapGetters('user', ['userDetails']),
        ...mapGetters('snippets', ['starredSnippetIds'])
    }
};
</script>
<style lang="scss">
.snippet-name,
.snippet-author {
    text-transform: lowercase;
}
</style>
