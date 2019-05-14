<template>
    <div class="currentBookings">
        <div class="banner">
            <br>
            <p class="banner_text">All Your Bookings</p>
        </div>
        <div class="books" v-for="booking of bookings" v-bind:key="booking['.key']">
            <div class= "row">
                <div class="column">
                    <img src="../../assets/banner/image.png">
                </div>
                <div class=" column">
                    <label>Room Name</label>
                    <label>Booked By</label>
                    <label>Date</label>
                    <label>Start Time</label>
                    <label>End Time</label>
                    <label>Status</label>
                </div>
                <div class="column">
                    <p class="info">{{ booking.room.name }}</p>
                    <p class="info">{{ booking.userEmail }}</p>
                    <p class="info">{{ booking.date }}</p>
                    <p class="info">{{ booking.startTime }}:00</p>
                    <p class="info">{{ booking.endTime }}:00</p>
                    <p class="info">{{ booking.status }}</p>
                </div>
            </div>
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
        name: 'currentBookings',
        data() {
            return {
                bookings: [],
            }
        },
        created() {
            db.ref('allBookings').orderByChild("room/hostID").equalTo(userID).once('value').then((snapshot) => {
                this.bookings = [];
                snapshot.forEach((doc) => {
                    this.bookings.push(doc.val());
                })
            }).catch((error) => {
                console.log(error);
            });
        },
        methods: {}
    }
</script>
<style scoped>
    img{
        padding-top: 75px;
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
    .books{
        margin-left: 25%;
        padding-top: 44px;
        margin-top: 45px;
        margin-bottom: 45px;
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
</style>
