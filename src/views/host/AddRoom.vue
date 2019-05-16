<template>
<div class="addRoom">
    <div class="banner">
        <br>
        <p class="banner_text">Let's add a new room</p>
    </div>
    <br>
    <br>
    <br>
    <div class="add">
        <div class="row">
            <div class="column">
                <label>Name</label>
                <label>Capacity</label>
                <label>Description</label>
                <label>Location</label>
                <label>Open Time</label>
                <label>Close Time</label>
            </div>
            <div class="column">
                <input class="input_add" type="text" v-model="roomInfo.name" placeholder="name">
                <input class="input_add" type="number" v-model="roomInfo.capacity" placeholder="capacity">
                <input class="input_add" type="text" v-model="roomInfo.description" placeholder="description">
                <input class="input_add" type="text" v-model="roomInfo.address" placeholder="location">
                <input class="input_time" type="time" v-model="roomInfo.openTime">
                <input class="input_time" type="time" v-model="roomInfo.closeTime">
                </div>
            </div>
            <div class="row">
                <div class="columnX">
                    <label>Amenities:</label>
                    <p>test: {{roomInfo.amenities}}</p>
                </div>
                <div class="column">
                    <ul v-for="amenity in amenities" v-bind:key="amenity['.key']">
                        <input type="checkbox" :id="amenity.offering" :value="amenity.offering" v-model="roomInfo.amenities">
                        <label :for="amenity.offering">{{amenity.offering}}</label>
                    </ul>
                </div>
            </div>
            <!--    <input type = "file" @click="uploadImage">-->
            <br>
            <button @click="addRoom">Continue</button>
            <button>
                <router-link to="/home">Cancel</router-link>
            </button>
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
label {
    margin-left: 30%;
    margin-top: 20px;
    margin-bottom: 15px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
    line-height: 35px;
    display: flex;
    align-items: center;
    color: #000000;
}

.row {
    display: flex;
}

.column {
    flex: 50%;
    padding: 10px;
}

.columnX {
    flex: 13%;
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
    background-image: url(../../assets/banner/Host2.jpg);
    background-repeat: no-repeat;
    background-size: cover;
}

.sign-up {
    margin-top: 40px;
}

.input_add {
    margin: 10px 0;
    width: 725px;
    padding-left: 15px;
    background: #FFFFFF;
    border: 0.25px solid #000000;
    box-sizing: border-box;
    border-radius: 10px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 35px;
    margin-right: 100px;
}

.input_time {
    margin: 10px 0;
    width: 225px;
    padding-left: 15px;
    background: #FFFFFF;
    border: 0.25px solid #000000;
    box-sizing: border-box;
    border-radius: 10px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 35px;
    margin-right: 600px;
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

.add {
    margin-left: 25%;
    padding-top: 44px;
    margin-bottom: 45px;
    background: rgba(218, 229, 227, 0.9);
    border-radius: 15px;
    width: 1200px;
    height: 850px;
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
