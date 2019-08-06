<template>
    <div class="page home">
        <ProgressBar :loading="!snippetList" />
        <SnippetList v-if="snippetList" :snippets="snippetList" :uid="uid" />
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
        ...mapState('snippets', ['snippetList']),
        ...mapState('user', ['uid'])
    }
};
</script>
