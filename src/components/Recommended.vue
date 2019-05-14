<template>
    <div class="recommended">
        <h1>Recommended for you!</h1>
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
