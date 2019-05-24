<template>
<div class="finalResults">
    <div id="search_text">
        <input class="search_input big" v-focus type="text" placeholder= "Location" v-model="criteria" id="where" @keyup.enter="search">
        <button id="search_button" @click="search">Search</button>
    </div>
    <div class="results" v-for="room of rooms" v-bind:key="room['.key']">
        <div class="row">
            <img src="../assets/banner/roomView/room1.jpg">
        </div>
            <div class="row">
                <div class="column1">
                    <label>Room Name</label>
                </div>
                <div class="column2">
                    <p class="info"> {{ room.name }}</p>
                </div>
            </div>
            <div class="row">
                <div class="column1">
                    <label>Capacity</label>
                </div>
                <div class="column2">
                    <p class="info2"> {{ room.capacity }} People</p>
                </div>
            </div>
            <div class="row">
                <div class="column1">
                    <label>Description</label>
                </div>
                <div class="column2">
                    <p class="info"> {{ room.description }}</p>
                </div>
            </div>
            <div class="row">
                <div class="column1">
                    <label>Address</label>
                </div>
                <div class="column2">
                    <p class="info"> {{ room.address }}</p>
                </div>
            </div>
            <div class="row">
                <div class="column1">
                    <label>Business Hours</label>
                </div>
                <div class="column2">
                    <p class="info2"> {{ room.openTime }} - {{ room.closeTime }}</p>
                </div>
            </div>

            <div class="row">
                <div class="columnButtons">
                    <button @click="viewRoom(room.roomID)">View Room</button>
                </div>
            </div>

            <!-- <button v-on:click="bookRoom(room)">Book Room</button> <br /> -->
        </div>
        <br>
        <!-- comment out for new, can click logo to go back to search page -->
        <!-- <router-link to="/search">
        <button>
            Back to Search  
        </button>
    </router-link> -->
        <!-- <Recommended></Recommended> -->
        <div class="clear">
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase.js';
//alert styling
import Vue from 'vue'
import 'v-slim-dialog/dist/v-slim-dialog.css'
import SlimDialog from 'v-slim-dialog'
Vue.use(SlimDialog)

export default {
    name: 'results',
    data() {
        return {
            rooms: [],
            criteria: '',
            criteriaLowerCase: ''
        }
    },
    created() {
        this.criteriaLowerCase = this.$route.params.criteria.toLowerCase();
        this.criteria = this.$route.params.criteria;
        db.ref('rooms').orderByChild("nameLowerCase").startAt(this.criteriaLowerCase).endAt(this.criteriaLowerCase + "\uf8ff").once('value').then((snapshot) => {
            this.rooms = [];
            snapshot.forEach((doc) => {
                this.rooms.push(doc.val());
            })
        }).catch((error) => {
            console.log(error);
        });
    },
    methods: {
        viewRoom: function (id) {
            this.$router.push({
                name: 'RoomViewPatron',
                params: {
                    id: id
                }
            })
        },
        search: function () {
            if (this.criteria == '') {
                this.$dialogs.alert('Missing required criteria', {
                    title: 'Warning!',
                    okLabel: 'OK'
                });
            } else {
                this.$router.push({
                    name: 'Results',
                    params: {
                        criteria: this.criteria
                    }
                })
                this.$router.go();
            }
        }
    }
}
</script>

<style scoped>
.clear {
    clear: both;
}

.columnButtons {
    width: 100%;
}

.column1 {
    width: 30%;
    align-items: center;
}

.column1 label {
    float: right;
    padding-right: 10%;
}

.column2 {
    width: 70%;
    margin-top: 1%;
}

.column2 p {
    margin: 0;
}

label {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 35px;
    display: flex;
    align-items: center;
    color: #000000;
}


.columnButtons button {
    margin: 2% 0;
    border-radius: 15px;
    height: 44px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 35px;
    text-align: center;
    width: 45%;
    color: white;
    background: #000000;
}


.results {
    margin: 25px auto;
    padding-top: 25px;
    background: rgba(218, 229, 227, 0.9);
    border-radius: 15px;
    width: 30%;
    float: left;
    margin-left: 50px
}

.info {
    border: 0.75px solid darkgrey;
    width: 90%;
    font-size: 15px;
    line-height: 25px;
    box-sizing: border-box;
    background: #FFFFFF;
    border-radius: 5px;
    margin-right: 100px;
    word-break: break-word;
}

.info2 {
    border: 0.75px solid darkgrey;
    width: 90%;
    padding-left: 0;
    font-size: 15px;
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

img {
    margin: 1% 25%;
    width: 50%;
    height: auto;
    border: 2px solid darkgray;
    border-radius: 2px;
}

/*img {*/
/*    float: right;*/
/*    right: 0;*/
/*    margin-right: 50px;*/
/*    margin-top: 80px;*/
/*    height: 50%;*/
/*    width: 25%;*/
/*    position: fixed;*/
/*}*/

.search_input {
    background: #FFFFFF;
    border: 1px solid #828282;
    box-sizing: border-box;
    border-radius: 10px;
    padding-left: 20px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height:35px;
}

#search_text {
    border: 2px solid black;
    display: flex;
    padding-left: 30%;
}

#search_button{
    height:35px;
    background: rgba(84, 142, 255, 0.8);
    border-radius: 5px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    text-align: center;
    color: #FFFFFF;
    width: 7%;
    margin: auto 0 auto 1%
}

.search_input {
    background: #FFFFFF;
    border: 1px solid #828282;
    box-sizing: border-box;
    border-radius: 10px;
    padding-left: 2%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 25px;
}

.big {
    width: 50%;
    height: 37px;
}

::placeholder {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    color: #828282;
}

:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    color: #828282;
}

::-ms-input-placeholder {
    /* Microsoft Edge */
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    color: #828282;
}
</style>
