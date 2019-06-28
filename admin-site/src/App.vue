<template>
    <div id="app">
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    </div>
</template>

<template>
    <div>
        <Nav />
        <div class="container mx-auto">
            <div class="flex flex-wrap pt-8">
                <div class="w-full md:w-1/2 h-12 px-2">
                    <div v-if="!tagsLoaded">Loading tags..</div>
                    <div v-if="tagsLoaded">
                        <TagInput />
                        <TagList />
                    </div>
                </div>
                <div class="w-full md:w-1/2 h-12 px-2">
                    <div v-if="!snippetsLoaded">Loading snippets..</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions } from 'vuex';
import Nav from './components/Nav.vue';
import TagInput from './components/TagInput.vue';
import TagList from './components/TagList.vue';

@Component({
    components: {
        Nav,
        TagInput,
        TagList
    },
    methods: {
        ...mapActions([`getTags`])
    }
})
export default class App extends Vue {
    private tagsLoaded: boolean = false;
    private snippetsLoaded: boolean = false;

    private created() {
        this.$store.dispatch('getTags').then(() => {
            this.tagsLoaded = true;
        });
    }
}
</script>

<style lang="scss"></style>
