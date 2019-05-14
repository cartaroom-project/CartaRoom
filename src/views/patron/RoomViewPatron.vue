<template>
    <div class="editRoom">
        <p>Room View</p>
        <h1>Room: {{ roomInfo.name }}</h1>
        <p>Name: {{ roomInfo.name }}</p>
        <p>Capacity: {{ roomInfo.capacity }}</p>
        <p>Description: {{ roomInfo.description }}</p>
        <p>Address: {{ roomInfo.address }}</p>
        <p>Open Time: {{ roomInfo.openTime }}</p>
        <p>Close Time: {{ roomInfo.closeTime }}</p>
        <h3>Amenities:</h3>
        <ul v-for="amenity in roomInfo.amenities" v-bind:key="amenity['.key']">
            {{amenity}}
        </ul>
        <h3>{{msg}}</h3>
        Date: <input type="date" v-model="date"><br />
        <!-- <li v-for="(value, name, index) in roomInfo.bookingSlots"> -->
        <ul v-for="index in timeSlotsAvailable" :key="index">
            <p>{{roomInfo.bookingSlots[index].startingTime}}:00 to {{roomInfo.bookingSlots[index].endingTime}}:00
                <button v-on:click="bookRoom(roomInfo.bookingSlots[index].startingTime, roomInfo.bookingSlots[index].endingTime)">Book Room</button>
            </p>
        </ul>
        <!-- <p>{{roomInfo.bookingSlots[1].startingTime}}:00 to {{roomInfo.bookingSlots[1].endingTime}}:00</p> <br /> -->
        <!-- </li> -->
        <br>
        <v-btn id="timeButton" @click="doMath"><b><u>{{msg1}}</u></b></v-btn><br />
        <router-link to="/search">Cancel</router-link>
    </div>
</template>

<script>
    //   console.log(this.$router);
    // bookingSlots[1].startingTime
    import firebase from 'firebase';
    import db from '@/firebase.js';
    import axios from 'axios';

    var createRoom = firebase.functions().httpsCallable('createRoom');
    var roomViewPatronCreated = firebase.functions().httpsCallable('roomViewPatronCreated');
    var checkBookingExist = firebase.functions().httpsCallable('checkBookingExist');
    var getHostNameRoomViewPatron = firebase.functions().httpsCallable('getHostNameRoomViewPatron');
    var updateUIDBookingViewRoomPatron = firebase.functions().httpsCallable('updateUIDBookingViewRoomPatron');
    var updateUIDAllBookingViewRoomPatron = firebase.functions().httpsCallable('updateUIDAllBookingViewRoomPatron');

    var userID;
    var roomID = '1';
    //   var timeSlotsAVailable = 2;
    var storageRef = firebase.storage().ref();

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // console.log(user.uid); //a@a.com = gbEw7s5ic1drxG3vgFWD3DAMb972
            userID = user.uid;
        } else {
            // console.log("No user available");
            userID = 'null';
        }
    });

    export default {
        name: 'addRoom',

        data() {
            return {
                id: 0,
                room: {},
                timeSlotsAvailable: 0,
                msg: '',
                msg1: 'View time slots',
                date: '',
                hostName: '',
                userEmail: '',
                amenities: [{
                    offering: 'wifi'
                },
                    {
                        offering: 'projector'
                    },
                    {
                        offering: 'whiteboard'
                    },
                    {
                        offering: 'Ethernet'
                    },
                ],
                roomInfo: {
                    hostID: '',
                    name: '',
                    capacity: '',
                    description: '',
                    address: '',
                    roomID: roomID,
                    reserved: 'false',
                    bookingCounter: 0,
                    openTime: 0,
                    closeTime: 0,
                    amenities: [],
                    bookingSlots: [{
                        startingTime: '9:00',
                        endingTime: '10:00'
                    }]
                }
            }
        },
        async created() {
            this.id = this.$route.params.id;

            await createRoom({
                id: this.id,
                roomInfo: this.roomInfo
            }).then((result) => {
                this.roomInfo = result.data.roomInfo
            }).catch(function (error) {
                console.log(error);
            });

            await roomViewPatronCreated({
                userEmail: this.userEmail
            }).then((result) => {
                this.userEmail = result.data.userEmail;
            }).catch(function (error) {
                console.log(error);
            });
        },

        methods: {
            doMath: function () {
                var startHoursMinutes = this.roomInfo.openTime.split(/[.:]/);
                var startHours = parseInt(startHoursMinutes[0], 10);
                var closeHoursMinutes = this.roomInfo.closeTime.split(/[.:]/);
                var closeHours = parseInt(closeHoursMinutes[0], 10);
                this.timeSlotsAvailable = closeHours - startHours;
                this.msg = 'Time Slots';
                this.msg1 = '';
            },

            bookRoom: async function (startTime, endTime) {
                var userInfo = firebase.auth().currentUser.uid;
                var uniqueKeyIDBooking = '1';
                var elseStatement = false;
                var snapshotExist = false;
                var initialBookingID = '1';

                //This creates a string with all the neccessary info needed to see if a time slot is already taken or not
                var bookingInfo = startTime.toString() + '->' + endTime.toString() + '->' + this.date + '->' + this.roomInfo.roomID;

                //if date is null alter message "please select a date before moving on"
                //if date is seleted, check booking time slot is available in datebase and return a boolean snapshotExist from cloud function
                if (this.date === '') {
                    alert('Please select a date before moving on');
                } else {
                    await checkBookingExist({
                        bookingInfo: bookingInfo
                    }).then((result) => {
                        snapshotExist = result.data.snapshotExist;
                        console.log("snapshotExist: " + snapshotExist);
                    }).catch(function (error) {
                        console.log(error);
                    });
                }

                //if snapshotExist is true, meaning booking slot already exists in datebase alter message "not avaiable"
                //if snapshotExist is false, book selected time slot and update database using cloud function
                if (snapshotExist) {
                    alert('TIME SLOT NOT AVAILABLE FOR:\n' + 'date: ' + this.date + '\n' + "time: " + startTime + ':00' + " - " + endTime + ':00\n' + 'PLEASE SELECT ANOTHER DATE/TIME');
                } else {
                    await getHostNameRoomViewPatron({
                        hostID: this.roomInfo.hostID,
                        hostName: this.hostName
                    }).then((result) => {
                        console.log("this.roomInfo.hostID: " + this.roomInfo.hostID);
                        console.log("hostName: " + result.data.hostName);
                        this.hostName = result.data.hostName
                    }).catch(function (error) {
                        console.log(error);
                    });
                    elseStatement = true;
                }

                //update database if snapshotExist is false
                if (elseStatement) {

                    const info = {
                        room: this.roomInfo,
                        user: userInfo,
                        userEmail: this.userEmail,
                        bookingID: '1',
                        startTime: startTime,
                        endTime: endTime,
                        date: this.date,
                        host: this.hostName,
                        bookingInfo: bookingInfo,
                        status: 'not completed'
                    }

                    await updateUIDBookingViewRoomPatron({
                        info: info,
                        uniqueKeyIDBooking: uniqueKeyIDBooking
                    }).then((result) => {
                        initialBookingID = result.data.uniqueKeyIDBooking;
                    }).catch(function (error) {
                        console.log(error);
                    });

                    const info2 = {
                        room: this.roomInfo,
                        user: userInfo,
                        userEmail: this.userEmail,
                        allbookingID: '1',
                        initialBookingID: initialBookingID,
                        startTime: startTime,
                        endTime: endTime,
                        date: this.date,
                        host: this.hostName,
                        bookingInfo: bookingInfo,
                        status: 'not completed'
                    }

                    await updateUIDAllBookingViewRoomPatron(info2).then(() => {
                        alert('BOOKING CONFIRMED\n' + 'Booking Details:\n' + 'date: ' + this.date + '\n' + "time: " + startTime + ':00' + " - " + endTime + ':00');
                        this.$router.push('CurrentBookingsPatron');
                    })
                }
            }
        },
    }
</script>

<style scoped>
    .sign-up {
        margin-top: 40px;
    }

    input {
        margin: 10px 0;
        width: 20%;
        padding: 15px;
    }

    button {
        margin-top: 10px;
        width: 10%;
        cursor: pointer;
    }

    span {
        display: block;
        margin-top: 20px;
        font-size: 11px;
    }
</style>
