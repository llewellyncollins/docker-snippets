<template>
    <div>
        <ProgressBar :loading="loading" />
        <ViewSnippet
            v-if="!loading && snippet"
            :id="snippet.id"
            :name="snippet.name"
            :content="snippet.content"
            :author="snippet.author"
            :description="snippet.description"
            :tags="snippet.tags"
            :downloads="snippet.downloads"
            :stars="snippet.stars"
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
        this.setSnippet(this.id).then(() => {
            this.loading = false;
            this.snippet = this.$store.state.snippet;
        });
    },
    computed: {
        id: function() {
            return this.$route.params.id;
        }
    },
    methods: {
        ...mapActions(['setSnippet'])
    }
};
</script>
