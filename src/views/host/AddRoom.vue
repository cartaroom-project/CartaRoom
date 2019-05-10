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
                    <br>
                    <input class="input_add" type="number" v-model="roomInfo.capacity" placeholder="capacity">
                    <br>
                    <input class="input_add" type="text" v-model="roomInfo.description" placeholder="description">
                    <br>
                    <input class="input_add" type="text" v-model="roomInfo.address" placeholder="location">
                    <br />
                    <input class="input_time" type="time" v-model="roomInfo.openTime">
                    <br />
                    <input class="input_time" type="time" v-model="roomInfo.closeTime">
                    <br />
                </div>
            </div>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <div class="row">
            <h3>Amenities:</h3>
            <p>test: {{roomInfo.amenities}}</p>
            <li v-for="amenity in amenities" v-bind:key="amenity['.key']">
                <input type="checkbox" :id="amenity.offering" :value="amenity.offering" v-model="roomInfo.amenities">
                <br>
                <p :for="amenity.offering">{{amenity.offering}}</p>
            </li>
            </div>
            <!--    <input type = "file" @click="uploadImage">-->
            <br>
            <button @click="addRoom">Add Room</button>
            <br>
            <router-link to="/home">Cancel</router-link>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';
    var addRoom = firebase.functions().httpsCallable('addRoom');


    var hostID;
    var roomID = '1';

    firebase.auth().onAuthStateChanged(function(user) {
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
            amenities:[
                {offering: 'Wifi'},
                {offering: 'Projector'},
                {offering: 'Whiteboard'},
                {offering: 'Ethernet'},
            ],
            roomInfo:
            {
                hostID: hostID,
                name: '',
                capacity: '',
                description: '',
                address: '',
                roomID: roomID,
                bookingCounter: 0,
                openTime:0,
                closeTime:0,
                amenities: [],
                bookingSlots: [[]]
            }
        }
    },
    methods: {
        calculateTime: function()
        {
            var i = 0;
            var startHoursMinutes = this.roomInfo.openTime.split(/[.:]/);
            var startHours = parseInt(startHoursMinutes[0], 10);
            var closeHoursMinutes = this.roomInfo.closeTime.split(/[.:]/);
            var closeHours = parseInt(closeHoursMinutes[0], 10);
            var timeSlotsAvailable = closeHours - startHours;
            var firstTimeSlot = startHours;
            
            while(i<timeSlotsAvailable){
               this.roomInfo.bookingSlots.push({
                   startingTime: firstTimeSlot,
                   endingTime: ++firstTimeSlot});
               i++;
            }
        },
        addRoom: async function()
        {
            await  this.calculateTime();
            await   addRoom(this.roomInfo);    
            await  this.$router.replace('home');
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
        height: 300px; /* Should be removed. Only for demonstration */
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
    .input_time{
        margin: 10px 0;
        width: 125px;
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
        margin-right: 700px;
    }

    button {
        margin-top: 10px;
        width: 10%;
        cursor: pointer;
}

    .add {
        margin-left: 25%;
        padding-top: 44px;
        background: rgba(218, 229, 227, 0.9);
        border-radius: 15px;
        width: 1200px;
        height: 1000px;
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
