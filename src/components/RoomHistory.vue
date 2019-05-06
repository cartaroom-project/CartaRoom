<template>
    <div class="room-history">
        <room-history-item></room-history-item>
        <room-history-item></room-history-item>
        <room-history-item></room-history-item>
    </div>
</template>

<script>
    import RoomHistoryItem from "./RoomHistoryItem";
    export default {
        name: "RoomHistory",
        components: {RoomHistoryItem}
    }
</script>

<style scoped>

</style>
