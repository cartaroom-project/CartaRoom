<template>
    <div class="currentBookings">
        <div class="banner">
            <br>
            <p class="banner_text">All Your Bookings</p>
        </div>
        <div class="books" v-for="booking of bookings" v-bind:key="booking['.key']">
            <div class="row">
                <div class="column1">
                    <img src="../../assets/banner/image.png">
                </div>
                <div class="column2">
                    <div class="rowA">
                        <div class="column1A">
                            <label>Room Name</label>
                        </div>
                        <div class="column2A">
                            <p class="info">{{ booking.room.name}}</p>
                        </div>
                    </div>
                    <div class="rowA">
                        <div class="column1A">
                            <label>Reserved By</label>
                        </div>
                        <div class="column2A">
                            <p class="info">{{ booking.userEmail}}</p>
                        </div>
                    </div>
                    <div class="rowA">
                        <div class="column1A">
                            <label>Host</label>
                        </div>
                        <div class="column2A">
                            <p class="info">{{ booking.host}}</p>
                        </div>
                    </div>
                    <div class="rowA">
                        <div class="column1A">
                            <label>Date</label>
                        </div>
                        <div class="column2A">
                            <p class="info2">{{ booking.date}}</p>
                        </div>
                    </div>
                    <div class="rowA">
                        <div class="column1A">
                            <label>Reservation Time</label>
                        </div>
                        <div class="column2A">
                            <p class="info2"> {{ booking.startTime }}:00 - {{ booking.endTime }}:00</p>
                        </div>
                    </div>
                    <div class="rowA">
                        <div id="line">
                            <hr>
                        </div>
                    </div>
                    <div class="rowA">
                        <div class="column1A">
                            <label>Status</label>
                        </div>
                        <div class="column2A">
                            <p class="info">{{ booking.status}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import firebase from 'firebase';
    import db from '@/firebase.js';

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
    .row {
        margin:auto;
        width: 90%;
        display: flex;
        align-items:center;
        border: 2px solid red;
    }
    .rowA {
        display: flex;
        align-items: center;
        border: 2px solid black;
    }
    .column1 {
        border: 2px solid orange;
        width:30%;
    }

    .column2 {
        border: 2px solid yellow;
        width: 100%;
    }
    .column1A {
        border: 2px solid green;
        width: 50%;;
    }
    .column1A label{
        float: right;
        padding-right: 10%;
    }
    .column2A {
        width:50%;
        border: 2px solid blue;
    }
    img{
        width: 100%;
        height:auto;
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
        background: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)),url("../../assets/banner/Host2.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        margin-top:-150px;
        padding-top:150px;
    }
    label {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 25px;
    }
    .books{
        margin: 45px auto;
        padding-top: 45px;
        padding-bottom: 45px;
        background: rgba(218, 229, 227, 0.9);
        border-radius: 15px;
        width: 50%;
    }
    .info{
        border: 0.75px solid darkgrey;
        margin:10px 0;
        font-size: 20px;
        line-height: 35px;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 5px;
        word-break: break-word;
    }

    .info2 {
        border: 0.75px solid darkgrey;
        width:60%;
        padding-left: 0;
        margin:10px 0;
        font-size: 20px;
        line-height: 35px;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 5px;
        word-break: break-word;
    }

    #line {
        width:75%;
        margin:auto;
    }
</style>
