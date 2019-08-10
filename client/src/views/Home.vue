<template>
    <div class="page home">
        <ProgressBar :loading="!snippetList" />
        <SnippetList v-if="snippetList" :snippets="snippetList" :uid="uid" />
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import ProgressBar from '@/components/ProgressBar';
import SnippetList from '@/components/SnippetList';

export default {
    name: 'Home',
    components: {
        ProgressBar,
        SnippetList
    },
    computed: {
        ...mapGetters('snippets', ['snippetList']),
        ...mapState('user', ['uid'])
    }
};
</script>
