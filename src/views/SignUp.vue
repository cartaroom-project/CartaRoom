<template>
  <div class="sign-up">
  <h3>Sign up</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="signUp">Sign Up!</button>
  </div>
</template>

<script>
import firebase from 'firebase';
require('firebase/firestore');

export default {
  name: 'signUp',
  data(){
    return{
    email:'',
    password:''
  }
  },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            alert('Your account has been created')
            this.$router.replace('home')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    }
  }
</script>
