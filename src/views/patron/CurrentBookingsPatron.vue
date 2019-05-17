<template>
    <div class="currentBookings">
        <div class="banner">
            <p class="banner_text">All Current Bookings</p>
        </div>
        <div class="books" v-for="booking of bookings" v-bind:key="booking['.key']">
            <div class="row">
                <div class="column">
                    <img src="../../assets/banner/image.png">
                </div>
                <div class="column">
                    <label>Room Name</label>
                    <label>Host</label>
                    <label>Date</label>
                    <label>Start Time</label>
                    <label>End Time</label>
                    <label>Status</label>
                </div>
                <div class="column">
                    <p class="info">{{ booking.room.name }}</p>
                    <p class="info">{{ booking.host }}</p>
                    <p class="info">{{ booking.date }}</p>
                    <p class="info">{{ booking.startTime }}:00 </p>
                    <p class="info">{{ booking.endTime }}:00 </p>
                    <p class="info">{{ booking.status }}</p>
                </div>
            </div>
            <button v-on:click="changeBookingStatus(booking,'completed', 'Room has been used(simulated)','Are you sure you want to SIMULATE this reservation?')">Simulate Finish</button>
            <button v-on:click="changeBookingStatus(booking,'cancelled', 'Reservation has been cancelled','Are you sure you want to CANCEL this reservation?')">Cancel Booking</button><br />
        </div>
    </div>
</template>
<script>
    import firebase from 'firebase';
    import db from '@/firebase.js';
    var booking = firebase.functions().httpsCallable('patronBooking');
    //var unbook = firebase.functions().httpsCallable('patronUnbook');
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
                if (window.confirm(winMsg)) {
    
                    await bookingStatus({
                        bookingID: booking.bookingID,
                        roomID: booking.room.roomID,
                        statMsg: statMsg
                    });
                    await alert(alertMsg);
                    this.$router.go();
                }
            },
            unbookRoom: function (booking) {
                // firebase.database().ref('rooms/' + booking.room.uniqueKey).update({userID: booking.room.userID, name: booking.room.name, capacity: booking.room.capacity, description: booking.room.description, address: booking.room.address, uniqueKey: booking.room.uniqueKey, reserved: 'false'})
                unbook({
                    bk: booking
                }).then(() => {
                    alert('Room Status has been reset');
                    this.$router.go();
                })
            }
    
            //,
            // unbookRoom: function(booking) {
            //     // firebase.database().ref('rooms/' + booking.room.uniqueKey).update({userID: booking.room.userID, name: booking.room.name, capacity: booking.room.capacity, description: booking.room.description, address: booking.room.address, uniqueKey: booking.room.uniqueKey, reserved: 'false'})
            //     unbook({bk: booking}).then(() => {
            //         alert('Room Status has been reset');
            //         this.$router.go();
            //     })
            // }
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
        height: 400px;
        width: 100%;
        margin-top: -150px;
        padding-top: 150px;
        background-image: url(../../assets/banner/Patron.jpg);
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
        left: 25%;
        margin:0 auto;
        padding-top: 44px;
        margin-top: 45px;
        margin-bottom: 45px;
        padding-bottom: 45px;
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
        margin-top: 10px;
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