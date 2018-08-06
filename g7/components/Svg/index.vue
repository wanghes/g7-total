<template>
    <svg class="icon" aria-hidden="true">
        {{type}}
        <use :xlink:href="'#' + type"></use>
    </svg>
</template>

<script>
    export default {
        name: 'g7-svg',
        props: {
            type: {
                type: String,
                default: 'icon-weibiaoti-1',
            },
        },
    };
</script>

<style scoped>
    .icon {
        width: 24px;
        height:24px;
        vertical-align: -0.15em;
        color:#fff;
        fill: currentColor;
        overflow: hidden;
    }
</style>
