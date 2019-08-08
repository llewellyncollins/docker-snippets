<template>
    <div class="page home">
        <ProgressBar :loading="!featuredSnippets" />
        <SnippetList v-if="featuredSnippets" :snippets="featuredSnippets" :uid="uid" />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ProgressBar from '@/components/ProgressBar';
import SnippetList from '@/components/SnippetList';

export default {
    name: 'Home',
    components: {
        ProgressBar,
        SnippetList
    },
    computed: {
        ...mapState('snippets', ['featuredSnippets']),
        ...mapState('user', ['uid'])
    }
};
</script>
