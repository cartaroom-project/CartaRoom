<template>
<div class="addRoom">
    <div class="banner">
        <p class="banner_text">Add a New Room</p>
        </div>
        <div class="add">
            <div class="row">
                <div class="column1">
                    <label>Room Name</label>
                </div>
                <div class="column2">
                    <input class="input_add" type="text" v-model="roomInfo.name" placeholder="name of room">
                </div>
            </div>
            <div class="row">
                <div class="column1">
                    <label>Capacity</label>
                </div>
                <div class="columnCapacity">
                    <input class="input_add" type="number" v-model="roomInfo.capacity" placeholder="number of people">
                </div>
            </div>
            <div class="row">
                <div class="column1">
                    <label>Description</label>
                </div>
                <div class="column2">
                    <textarea class="input_add" type="text" cols="40" rows="3" v-model="roomInfo.description" placeholder="quick description of the room"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="column1">
                    <label>Address</label>
                </div>
                <div class="column2">
                    <input class="input_add" type="text" v-model="roomInfo.address" placeholder="business address">
                </div>
            </div>
            <div class="row">
                <div class="column1">
                    <label>Business Hours</label>
                </div>
                <div class="column2">
                    <span class="timeText">Open:</span><input class="input_time" type="time" v-model="roomInfo.openTime">
                    <span class="timeText">Close:</span><input class="input_time" type="time" v-model="roomInfo.closeTime">
                </div>
            </div>
            <div class="row">
                <div id="line">
                    <hr>
                </div>
            </div>

            <div class="row">
                <div class="column1">
                    <label>Amenities</label>
                </div>
                <div class="columnAmenities">
                    <ul v-for="amenity in amenities" v-bind:key="amenity['.key']">
                        <label class="switch">
                            <input class="amenity" type="checkbox" :id="amenity.offering" :value="amenity.offering" v-model="roomInfo.amenities">
                            <span class="slider" :for="amenity.offering"></span>
                            <p>{{amenity.offering}}</p>
                        </label>
                    </ul>
                </div>
            </div>

            <div class="row">
                <div class="columnButtons">
                    <button>
                        <router-link to="/home">Cancel</router-link>
                    </button>
                    <button @click="addRoom">Confirm</button>
                </div>
            </div>
            <!-- <input type = "file" @click="uploadImage"> -->
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
var addRoom = firebase.functions().httpsCallable('addRoom');

var hostID;
var roomID = '1';

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // console.log(user.uid); //a@a.com = gbEw7s5ic1drxG3vgFWD3DAMb972
        hostID = user.uid;
    } else {
        // console.log("No user available");
        hostID = 'null';
    }
});

export default {
    name: 'addRoom',
    data() {
        return {
            amenities: [{
                    offering: 'Wifi'
                },
                {
                    offering: 'Projector'
                },
                {
                    offering: 'Whiteboard'
                },
                {
                    offering: 'Ethernet'
                },
            ],
            roomInfo: {
                hostID: hostID,
                name: '',
                capacity: '',
                description: '',
                address: '',
                roomID: roomID,
                bookingCounter: 0,
                openTime: 0,
                closeTime: 0,
                amenities: [],
                bookingSlots: [
                    []
                ]
            },
            validTimeSlot: 'true'
        }
    },
    methods: {
        checkTimeValidation: function () {
            if (this.roomInfo.openTime >= this.roomInfo.closeTime) {
                this.validTimeSlot = 'false';
            }
        },
        calculateTime: async function () {
            var i = 0;
            var startHoursMinutes = this.roomInfo.openTime.split(/[.:]/);
            var startHours = parseInt(startHoursMinutes[0], 10);
            var closeHoursMinutes = this.roomInfo.closeTime.split(/[.:]/);
            var closeHours = parseInt(closeHoursMinutes[0], 10);
            var timeSlotsAvailable = closeHours - startHours;
            var firstTimeSlot = startHours;

            while (i < timeSlotsAvailable) {
                this.roomInfo.bookingSlots.push({
                    startingTime: firstTimeSlot,
                    endingTime: ++firstTimeSlot
                });
                i++;
            }
        },
        addRoom: async function () {
            await this.checkTimeValidation();
            await this.calculateTime();
            if (this.validTimeSlot === 'false') {
                alert("INVALID TIME SLOTS, PLEASE FIX BEFORE MOVING ON");
                // this.roomInfo.openTime = 0;
                // this.roomInfo.closeTime = 0;
                this.$router.go();
            } else {
                await addRoom(this.roomInfo);
                await this.$router.replace('home');
            }
        }
    }
}
</script>

<style scoped>
    .columnButtons {
        float: right;
    }

    .column1 {
        width:30%;
        align-items: center;
    }
    .column1 label{
        float: right;
        padding-right: 10%;
    }

    .column2 {
        width:60%;

    }

    .columnCapacity{
        width:60%;

    }
    .input_number{
        margin: 10px 5%;
        padding-left: 15px;
        background: #FFFFFF;
        box-sizing: border-box;
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 35px;
        margin-right: 90%;
        word-break: break-word;
        border: 0.75px solid darkgrey;
        width: 10%;
        border-radius: 5px;
        word-break: break-word;
    }

    .columnAmenities {
        width:60%;
        height:75px;
        margin-left:-60px;
    }
    .columnAmenities ul{
        display:inline-block;
        margin-right: 20px;
        margin-top:0;
        margin-bottom: 0;
        vertical-align:middle;
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

    .input_add {
        margin: 10px 100px 10px 0;
        padding-left: 15px;
        background: #FFFFFF;
        box-sizing: border-box;
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 35px;
        word-break: break-word;
        border: 0.75px solid darkgrey;
        width: 75%;
        border-radius: 5px;
        resize:none;
    }

    .timeText {
        float:left;
        font-size: 1em;
        margin-right: 3px;
        margin-top: 20px;
    }
    .input_time {
        float: left;
        margin: 10px 25px 10px 0;
        padding-left:15px;
        background: #FFFFFF;
        box-sizing: border-box;
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 35px;
        word-break: break-word;
        border: 0.75px solid darkgrey;
        width: 30%;
        border-radius: 5px;
    }

    .columnButtons {
        width:100%;
    }

    .columnButtons button {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        cursor: pointer;
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
        margin: 25px 25px;
    }

    .columnButtons a {
        text-decoration: none;
        color:black;
    }

    .row {
        display: flex;
        align-items: center;
    }

    .add {
        margin: 40px auto;
        padding-top: 44px;
        margin-bottom: 45px;
        background: rgba(218, 229, 227, 0.9);
        border-radius: 15px;
        width:60%;
        height:60%;
    }
    label {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 25px;
    }

    button {
        margin-top: 10px;
        width: 10%;
        cursor: pointer;
    }

    .switch span {
        display: block;
    }
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
        float:left;
    }

    .switch p {
        margin-left:0;
        margin-top:10px;
        font-size:16px;
        text-align:center;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .2s;
    }

    input:checked + .slider {
        background-color: #2196F3;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

</style>
// Needed fields:
// *Name--Text#
// *Location--Text#
// *Description--Text#
// *Capacity--Number#
// *Hours of operation--Time(Start/End)#
// Reservable?2d Array?[Add Later]{Hidden}--time slots, put reserved in currentBookings table cause you can't store each booking here with all dates
// Room ID{Hidden}#
// Pictures?[Add Later]
// Host ID{Hidden}#
// *Amenities--Dropdown#
// Booking Counter{Hidden}#
// Reviews[Add Later]{Hidden}
