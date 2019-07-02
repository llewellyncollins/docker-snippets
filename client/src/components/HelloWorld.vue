<template>
    <div class="hello">
        <input type="text" v-model.trim="name" />
        <input type="text" v-model.trim="description" />
        <input type="textarea" v-model="content" />
        <br />
        <button @click="save">Save</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters, mapActions } from 'vuex';

export default Vue.extend({
    name: 'HelloWorld',
    data() {
        return {
            name: 'test',
            description: 'test',
            content: 'test'
        };
    },
    methods: {
        save: function() {
            this.addSnippet({
                name: this.name,
                description: this.description,
                content: this.content
            });
        },
        ...mapActions(['addSnippet'])
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
