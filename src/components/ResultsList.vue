<template>
    <div class="results-list">
        <div class="results-list-filter">
            some search shiet here with a button
        </div>
        <div class="room-results">
            <result-item></result-item>
            <result-item></result-item>
            <result-item></result-item>
            <result-item></result-item>
            <result-item></result-item>
            <result-item></result-item>
        </div>
    </div>
</template>

<script>
    import ResultItem from "./ResultItem";
    export default {
        name: "ResultsList",
        components: {ResultItem}
    }
</script>

<style scoped>

</style>
