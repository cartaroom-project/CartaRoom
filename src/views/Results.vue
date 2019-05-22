<template>
<div class="finalResults">
    <div id="search_text">
        <div style="display:inline">
            <input class="search_input big" type="text" placeholder= "Location" v-model="criteria" id="where" @keyup.enter="search">
            <button id="search_button" @click="search">Search</button>
        </div>
    </div>
    <div class="results" v-for="room of rooms" v-bind:key="room['.key']">
        <div class="row">
            <div class="column">
                <label>Room Name</label>
                <label>Room Capacity</label>
                <label>Address</label>
                <label>Hours Of Operation</label>
            </div>
            <div class="column">
                <p class="info">{{ room.name }}</p>
                <p class="info">{{ room.capacity }}</p>
                <p class="info">{{ room.address }}</p>
                <p class="info">{{ room.openTime }} to {{ room.closeTime }}</p>
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

export default {
    name: 'results',
    data() {
        return {
            rooms: [],
            criteria: '',
            newCriteria: ''
        }
    },
    created() {
        this.criteria = this.$route.params.criteria;
        db.ref('rooms').orderByChild("name").startAt(this.criteria).endAt(this.criteria + "\uf8ff").once('value').then((snapshot) => {
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
               alert('Missing criteria');
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

label {
    margin-bottom: 20px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 35px;
    display: flex;
    align-items: center;
    color: #000000;
}

span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
}

button {
    margin-top: 10px;
    cursor: pointer;
    border-radius: 15px;
    height: 44px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 35px;
    text-align: center;
    width: 177px;
    color: #FFFFFF;
    background: #000000;
}

#stuck {
    position: fixed;
    margin-right: 100px;
}

.results {
    margin: 0 auto;
    padding-top: 25px;

    margin-top: 25px;
    margin-bottom: 25px;
    background: rgba(218, 229, 227, 0.9);
    border-radius: 15px;
    width: 400px;
    float: left;
    margin-left: 50px
}

.info {
    border: 0.25px solid #000000;
    width: 155px;
    font-size: 15px;
    line-height: 35px;
    box-sizing: border-box;
    background: #FFFFFF;
    border-radius: 10px;
    margin-right: 40px;
}

.row {
    left: 0;
    display: inline-flex;
    padding-bottom: 30px;
}

.column {
    flex: 25%;
    padding: 10px;
}

img {
    float: right;
    right: 0;
    margin-right: 50px;
    margin-top: 80px;
    height: 50%;
    width: 25%;
    position: fixed;
}

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
}

.label_head {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 28px;
    text-align: left;
    padding-left: 40px;
    margin-bottom: 0px;
}

#search_button {
    background: rgba(84, 142, 255, 0.8);
    border-radius: 5px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    text-align: center;
    color: #FFFFFF;
    width: 10%;
    height: 35px;
    margin-bottom: 0px;
    float: right;
    margin-right: 20%;
}

.search_input {
    background: #FFFFFF;
    border: 1px solid #828282;
    box-sizing: border-box;
    border-radius: 10px;
    padding-left: 20px;
    font-family: Rboto;
    font-style: normal;
    font-weight: 300;
    margin-top: 6px;
    font-size: 15px;
}

.big {
    width: 620px;
    height: 37px;
}

::placeholder {
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    color: #828282;
}

:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    color: #828282;
}

::-ms-input-placeholder {
    /* Microsoft Edge */
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    color: #828282;
}
</style>
