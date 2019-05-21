<template>
    <div class="currentBookings">
        <div class="banner">
            <br>
            <p class="banner_text">All Customers</p>
        </div>
        <div class="customer" v-for="booking of bookings" v-bind:key="booking['.key']">
            <div class="row">
                <div class="column1">
                    <img src="../../assets/banner/placeholde.png">
                </div>
                <div class="column2">
                    <div class="rowA">
                        <label>Host</label>
                    </div>
                    <div class="rowB">
                        <p class="info">{{ booking.host}}</p>
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
        border: 2px solid red;
    }
    .rowA {
        display: flex;
        align-items: center;
        border: 2px solid black;
    }
    .rowB {
        border: 2px solid green;
        width: 50%;;
    }
    .column1 {
        border: 2px solid yellow;
        width:10%;
    }
    .column2 {
        border: 2px solid yellow;
        width:30%;
    }
    .column3 {
        border: 2px solid yellow;
        width:20%;
    }

    .column4 {
        border: 2px solid yellow;
        width: 40%;
    }

    .column2 label{
        float: right;
        padding-right: 10%;
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
        background: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)),url("../../assets/banner/Customer.jpeg");
        background-repeat: no-repeat;
        background-size: cover;
        margin-top:-150px;
        padding-top:150px;
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
    .customer{
        margin-left: 25%;
        padding-top: 44px;
        padding-bottom: 44px;
        margin-top: 45px;
        margin-bottom: 45px;
        background: rgba(218, 229, 227, 0.9);
        border-radius: 15px;
        width: 1200px;
    }

    .info{
        margin:auto;
        border: 0.75px solid darkgrey;
        font-size: 20px;
        line-height: 35px;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 5px;
        word-break: break-word;
    }
</style>
