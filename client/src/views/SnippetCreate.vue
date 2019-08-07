<template>
    <div class="page create">
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" :counter="30" :rules="nameRules" label="Name" name="name" required clearable></v-text-field>
            <v-textarea
                v-model="description"
                :counter="500"
                :rules="descriptionRules"
                label="Description"
                name="description"
                auto-grow
            ></v-textarea>
            <v-textarea v-model="content" :counter="1000" :rules="contentRules" label="Dockerfile" name="content" auto-grow></v-textarea>
            <v-btn name="create" :disabled="!valid" :loading="loading" @click="submit">Add</v-btn>
        </v-form>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    name: 'Create',
    components: {},
    data() {
        return {
            name: '',
            description: '',
            content: '',
            author: '',
            tags: [],
            valid: false,
            loading: false,
            nameRules: [
                (v) => !!v || 'Name is required',
                (v) => (v && v.length <= 30 && v.length >= 4) || 'Name must be between 4 and 30 characters'
            ],
            descriptionRules: [
                (v) => !!v || 'Description is required',
                (v) => (v && v.length <= 500 && v.length >= 10) || 'Description must be between 10 and 500 characters'
            ],
            contentRules: [
                (v) => !!v || 'Content is required',
                (v) => (v && v.length <= 1000 && v.length >= 10) || 'Dockerfile must be between 10 and 500 characters'
            ]
        };
    },
    methods: {
        ...mapActions('snippets', ['addSnippet']),
        async submit() {
            if (this.$refs.form.validate()) {
                this.loading = true;
                await this.addSnippet({
                    name: this.name,
                    description: this.description,
                    content: this.content
                });
                this.loading = false;
                this.$router.push('/');
            }
        }
    }
};
</script>
