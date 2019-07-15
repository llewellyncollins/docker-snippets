<template>
    <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
</template>

<script>
export default {
    name: 'ProgressBar',
    props: {
        loading: {
            type: Boolean,
            default: true
        }
    }
};
</script>
