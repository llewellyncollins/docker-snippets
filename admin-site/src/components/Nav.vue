<template>
    <nav class="nav">
        <div class="nav-name">
            <span class="nav-name-span">Docker Snippets Admin</span>
        </div>
    </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Nav extends Vue {}
</script>

<style scoped lang="scss">
.nav {
    @apply flex items-center justify-between flex-wrap p-6;
    background-color: $primary-color;

    .nav-name {
        @apply flex items-center flex-shrink-0 text-white mr-6;

        .nav-name-span {
            @apply font-semibold text-xl tracking-tight;
        }
    }
}
</style>
