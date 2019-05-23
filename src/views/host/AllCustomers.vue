<template>
    <div class="currentBookings">
        <div class="banner">
            <p class="banner_text">All Your Customers</p>
        </div>
        <div class="customer" v-for="booking of bookings" v-bind:key="booking['.key']">
            <div class="row">
                <div class="column1">
                    <img src="../../assets/banner/placeholde.png">
                </div>
                <div class="column2">
                    <div class="rowA">
                        <label>Patron</label>
                    </div>
                    <div class="rowB">
                        <p class="info">{{ booking.userEmail}}</p>
                    </div>
                </div>
                <div class="column3">
                    <div class="rowA">
                        <label>Date</label>
                    </div>
                    <div class="rowB">
                        <p class="info2">{{ booking.date}}</p>
                    </div>
                </div>
                <div class="column4">
                    <div class="rowA">
                        <label>Reservation Time</label>
                    </div>
                    <div class="rowB">
                        <p class="info2"> {{ booking.startTime }}:00 - {{ booking.endTime }}:00</p>
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
    }
    .rowA {
        display: flex;
        align-items: center;
        margin-left:auto;
        margin-right: auto;
    }
    .rowB {
        width: 100%;
    }
    .column1 {
        width:10%;
    }
    .column2 {
        width:30%;
    }
    .column3 {
        width:30%;
    }
    .column3 p {
        margin-left:auto;
        margin-right: auto;
    }
    .column4 {
        width: 30%;
    }
    .column4 p {
        margin-left:auto;
        margin-right: auto;
    }
    img{
        border-radius:50%;
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
        background: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)),url("../../assets/banner/Customer.jpeg");
        background-repeat: no-repeat;
        background-size: cover;
        margin-top:-150px;
        padding-top:150px;
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
    .customer{
        margin-left: 25%;
        padding:20px 0px;
        margin-top: 45px;
        margin-bottom: 45px;
        background: rgba(218, 229, 227, 0.9);
        border-radius: 15px;
        width: 50%;
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
        margin:0;
        font-size: 20px;
        line-height: 35px;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 5px;
        word-break: break-word;
    }
</style>
