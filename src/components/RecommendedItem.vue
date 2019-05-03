<template>
    <div class="recommended-item">
        <RoomThumbnail></RoomThumbnail>
        <h2>Book Title</h2>
        <button>Book Now</button>
    </div>
</template>

<script>
    import RoomThumbnail from "./RoomThumbnail";
    export default {
        name: "RecommendedItem",
        components: {RoomThumbnail}
    }
</script>

<style scoped>
.recommended-item {
    display: inline-block;
    max-width: 20%;
    padding: 16px;
}

</style>
