<template>
    <div class="tag-list">
        <ul>
            <li v-for="(tag, index) in tags" :key="index">
                <span>{{ tag.name }}</span>
                <button class="delete-btn" @click="deleteTag(tag.id)">
                    Delete
                </button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState, mapGetters, mapActions } from 'vuex';

@Component({
    computed: {
        ...mapState(['tags'])
    }
})
export default class TagList extends Vue {
    private deleteTag(id: string) {
        this.$store.dispatch('deleteTag', id);
    }
}
</script>

<style scoped lang="scss">
.tag-list {
    li {
        @apply leading-loose mb-4 pb-4 border-b-2;
        position: relative;

        .delete-btn {
            @apply bg-blue-500 text-white font-bold py-1 px-2 border border-blue-700 rounded object-right;
            position: absolute;
            right: 0;
        }
    }
}
</style>
