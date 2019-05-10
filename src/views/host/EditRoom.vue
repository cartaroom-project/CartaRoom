<template>
    <div class="editRoom">
        <p>Let's Edit a room</p>
        <h1>{{roomInfo.name}}</h1>
        <input type="text" v-model="roomInfo.name"><br>
        <input type="number" v-model="roomInfo.capacity"><br>
        <input type="text" v-model="roomInfo.description"><br>
        <input type="text" v-model="roomInfo.address"><br>
        Open Time:<br />  <input type="time" v-model="roomInfo.openTime"><br />
        Close Time:<br />  <input type="time" v-model="roomInfo.closeTime"><br />

        <h3>Amenities:</h3>
        <p>test: {{roomInfo.amenities}}</p>
        <li v-for="amenity in amenities"  v-bind:key ="amenity['.key']">
            <input type="checkbox" :id="amenity.offering" :value="amenity.offering" v-model="roomInfo.amenities">
            <label :for="amenity.offering">{{amenity.offering}}</label>
        </li>

        <!-- <input type = "file" @click="uploadImage"> -->
        <br>

        <button @click="updateRoom">Confirm Edit</button><br />
        <router-link to="/home">Cancel</router-link>
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
