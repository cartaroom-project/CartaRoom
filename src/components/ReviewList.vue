<template>
    <div class="reivew-list">
        <review-list-item></review-list-item>
        <review-list-item></review-list-item>
        <review-list-item></review-list-item>
        <review-list-item></review-list-item>
    </div>
</template>

<script>
    import ReviewListItem from "./ReviewListItem";
    export default {
        name: "ReviewList",
        components: {ReviewListItem}
    }
</script>

<style scoped>

</style>
