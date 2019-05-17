<template>
    <div class="currentBookings">
        <div class="banner">
            <br>
            <p class="banner_text">Current Bookings</p>
        </div>
        <div class="current" v-for="booking of bookings" v-bind:key="booking['.key']">
            <div class="row">
                <div class="column">
                    <img src="../../assets/banner/image.png">
                </div>
                <div class="column">
                    <label>Name</label>
                    <label>Booked By</label>
                    <label>Host</label>
                    <label>Date</label>
                    <label>Start Time</label>
                    <label>End Time</label>
                </div>
                <div class="column">
                    <p class="info">{{ booking.room.name }}</p>
                    <p class="info">{{ booking.userEmail }}</p>
                    <p class="info">{{ booking.host }}</p>
                    <p class="info">{{ booking.date }}</p>
                    <p class="info">{{ booking.startTime}}:00</p>
                    <p class="info">{{ booking.endTime}}:00</p>
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
        background: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)),url("../../assets/banner/Host2.jpg");
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
    .current{
    margin-left: 25%;
    padding-top: 45px;
    padding-bottom: 45px;
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
