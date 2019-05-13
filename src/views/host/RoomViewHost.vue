<template>
    <div class="editRoom">
        <div class="banner">
            <br>
            <p class="banner_text">Room View</p>
        </div>
        <div id="view">
            <div class="row">
                <div class="column">
                    <label>Name</label>
                    <label>Capacity</label>
                    <label>Description</label>
                    <label>Location</label>
                    <label>Open Time</label>
                    <label>Close Time</label>
                    <label>Total Bookings</label>
                    <label>Amenities</label>
                </div>
                <div class="column">
                    <p class="info"> {{ roomInfo.name }}</p>
                    <p class="info"> {{ roomInfo.capacity }}</p>
                    <p class="info"> {{ roomInfo.description }}</p>
                    <p class="info"> {{ roomInfo.address }}</p>
                    <p class="info"> {{ roomInfo.openTime }}</p>
                    <p class="info"> {{ roomInfo.closeTime }}</p>
                    <p class="info"> {{ roomInfo.bookinCounter }}</p>
                    <ul class="info" v-for="amenity in roomInfo.amenities"  v-bind:key ="amenity['.key']">
                        {{amenity}}
                    </ul>
                </div>
            </div>
            <br />
            <button v-on:click="editRoom(roomInfo.roomID)">Edit Room</button>
            <button v-on:click="deleteRoom(roomInfo.roomID)">Delete Room</button><br />
        </div>
        <router-link to="/home">Cancel</router-link>
    </div>
</template>
<script>
    import firebase from 'firebase';
    import db from '@/firebase.js';
    var createRoom = firebase.functions().httpsCallable('createRoom');
    var hostDeleteRoom = firebase.functions().httpsCallable('hostDeleteRoom');
    
    var hostID;
    var roomID = '1';
    var storageRef = firebase.storage().ref();
    
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      hostID = user.uid;
    } else {
      hostID = 'null';
    }
    });
    
    export default {
        name: 'addRoom',
        
        data() {
        return {
            id: 0,
            room: {},
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
                    reserved: 'false',
                    bookingCounter: 0,
                    openTime:0,
                    closeTime:0,
                    amenities: [],
                    bookingSlots: [{startingTime: '9:00',endingTime: '10:00'}]
                }
        }
      },
      async created() {
              this.id = this.$route.params.id;
              await createRoom({id: this.id, roomInfo: this.roomInfo}).then((result) => {
                  this.roomInfo = result.data.roomInfo
              }).catch(function(error) {
                  console.log(error);
              });
      },
    
      methods: {
        deleteRoom: function(id) {
         if(window.confirm("Are you sure you want to delete this room?")){
            hostDeleteRoom({id:id}).then(() => {
            alert('Room Deleted!');
            this.$router.go(-1);
          })
          }
      },  
    
      editRoom: function(id){
        this.$router.push({
          name: 'EditRoom',
          params: { id: id }
        })
      }
      },
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
    #view {
        margin-top: 40px;
        margin-left: 25%;
        padding-top: 44px;
        margin-bottom: 45px;
        background: rgba(218, 229, 227, 0.9);
        border-radius: 15px;
        width: 1200px;
        height: 600px;
    }
    .row {
        display: flex;
    }
    .column {
        flex: 50%;
        padding: 10px;
    } 
    .info{
        border: 0.25px solid #000000;
        width: 725px;
        font-size: 20px;
        line-height: 35px;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 10px;
        margin-right: 100px;
    }
</style>