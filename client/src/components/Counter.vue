<template>
    <div class="counter-container">
        <div class="counter-value">{{ value }}</div>
        <div class="counter-label">{{ label }}</div>
    </div>
</template>

<script>
export default {
    name: 'Counter',
    components: {},
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        value: {
            type: Number,
            default: 0
        },
        label: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            //
        };
    }
};
</script>
