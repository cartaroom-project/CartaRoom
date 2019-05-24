<template>
    <div class="thumbnail">
        <div class="results" v-for="room of rooms" v-bind:key="room['.key']">
            <div class="row">
                <img class="thumbnail" src="../assets/banner/roomView/room1.jpg"/>
            </div>
            <div class="row">
                <div class="column1">
                    <label>Room Name</label>
                </div>
                <div class="column2">
                    <p class="info"> {{ room.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import db from '@/firebase.js';
    export default {
        name: "RoomThumbnail",
        data() {
            return {
                rooms: []
            }
        },
        created() {
            this.criteriaLowerCase = this.$route.params.criteria.toLowerCase();
            this.criteria = this.$route.params.criteria;
            db.ref('rooms').orderByChild("nameLowerCase").startAt(this.criteriaLowerCase).endAt(this.criteriaLowerCase + "\uf8ff").once('value').then((snapshot) => {
                this.rooms = [];
                snapshot.forEach((doc) => {
                    this.rooms.push(doc.val());
                })
            }).catch((error) => {
                console.log(error);
            });
        },
        methods: {
            viewRoom: function (id) {
                this.$router.push({
                    name: 'RoomViewPatron',
                    params: {
                        id: id
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .thumbnail {
        padding: 0;
        background-color:green;
    }
    .thumbnail {
        min-width: 280px;
        max-width: 350px;
        height: auto;
        padding: 16px;
    }

</style>
