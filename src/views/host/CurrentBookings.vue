<template>
    <div class="currentBookings">
        <div class="banner">
            <p class="banner_text">Current Bookings</p>
        </div>
        <div class="current" v-for="booking of bookings.slice().reverse()" v-bind:key="booking['.key']">
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
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import firebase from 'firebase';
    import db from '@/firebase.js';
    var booking = firebase.functions().httpsCallable('hostBooking');
    var unbook = firebase.functions().httpsCallable('hostUnbook');

    var userID;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userID = user.uid;
        } else {
            userID = "null";
        }
    });

    export default {
        name: 'currentBookings',
        data () {
            return {
                bookings:[],
            }
        },
        async created () {
            await booking({bookings:this.bookings}).then((result) => {
                this.bookings = result.data.bookings
            }).catch(function (error) {
                console.log(error);
            });
        },
        methods: {
            unbookRoom: function (booking) {
                unbook({
                    bk: booking
                }).then(() => {
                    alert('Room Status has been reset');
                    this.$router.go();
                })
            }
        }
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
    }
    .column1 {
        width:30%;
    }
    .column2 {
        width: 100%;
    }
    .column1A {
        width: 40%;;
    }
    .column1A label{
        float: right;
        padding-right: 10%;
    }
    .column2A {
        width:50%;
    }
    .column2A p {
        margin:5px 0;
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
    .current{
        margin: 45px auto;
        padding:1% 0;
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
</style>
