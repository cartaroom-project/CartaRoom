<template>
    <div class="editRoom">
        <div class="banner">
            <br>
            <p class="banner_text">Room View</p>
        </div>
        <div id="view">
            <div class="row">
                <div class="column1">
                    <label>Room Name</label>
                </div>
                <div class="column2">
                    <p class="info"> {{ roomInfo.name }}</p>
                </div>
            </div>
            <div class="row">
                <div class="column1">
                    <label>Capacity</label>
                </div>
                <div class="column2">
                    <p class="info2"> {{ roomInfo.capacity }} People</p>
                </div>
            </div>
            <div class="row">
                <div class="column1">
                    <label>Description</label>
                </div>
                <div class="column2">
                    <p class="info"> {{ roomInfo.description }}</p>
                </div>
            </div>
            <div class="row">
                <div class="column1">
                    <label>Address</label>
                </div>
                <div class="column2">
                    <p class="info"> {{ roomInfo.address }}</p>
                </div>
            </div>
            <div class="row">
                <div class="column1">
                    <label>Total Bookings</label>
                </div>
                <div class="column2">
                    <p class="info2"> {{ roomInfo.bookingCounter }} Bookings</p>
                </div>
            </div>
            <div class="row">
                <div class="column1">
                    <label>Business Hours</label>
                </div>
                <div class="column2">
                    <p class="info2"> {{ roomInfo.openTime }} - {{ roomInfo.closeTime }}</p>
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
                <div class="column2">
                    <ul class="info2" v-for="amenity in roomInfo.amenities"  v-bind:key ="amenity['.key']">
                        {{amenity}}
                    </ul>
                </div>
            </div>

            <div class="row">
                <div class="columnButtons">
                    <button v-on:click="editRoom(roomInfo.roomID)">Edit <i class='far fa-edit'></i></button>
                    <button id="delete" v-on:click="deleteRoom(roomInfo.roomID)">Delete <i class='far fa-trash-alt'></i></button>
                </div>
            </div>
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
            deleteRoom: function (id) {
                db.ref('currentBookings').orderByChild("room/roomID").equalTo(id).once('value').then((snapshot) => {
                    if (snapshot.exists()) {
                        if (window.confirm("Room currently has bookings, do you want to continue?")) {
                            if (window.confirm("Are you sure you want to delete this room?")) {
                                hostDeleteRoom({
                                    id: id
                                }).then(() => {
                                    //changes booking status to 'room deleted' and removes from current bookings
                                    snapshot.forEach((doc) => {
                                        bookingStatus({
                                            bookingID: doc.key,
                                            roomID: id,
                                            statMsg: 'room deleted'
                                        });
                                    });
                                    alert('Room Deleted!');
                                    this.$router.go(-1);
                                })
                            }
                        }
                    } else {
                        if (window.confirm("Are you sure you want to delete this room?")) {
                            hostDeleteRoom({
                                id: id
                            }).then(() => {
                                alert('Room Deleted!');
                                this.$router.go(-1);
                            })
                        }
                    }
                });
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
        width:70%;
    }

    .column2 ul{
        display:inline-block;
        margin-right: 20px;
        margin-top:10px;
        margin-bottom: 0;
        vertical-align:middle;
    }

    .info{
        border: 0.75px solid darkgrey;
        width: 75%;
        font-size: 20px;
        line-height: 35px;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 5px;
        margin-right: 100px;
        word-break: break-word;
    }

    .info2 {
        border: 0.75px solid darkgrey;
        width:160px;
        padding-left: 0;
        font-size: 20px;
        line-height: 35px;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 5px;
        word-break: break-word;
    }
    .row {
        display: flex;
        align-items: center;
    }

    #line {
        width:75%;
        margin:auto auto 20px auto;
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
        float: right;
    }

    .columnButtons a {
        text-decoration: none;
        color:black;
    }


    label {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 25px;
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
        background: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)),url("../../assets/banner/Host2.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        margin-top:-150px;
        padding-top:150px;
    }

    #delete {
        background-color: #ff6961;
        color:white;
    }
    #view {
        margin: 40px auto 45px auto;
        padding-top: 44px;
        background: rgba(218, 229, 227, 0.9);
        border-radius: 15px;
        width:55%;
        height: 60%;
    }
</style>
