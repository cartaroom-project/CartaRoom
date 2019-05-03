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
     <h3>Ammenaties:</h3>
            <ul v-for="amenity in roomInfo.selectedAmenities"  v-bind:key ="amenity['.key']">
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
  import axios from 'axios';

  var hostID;
  var roomID = '1';
//   var timeSlotsAVailable = 2;
  var storageRef = firebase.storage().ref();

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
          id: 0,
          room: {},
          timeSlotsAvailable : 0,
          msg: '',
          msg1: 'View time slots',
          date: '',
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
                  reserved: 'false',
                  bookingCounter: 0,
                  openTime:0,
                  closeTime:0,
                  selectedAmenities: [],
                  bookingSlots: [{startingTime: '9:00',endingTime: '10:00'}]
              }
      }
    },
    created() {
            this.id = this.$route.params.id;
            // this.roomInfo.name =  firebase.database().ref('rooms/' + this.id +'/name' )
            firebase.database().ref('rooms/' + this.id).once('value').then((snapshot) => {
          this.room = snapshot.val();
                  this.roomInfo.hostID = snapshot.val().hostID,
                  this.roomInfo.name = snapshot.val().name,
                  this.roomInfo.capacity = snapshot.val().capacity,
                  this.roomInfo.description = snapshot.val().description,
                  this.roomInfo.address = snapshot.val().address,
                  this.roomInfo.roomID = snapshot.val().roomID,
                  this.roomInfo.reserved = snapshot.val().reserved,
                  this.roomInfo.bookingCounter = snapshot.val().bookingCounter,
                  this.roomInfo.openTime = snapshot.val().openTime,
                  this.roomInfo.closeTime = snapshot.val().closeTime,
                  this.roomInfo.selectedAmenities = snapshot.val().amenities,
                  this.roomInfo.bookingSlots = snapshot.val().bookingSlots
          console.log(this.roomInfo)
        }) 
      console.log(this.roomInfo)
        // this.doMath();
    },
    methods: {
        doMath: function(){
        var startHoursMinutes = this.roomInfo.openTime.split(/[.:]/);
        var startHours = parseInt(startHoursMinutes[0], 10);
        console.log('startHours' + startHours);
        var closeHoursMinutes = this.roomInfo.closeTime.split(/[.:]/);
        var closeHours = parseInt(closeHoursMinutes[0], 10);
        console.log('closeHours' + closeHours);
        this.timeSlotsAvailable = closeHours - startHours;
        console.log(this.timeSlotsAvailable)
        this.msg = 'Time Slots';
        this.msg1 = '';
        },
        bookRoom: function(startTime, endTime) {
        // var userInfo = firebase.auth().currentUser.email;
        // var uniqueKeyIDBooking = '1';

        // //console.log(room)
        // //console.log('Start Time: ' + this.startTime)

        // firebase.database().ref('rooms/' + room.uniqueKey).update({userID: room.userID, name: room.name, capacity: room.capacity, description: room.description, address: room.address, uniqueKey: room.uniqueKey, reserved: 'true'})
        // uniqueKeyIDBooking = firebase.database().ref('currentBookings').push({room: room, user: userInfo, bookingID: '1',startTime: this.startTime,endTime: this.endTime,date: this.date})
        // firebase.database().ref('currentBookings/' + uniqueKeyIDBooking.key).update({room: room, user: userInfo, bookingID: uniqueKeyIDBooking.key,startTime: this.startTime,endTime: this.endTime,date: this.date})

        // uniqueKeyIDBooking = firebase.database().ref('allBookings').push({room: room, user: userInfo, bookingID: '1',startTime: this.startTime,endTime: this.endTime,date: this.date})
        // firebase.database().ref('allBookings/' + uniqueKeyIDBooking.key).update({room: room, user: userInfo, bookingID: uniqueKeyIDBooking.key,startTime: this.startTime,endTime: this.endTime,date: this.date})

        alert('Booking Details:\n' + 'date: ' + this.date + '\n' + "time: " + startTime + ':00'+" - " + endTime + ':00');
        this.$router.go();
     }
    //   addRoom: function() {
    //     var i = 0;
        // var startHoursMinutes = this.roomInfo.openTime.split(/[.:]/);
        // var startHours = parseInt(startHoursMinutes[0], 10);
        // var closeHoursMinutes = this.roomInfo.closeTime.split(/[.:]/);
        // var closeHours = parseInt(closeHoursMinutes[0], 10);
        // var timeSlotsAVailable = closeHours - startHours;
    //     var firstTimeSlot = startHours;
        
    //     while(i<timeSlotsAVailable){
    //         this.roomInfo.bookingSlots.push([firstTimeSlot, ++firstTimeSlot]);
    //         i++;
    //     }

    //         firebase.database().ref('rooms/' + this.id).update({
    //           hostID: this.roomInfo.hostID,
    //           name: this.roomInfo.name, 
    //           capacity: this.roomInfo.capacity, 
    //           description: this.roomInfo.description, 
    //           address:this.roomInfo.address, 
    //           roomID:this.id,
    //           reserved:this.roomInfo.reserved,
    //           bookingCounter: this.roomInfo.bookingCounter,
    //           openTime: this.roomInfo.openTime,
    //           closeTime: this.roomInfo.closeTime,
    //           amenities: this.roomInfo.selectedAmenities,
    //           bookingSlots: this.roomInfo.bookingSlots})

    //         this.$router.go(-1)
    //   }
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

