<template>
    <div class="recommended">
        <recommended-item></recommended-item>
        <recommended-item></recommended-item>
        <recommended-item></recommended-item>
    </div>
</template>

<script>
    import RecommendedItem from "./RecommendedItem";
    export default {
        name: "Recommended",
        components: {RecommendedItem}
    }
</script>

<style scoped>

</style>
