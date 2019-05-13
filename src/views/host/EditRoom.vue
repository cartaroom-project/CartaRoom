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
                    <label>Location</label>
                    <label>Open Time</label>
                    <label>Close Time</label>
                </div>
                <div class="column">
                    <input class="input_add" type="text" v-model="roomInfo.name">
                    <input class="input_add" type="number" v-model="roomInfo.capacity">
                    <input class="input_add" type="text" v-model="roomInfo.description">
                    <input class="input_add" type="text" v-model="roomInfo.address">
                    <input class="input_time" type="time" v-model="roomInfo.openTime">
                    <input class="input_time" type="time" v-model="roomInfo.closeTime">
                </div>
            </div>
            <div class="row">
                <div class="columnX">
                    <label>Ammenaties:</label>
                </div>
                <div class="column">
                    <ul v-for="amenity in amenities" v-bind:key="amenity['.key']">
                        <input type="checkbox" :id="amenity.offering" :value="amenity.offering" v-model="roomInfo.selectedAmenities">
                        <label :for="amenity.offering">{{amenity.offering}}</label>
                    </ul>
                </div>
            </div>
            <!-- <input type = "file" @click="uploadImage"> -->
            <br>
            <button @click="updateRoom">Confirm</button>
            <button>
                <router-link to="/home">Cancel</router-link>
            </button>
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
                    amenities: [
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
                            openTime: 0,
                            closeTime: 0,
                            amenities: [],
                            bookingSlots: [[]]
                        }
                }
            },
            async created() {
                this.id = this.$route.params.id;
                await createRoom({id: this.id, roomInfo: this.roomInfo}).then((result) => {
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
                        this.roomInfo.bookingSlots.push({startingTime: firstTimeSlot, endingTime: ++firstTimeSlot});
                        i++;
                    }
                },
                updateRoom: async function () {
                    await this.calculateTime();
                    await updateRoom(this.roomInfo).then(()=> {
                        this.$router.go(-1);
                    });
                    console.log(this.id);
                    console.log('test')
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
    .row {
    display: flex;
    }
    .column {
    flex: 50%;
    padding: 10px;
    } 
    .columnX {
    flex:13%;
    }
    .edit {
    margin-left: 25%;
    padding-top: 44px;
    margin-bottom: 45px;
    background: rgba(218, 229, 227, 0.9);
    border-radius: 15px;
    width: 1200px;
    height: 850px;
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