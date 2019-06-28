<template>
    <form class="tag-input">
        <div class="container">
            <input
                class="input-box focus:outline-none"
                type="text"
                placeholder="Tag"
                :disabled="!canSubmit"
                v-model.trim="newTag"
                @keyup="onChange"
            />
            <button
                class="add-tag-button"
                type="button"
                :class="{ disabled: !canSubmit || !validTag }"
                :disabled="!canSubmit || !validTag"
                @click="onSumbit()"
            >
                Add Tag
            </button>
        </div>
        <p v-if="!validTag" class="message">
            Please enter a valid tag
        </p>
    </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState, mapGetters, mapActions } from 'vuex';

@Component
export default class TagInput extends Vue {
    private newTag: string = '';
    private canSubmit: boolean = true;
    private validTag: boolean = false;

    private onSumbit() {
        if (this.validTag) {
            this.canSubmit = false;

            this.$store.dispatch('addTag', this.newTag).then(() => {
                this.canSubmit = true;
                this.validTag = false;
                this.newTag = '';
            });
        }
    }

    private onChange() {
        this.validTag = !!(this.newTag && this.newTag !== '');
    }
}
</script>

<style scoped lang="scss">
.tag-input {
    @apply w-full mb-4;

    .container {
        @apply flex items-center border-b border-b-2 border-teal-500 py-2;

        .input-box {
            @apply appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight;
        }

        .add-tag-button {
            @apply flex-shrink-0 bg-teal-500 border-teal-500 text-sm border-4 text-white py-1 px-1 rounded;

            &.disabled {
                @apply opacity-50 cursor-not-allowed;
            }
        }
    }

    .message {
        @apply text-red-500 text-xs italic;
    }
}
</style>
