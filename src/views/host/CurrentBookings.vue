<template>
<div class="currentBookings">
    <div class="banner">
        <p class="banner_text">Current Reservations</p>
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
                            <label>Patron</label>
                        </div>
                        <div class="column2A">
                            <p class="info">{{ booking.userEmail}}</p>
                        </div>
                    </div>
                    <div class="rowA">
                        <div class="column1A">
                            <label>Reservation Date</label>
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
                            <p class="info2">{{ booking.status}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="rowButtons">
                    <button id="delete" v-on:click="changeBookingStatus(booking,'cancelled', 'Reservation has been cancelled','Are you sure you want to CANCEL this reservation?')">Cancel Booking</button><br />
                    <button v-on:click="changeBookingStatus(booking,'completed', 'Room has been used(simulated)','Are you sure you want to SIMULATE this reservation?')">Complete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase.js';
//alert styling
import Vue from 'vue'
import 'v-slim-dialog/dist/v-slim-dialog.css'
import SlimDialog from 'v-slim-dialog'
Vue.use(SlimDialog)

var booking = firebase.functions().httpsCallable('hostBooking');
var unbook = firebase.functions().httpsCallable('hostUnbook');
var bookingStatus = firebase.functions().httpsCallable('bookingStatus');

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
    data() {
        return {
            bookings: [],
        }
    },
    async created() {
        await booking({
            bookings: this.bookings
        }).then((result) => {
            this.bookings = result.data.bookings
        }).catch(function (error) {
            console.log(error);
        });
    },
    methods: {
        changeBookingStatus: async function (booking, statMsg, alertMsg, winMsg) {

            var yesOrNo = false;

            await this.$dialogs.confirm(winMsg, {
                title: 'Update:',
                cancelLabel: 'CANCEL',
                okLabel: 'OK'

            }).then(res => {
                yesOrNo = res.ok;
            });

            if (yesOrNo) {
                await bookingStatus({
                    bookingID: booking.bookingID,
                    roomID: booking.room.roomID,
                    statMsg: statMsg
                });
                await this.$dialogs.alert(alertMsg, {
                    title: 'Update:',
                    okLabel: 'OK'
                });
                this.$router.go();
            }
        },
        unbookRoom: function (booking) {
            unbook({
                bk: booking
            }).then(() => {
                this.$dialogs.alert('Room Status has been reset', {
                    title: 'Update:',
                    okLabel: 'OK'
                });
                this.$router.go();
            })
        }
    }
}
</script>

<style scoped>
.row {
    margin: auto;
    width: 90%;
    display: flex;
    align-items: center;
}

.rowA {
    display: flex;
    align-items: center;
}

.column1 {
    width: 20vw;
}

.column1A {
    width: 40%;

}

.column1A label {
    padding: 0;
    float: right;
    padding-right: 10%;
}

.column2 {
    width: 100%;
}

.column2A {
    width: 60%;
    padding: 0;
    margin: 5px 0;
}

.column2A p {
    margin: 0;
}

img {
    width: 100%;
    height: auto;
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
    background: linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .5)), url(../../assets/banner/Patron.jpg);
    background-repeat: no-repeat;
    background-size: cover;
}

label {
    margin-left: 30%;
    padding-top: 15px;
    padding-bottom: 6px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
    line-height: 35px;
    display: flex;
    align-items: center;
    color: #000000;
}

label {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
}

.current {
    padding: 2% 0;
    margin: 2% auto;
    background: rgba(218, 229, 227, 0.9);
    border-radius: 15px;
    width: 70vw;
}

.info {
    border: 0.75px solid darkgrey;
    margin: 10px 0;
    font-size: 20px;
    line-height: 35px;
    box-sizing: border-box;
    background: #FFFFFF;
    border-radius: 5px;
    word-break: break-word;
}

.info2 {
    border: 0.75px solid darkgrey;
    width: 60%;
    padding-left: 0;
    margin: 10px 0;
    font-size: 20px;
    line-height: 35px;
    box-sizing: border-box;
    background: #FFFFFF;
    border-radius: 5px;
    word-break: break-word;
}

.rowButtons {
    width: 100%;
    display: inherit;
}

.rowButtons button {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    background: #FFFFFF;
    border-radius: 15px;
    height: 44px;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 35px;
    text-align: center;
    width: 15%;
    color: #000000;
    margin: 10px 25px;
}

#delete {
    background-color: #ff6961;
    color: white;
}
</style>
