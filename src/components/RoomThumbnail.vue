<template>
    <div class="roomthumbnail">
        <img class="thumbnail" src="../assets/main-room.jpg"/>
    </div>
</template>

<script>
    export default {
        name: "RoomThumbnail"
    }
</script>

<style scoped>
    .roomthumbnail {
        padding: 16px;
    }
    .thumbnail {
        min-width: 280px;
        max-width: 350px;
        height: auto;
        padding: 16px;
    }

</style>
