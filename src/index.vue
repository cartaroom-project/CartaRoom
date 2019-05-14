<template>
    <div id="app">
        <div id="nav">
            <img id="logo" src="./assets/Final_CartaRoom.png"/>
            <!-- renders view before login -->
            <router-link to="/login"><button class="navButtons">LOGIN</button></router-link>
            <router-link to="/sign-up"><button class="navButtons">SIGN UP</button></router-link>
        </div>

        <div id="notLoggedInContent">
            <router-view></router-view>
        </div>

        <v-footer dark height="auto" style="margin-bottom: 0px; position: relative">
            <v-card>
                <v-card-text class="white--text pt-0">
                    Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum.
                    Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur
                    dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada.
                    Nulla
                    placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam
                    elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes,
                    nascetur
                    ridiculus mus.
                </v-card-text>

                <v-divider></v-divider>

                <v-card-text class="white--text">
                    &copy;2018 — <strong>Vuetify</strong>
                </v-card-text>
            </v-card>
        </v-footer>

    </div>


</template>

<script>
    import firebase from 'firebase';
    import db from '@/firebase.js';
    import HostNavbar from "./components/HostNavbar";

    // db.ref('rooms').once('value').then(function(snapshot) {
    //   console.log(snapshot.val());
    // }).catch((error) => {
    //   console.log(error);
    // });

    let userID;
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            // console.log(user.uid); //a@a.com = gbEw7s5ic1drxG3vgFWD3DAMb972
            userID = user.uid;
        } else {
            // console.log("No user available");
            userID = "null";
        }
    });

    export default {
        name: 'home',
        components: {HostNavbar},
        methods: {
            logout: function () {
                firebase.auth().signOut().then(() => {
                    this.$router.replace('login')
                })
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        max-width:100%;
        background-color:red;
        text-align: right;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    #nav img {
        aligh:left;
    }
    #logo {
        max-width: 25%;
        align:left;
    }

    .navButtons {
        background: rgba(47, 69, 80, 1);
        border: 1px solid #828282;
        margin-left: 20px;
        height: 35px;
        width: 90px;

        box-sizing: border-box;
        border-radius: 10px;
        color: white;

        font-family: Roboto;
        font-weight: normal;
        font-size: 16px;
        text-align: center;
    }

</style>
