<template>
    <div class="home">
        <div class="banner">
            <br>
            <p class="banner_text">All Rooms</p>
        </div>
        <div class="all" v-for="room of rooms" v-bind:key ="room['.key']">
            <div class="row">
                <div class="column">
                    <img src="../../assets/banner/image.png">
                </div>
                <div class="column">
                    <label>Name</label>
                    <label>Capacity</label>
                    <label>Address</label>
                </div>
                <div class="column">
                    <p class="info">{{ room.name }}</p>
                    <p class="info">{{ room.capacity }}</p>
                    <p class="info">{{ room.address }}</p>
                </div>
            </div>
            <button v-on:click="viewRoom(room.roomID)">View Room</button>
            <br />
        </div>
    </div>
</template>
<script>
    import firebase from 'firebase';
    import db from '@/firebase.js';

    // db.ref('rooms').once('value').then(function(snapshot) {
    //   console.log(snapshot.val());
    // }).catch((error) => {
    //   console.log(error);
    // });

    var userID;
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            // console.log(user.uid); //a@a.com = gbEw7s5ic1drxG3vgFWD3DAMb972
            userID = user.uid;
        } else {
            // console.log("No user available");
            userID = "null";
        }
    });

    export default {
        name: 'home',
        data() {
            return {
                rooms: []
            }
        },
        created() {
            db.ref('rooms').orderByChild("hostID").equalTo(userID).once('value').then((snapshot) => {
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
                    name: 'RoomViewHost',
                    params: {
                        id: id
                    }
                })
            }
        }
    }

</script>
<style scoped>
    .banner{
        height: 450px;
    }
    img{
        padding-top: 15px;
        padding-left: 40px;
        width: 75%;
    }
    .banner_text {
        font-family: Rajdhani;
        font-style: normal;
        font-weight: 600;
        font-size: 110px;
        line-height: 191px;
        text-align: center;
        color: #000000;
    }
    .banner {
        height: 450px;
        width: 100%;
        background-image: url(../../assets/banner/Host2.jpg);
        background-repeat: no-repeat;
        background-size: cover;
    }
    label {
        margin-left: 30%;
        padding-top: 15px;
        padding-bottom: 6px;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 25px;
        line-height: 35px;
        display: flex;
        align-items: center;
        color: #000000;
    }
    .all{
        margin-left: 25%;
        padding-top: 44px;
        padding-bottom: 54px;
        margin-top: 45px;
        margin-bottom: 65px;
        background: rgba(218, 229, 227, 0.9);
        border-radius: 15px;
        width: 1200px;
    }
    .row {
        display: flex;
    }
    .column {
        flex: 33%;
        padding: 10px;
    }
    .info{
        border: 0.25px solid #000000;
        width: 625px;
        font-size: 20px;
        line-height: 35px;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 10px;
        margin-right: 100px;
    }
    button {
        cursor: pointer;
        background: #FFFFFF;
        border-radius: 15px;
        height: 44px;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 35px;
        text-align: center;
        width: 177px;
        color: #000000;
        margin: 0px 20px;
        float: right;
    }
</style>
