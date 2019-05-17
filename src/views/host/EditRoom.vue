<template>
<div class="editRoom">
    <div class="banner">
        <br>
        <p class="banner_text">Edit Your Room</p>
    </div>
    <h1>{{roomInfo.name}}</h1>
    <div class="edit">
        <div class="row">
            <div class="column">
                <label>Name</label>
                <label>Capacity</label>
                <label>Description</label>
                <label>Business Address</label>
                <label>Open Time</label>
                <label>Close Time</label>
                <label>Amenities</label>
            </div>
            <div class="column">
                <input class="input_add" type="text" v-model="roomInfo.name">
                <input class="input_add" type="number" v-model="roomInfo.capacity">
                <input class="input_add" type="text" v-model="roomInfo.description">
                <input class="input_add" type="text" v-model="roomInfo.address">
                <input class="input_time" type="time" v-model="roomInfo.openTime">
                <input class="input_time" type="time" v-model="roomInfo.closeTime">
                <div id="test">
                    <ul v-for="amenity in amenities" v-bind:key="amenity['.key']">
                        <label class="switch">
                            <input class="amenity" type="checkbox" :id="amenity.offering" :value="amenity.offering" v-model="roomInfo.amenities">
                            <span class="slider" :for="amenity.offering"></span>
                            <p>{{amenity.offering}}</p>
                        </label>
                    </ul>

                </div>
            </div>
        </div>
        <div class="row">
            <div class="columnButtons">
                <button @click="updateRoom">Confirm</button>
                <button>
                    <router-link to="/home">Cancel</router-link>
                </button>
            </div>

        </div>
            <!-- <input type = "file" @click="uploadImage"> -->
        </div>
    </div>
</template>

<script>
//   console.log(this.$router);
import firebase from 'firebase';
var updateRoom = firebase.functions().httpsCallable('updateRoom');
var createRoom = firebase.functions().httpsCallable('createRoom');

var hostID;
var roomID = '1';
var storageRef = firebase.storage().ref();

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
            id: 0,
            room: {},
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
        });

    },
    methods: {
        calculateTime: function () {
            this.roomInfo.bookingSlots = [[]];
            var i = 0;
            var startHoursMinutes = this.roomInfo.openTime.split(/[.:]/);
            var startHours = parseInt(startHoursMinutes[0], 10);
            var closeHoursMinutes = this.roomInfo.closeTime.split(/[.:]/);
            var closeHours = parseInt(closeHoursMinutes[0], 10);
            var timeSlotsAVailable = closeHours - startHours;
            var firstTimeSlot = startHours;

            while (i < timeSlotsAVailable) {
                this.roomInfo.bookingSlots.push({
                    startingTime: firstTimeSlot,
                    endingTime: ++firstTimeSlot
                });
                i++;
            }
        },
        updateRoom: async function () {
            await this.calculateTime();
            await updateRoom(this.roomInfo).then(() => {
                this.$router.go(-1);
            });
            console.log(this.id);
            console.log('test')
        }
    }
}
</script>

<style scoped>
    .columnButtons {
        float: right;
    }
.column label {
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

.input_add {
    margin: 10px 0;
    width: 250%;
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
    word-break: break-word;
}

.input_time {
    margin: 10px 0;
    width: auto;
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

.columnButtons {
    width:100%;
}

.columnButtons button {
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
    width: 15%;
    color: #000000;
    margin: 0px 20px;
    float: right;
    margin-bottom: 20px;

}

.columnButtons a {
    text-decoration: none;
}

.row {
    display: flex;
}

.column {
    width:25%;
    padding: 10px;
}

.columnX {
    border: 2px solid black;
    background-color:red;
    width:75%;
}

.edit {
    margin-left:auto;
    margin-right:auto;
    padding-top: 44px;
    margin-bottom: 45px;
    background: rgba(218, 229, 227, 0.9);
    border-radius: 15px;
    width:70%;
    height:60%;
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

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    float:left;
}

.switch p {
    margin-left:75px;
    margin-top:40px;
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
