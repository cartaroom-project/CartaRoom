<template>
<div class="finalResults">
    <!--<img src="../assets/banner/map.png"> -->
    <div class="results" v-for="room of rooms" v-bind:key="room['.key']">
        <div class="row">   
            <div class="column">
                <label>Room Name</label>
                <label>Room Capacity</label>
                <label>Address</label>
                <label>Hours Of Operation</label>
            </div>
            <div class="column">
                <p class="info">{{ room.name }}</p>
                <p class="info">{{ room.capacity }}</p>
                <p class="info">{{ room.address }}</p>
                <p class="info">{{ room.openTime }} to {{ room.closeTime }}</p>
                <button @click="viewRoom(room.roomID)">View Room</button>
            </div>
        </div>
        <!-- <button v-on:click="bookRoom(room)">Book Room</button> <br /> -->
    </div>
    <br>
    <router-link to="/search">
        <button>
            Back to Search  
        </button>
    </router-link>
    <!-- <Recommended></Recommended> -->
</div>

</template>

<script>
import firebase from 'firebase';
import db from '@/firebase.js';

export default {
    name: 'results',
    data() {
        return {
            rooms: [],
            criteria: ''
        }
    },
    created() {
        this.criteria = this.$route.params.criteria;
        db.ref('rooms').orderByChild("name").startAt(this.criteria).endAt(this.criteria + "\uf8ff").once('value').then((snapshot) => {
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
        }
    }
}
</script>

<style scoped>
label {

    margin-bottom: 20px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 35px;
    display: flex;
    align-items: center;
    color: #000000;
}

span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
}

button {
    margin-top: 10px;
    cursor: pointer;
    border-radius: 15px;
    height: 44px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 35px;
    text-align: center;
    width: 177px;
    color: #FFFFFF;
    background: #000000;
}

#stuck {
    position: fixed;
    margin-right: 100px;
}

.results {
    margin: 0 auto;
    padding-top: 25px;

    margin-top: 25px;
    margin-bottom: 25px;
    background: rgba(218, 229, 227, 0.9);
    border-radius: 15px;
    width: 400px;
    float: left;
    margin-left: 50px
}


.info {
    border: 0.25px solid #000000;
    width: 155px;
    font-size: 15px;
    line-height: 35px;
    box-sizing: border-box;
    background: #FFFFFF;
    border-radius: 10px;
    margin-right: 40px;
}

.row {
    left: 0;
    display: inline-flex;
    padding-bottom: 30px;
}

.column {
    flex: 25%;
    padding: 10px;
}

img {
    float: right;
    right: 0;
    margin-right: 50px;
    margin-top: 80px;
    height: 50%;
    width: 25%;
    position: fixed;
}

</style>
