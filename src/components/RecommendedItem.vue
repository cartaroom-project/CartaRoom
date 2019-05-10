<template>
    <div class="recommended-item">
        <RoomThumbnail></RoomThumbnail>
        <h2>Book Title</h2>
        <button class="search_button">Book Now</button>
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
    .search_button{
   background: rgba(84, 142, 255, 0.8);
   
   width:202px;
   border-radius: 15px;
   font-family: Roboto;
   font-style: normal;
   font-weight: 500;
   font-size: 20px;
   text-align: center;
   color: #FFFFFF;
   height: 47px;
   }

</style>
