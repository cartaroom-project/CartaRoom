<template>
    <div class="currentBookings">
        <div class="banner">
            <p class="banner_text">All Your Reservations</p>
        </div>
        <div class="books" v-for="booking of bookings" v-bind:key="booking['.key']">
            <div class="row">
                <div class="column1">
                    <img src="../../assets/banner/image.png">
                </div>
                <div class="column2">
                    <div class="rowA">
                        <label>Room Name</label>
                    </div>
                    <div class="rowB">
                            <p class="info">{{ booking.room.name}}</p>
                    </div>
                </div>
                <div class="column3">
                    <div class="rowA">
                        <label>Host</label>
                    </div>
                    <div class="rowB">
                        <p class="info">{{ booking.host}}</p>
                    </div>
                </div>
                <div class="column4">
                    <div class="rowA">
                        <label>Reservation Date</label>
                    </div>
                    <div class="rowB">
                        <p class="info">{{ booking.date}}</p>
                    </div>
                </div>
                <div class="column5">
                    <div class="rowA">
                        <label>Reservation Time</label>
                    </div>
                    <div class="rowB">
                        <p class="info2"> {{ booking.startTime }}:00 - {{ booking.endTime }}:00</p>
                    </div>
                </div>
                <div class="column6">
                    <div class="rowA">
                        <label>Status</label>
                    </div>
                    <div class="rowB">
                        <p class="info2">{{ booking.status}}</p>
                    </div>
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
                user: '',
            }
        },
        created() {
            db.ref('allBookings').orderByChild("user").equalTo(userID).once('value').then((snapshot) => {
                this.bookings = [];
                snapshot.forEach((doc) => {
                    this.bookings.push(doc.val());
                })
            }).catch((error) => {
                console.log(error);
            });
    
            db.ref('users/patron/' + userID).once('value').then((snapshot) => {
                this.user = snapshot.val();
            });
        },
        methods: {}
    }
</script>
<style scoped>
    .row {
        margin:auto;
        width: 95%;
        display: flex;
        align-items:center;
    }
    .rowA {
        display: flex;
        align-items: center;
        margin-left:auto;
        margin-right: auto;
    }
    .rowB {
        width:100%;
    }

    .column1 {
             width: 10%;
         }
    .column2 {
        width: 15%;
    }
    .column3 {
        width: 15%;
    }
    .column4 {
        width: 20%;
    }
    .column5 {
        width: 20%;
    }
    .column6 {
        width: 20%;
    }

    img{
        width: 100%;
        height:auto;
    }
    .banner_text {
    font-family: Rajdhani;
    font-style: normal;
    font-weight: 600;
    font-size: 90px;
    line-height: 191px;
    text-align: center;
    color: #000000;
    }
    .banner {
        height: 400px;
        width: 100%;
        margin-top: -150px;
        padding-top: 150px;
    background: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)),url(../../assets/banner/Patron.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    }
    label {
        margin-left: auto;
        margin-right: auto;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 25px;
        line-height: 35px;
        display: flex;
        align-items: center;
        color: #000000;
    }
    .books{
    left: 25%;
        margin: 0 auto;
    padding: 2% 0;
    margin-top: 45px;
    margin-bottom: 45px;
    background: rgba(218, 229, 227, 0.9);
    border-radius: 15px;
    width: 90%;
    }
    .info{
        margin:auto;
        border: 0.75px solid darkgrey;
        font-size: 20px;
        line-height: 35px;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 5px;
        width: 90%;
        word-break: break-word;
    }
    .info2 {
        border: 0.75px solid darkgrey;
        width:90%;
        padding-left: 0;
        margin:auto;
        font-size: 20px;
        line-height: 35px;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 5px;
        word-break: break-word;
    }
</style>
