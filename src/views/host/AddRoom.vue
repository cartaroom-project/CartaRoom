<template>
  <div class="addRoom">
    <p>Let's add a new room</p>
    <input type="text" v-model="roomInfo.name" placeholder="Name"><br>
    <input type="number" v-model="roomInfo.capacity" placeholder="Capacity"><br>
    <input type="text" v-model="roomInfo.description" placeholder="Description"><br>
    <input type="text" v-model="roomInfo.address" placeholder="Address"><br>
    Open Time:<br />  <input type="time" v-model="roomInfo.openTime"><br /> 
    Close Time:<br />  <input type="time" v-model="roomInfo.closeTime"><br />
     <h3>Amenities:</h3>
      <p>test: {{roomInfo.selectedAmenities}}</p>

    <li v-for="amenity in amenities"  v-bind:key ="amenity['.key']">
        <input type="checkbox" :id="amenity.offering" :value="amenity.offering" v-model="roomInfo.selectedAmenities"><br>
        <label :for="amenity.offering">{{amenity.offering}}</label>
    </li>
<!--    <input type = "file" @click="uploadImage">-->
      <br>
    <button @click="addRoom">Add Room</button>
      <button @click="addRoomTest">Add Room Test</button>
    <router-link to="/home">Cancel</router-link>
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
                {offering: 'wifi'},
                {offering: 'projector'},
                {offering: 'whiteboard'},
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
                reserved: false,
                bookingCounter: 0,
                openTime:0,
                closeTime:0,
                selectedAmenities: [],
                bookingSlots: [[]]
            }
        }
    },
    methods: {
          addRoomTest: function()
          {
              addRoom({
                  hostID: this.roomInfo.hostID,
                  name: this.roomInfo.name,
                  capacity: this.roomInfo.capacity,
                  description: this.roomInfo.description,
                  address:this.roomInfo.address,
                  roomID:this.roomInfo.roomID,
                  reserved:this.roomInfo.reserved,
                  bookingCounter: this.roomInfo.bookingCounter,
                  openTime: this.roomInfo.openTime,
                  closeTime: this.roomInfo.closeTime,
                  amenities: this.roomInfo.selectedAmenities,
                  bookingSlots: this.roomInfo.bookingSlots});
              console.log('roomtest');

              this.roomInfo.roomID = roomID.key;

              addRoom({
                  roomID:this.roomInfo.roomID
              })

          },
      addRoom: function() {
        var i = 0;
        var startHoursMinutes = this.roomInfo.openTime.split(/[.:]/);
        var startHours = parseInt(startHoursMinutes[0], 10);
        var closeHoursMinutes = this.roomInfo.closeTime.split(/[.:]/);
        var closeHours = parseInt(closeHoursMinutes[0], 10);
        var timeSlotsAvailable = closeHours - startHours;
        var firstTimeSlot = startHours;
        
        while(i<timeSlotsAvailable){
            this.roomInfo.bookingSlots.push({startingTime: firstTimeSlot,endingTime: ++firstTimeSlot});
            i++;
        }

            roomID = firebase.database().ref('rooms').push({
              hostID: this.roomInfo.hostID,
              name: this.roomInfo.name, 
              capacity: this.roomInfo.capacity, 
              description: this.roomInfo.description, 
              address:this.roomInfo.address, 
              roomID:this.roomInfo.roomID,
              reserved:this.roomInfo.reserved,
              bookingCounter: this.roomInfo.bookingCounter,
              openTime: this.roomInfo.openTime,
              closeTime: this.roomInfo.closeTime,
              amenities: this.roomInfo.selectedAmenities,
              bookingSlots: this.roomInfo.bookingSlots})

            this.roomInfo.roomID = roomID.key;

            firebase.database().ref('rooms/' + roomID.key).update({              
              hostID: this.roomInfo.hostID,
              name: this.roomInfo.name, 
              capacity: this.roomInfo.capacity, 
              description: this.roomInfo.description, 
              address:this.roomInfo.address, 
              roomID:this.roomInfo.roomID,
              reserved:this.roomInfo.reserved,
              bookingCounter: this.roomInfo.bookingCounter,
              openTime: this.roomInfo.openTime,
              closeTime: this.roomInfo.closeTime,
              amenities: this.roomInfo.selectedAmenities,
              bookingSlots: this.roomInfo.bookingSlots})


                this.$router.replace('home')
            }
        },

        // post: function()
        // {
        //    this.$http.post(firebase.database().ref('users'), this.credentials).then(function (data) {
        //
        //        this.submitted=true;
        //        this.$router.replace('home')
        //        }
        //    )
        // }
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
