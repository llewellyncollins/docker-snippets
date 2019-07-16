<template>
    <div>
        <ProgressBar :loading="loading" />
        <ViewSnippet
            v-if="!loading && selectedSnippet"
            :id="selectedSnippet.id"
            :name="selectedSnippet.name"
            :content="selectedSnippet.content"
            :author="selectedSnippet.author"
            :description="selectedSnippet.description"
            :tags="selectedSnippet.tags"
            :downloads="selectedSnippet.downloads"
            :stars="selectedSnippet.stars"
        />
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import ProgressBar from '@/components/ProgressBar';
import ViewSnippet from '@/components/ViewSnippet';
export default {
    name: 'Snippet',
    components: { ProgressBar, ViewSnippet },
    data() {
        return {
            loading: true
        };
    },
    created() {
        this.loadSnippet(this.id).then(() => {
            this.loading = false;
        });
    },
    computed: {
        ...mapState('snippets', ['selectedSnippet']),
        id: function() {
            return this.$route.params.id;
        }
    },
    methods: {
        ...mapActions('snippets', ['loadSnippet'])
    }
};
</script>
