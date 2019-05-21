<template>

<div id="app">
    <NotLoginNavBar></NotLoginNavBar>
    <div id="notLoggedInContent">
        <router-view></router-view>

    </div>
    <v-footer dark height="auto" style="margin-bottom: 0px; position: relative">
        <Footer></Footer>
    </v-footer>
</div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase.js';
import Footer from "./components/Footer";
import NotLoginNavBar from "./components/NotLoginNavBar";

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
    components: {
        Footer,NotLoginNavBar
    },
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
    #notLoggedInContent {
        height:100%;
    }
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    max-width: 100%;
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
    aligh: left;
}

#logo {
    max-width: 25%;
    align: left;
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
