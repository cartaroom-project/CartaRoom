<template>
    <div class="room-history-item">
        <room-thumbnail></room-thumbnail>
        <h2>Room Title</h2>
        <h3>Reviews (8)</h3>
        <button>View Customers</button>
        <button>View Analytics</button>
        <button>View Customers</button>
        <button>View Customers</button>
    </div>

</template>

<script>
    import RoomThumbnail from "./RoomThumbnail";

    export default {
        name: "RoomHistoryItem",
        components: {RoomThumbnail}
    }
</script>

<style scoped>

</style>
