<template>
    <div>
        <ProgressBar :loading="!snippetList" />
        <div v-if="snippetList">
            <SnippetList :snippets="snippetList" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ProgressBar from "@/components/ProgressBar";
import SnippetList from "@/components/SnippetList";

export default {
    name: "Home",
    components: {
        ProgressBar,
        SnippetList
    },
    computed: {
        ...mapState("snippets", ["snippetList"])
    }
};
</script>
