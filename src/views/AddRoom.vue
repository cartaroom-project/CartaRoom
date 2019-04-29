<template>
  <div class="sign-up">
    <p>Let's add a new room</p>
    <input type="text" v-model="roomInfo.name" placeholder="Name"><br>
    <input type="text" v-model="roomInfo.capacity" placeholder="Capacity"><br>
    <input type="text" v-model="roomInfo.description" placeholder="Description"><br>
    <input type="text" v-model="roomInfo.address" placeholder="Address"><br>
      <br>
    <button @click="addRoom">Add Room</button>
    <router-link to="/home">Cancel</router-link>
  </div>
</template>

 <script>
  import firebase from 'firebase';
  import axios from 'axios';
  var userID;
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
   // console.log(user.uid); //a@a.com = gbEw7s5ic1drxG3vgFWD3DAMb972
    userID = user.uid;
  } else {
   // console.log("No user available"); 
    userID = "null";
  }
});

  export default {
      name: 'addRoom',
      
      data() {
      return {
          roomInfo:
              {
                  userID: userID,
                  name: '',
                  capacity: '',
                  decription: '',
                  address: ''
              }
      }
    },
    methods: {
      addRoom: function() {
            firebase.database().ref('rooms').push({userID: this.roomInfo.userID, name: this.roomInfo.name, capacity: this.roomInfo.capacity, description: this.roomInfo.decription, address:this.roomInfo.address })
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
