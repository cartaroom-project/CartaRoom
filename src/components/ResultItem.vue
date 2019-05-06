<template>
    <div class="result-item">
        <room-thumbnail></room-thumbnail>
        <h2>Name</h2>
        <p class="result-decription">Here is a room lol</p>
        <p>address<p>
        <p>BookingStatus</p>
        <button>Book Now</button>
    </div>
</template>

<script>
    import RoomThumbnail from "./RoomThumbnail";
    export default {
        name: "ResultItem",
        components: {RoomThumbnail}
    }
</script>

<style scoped>

</style>
