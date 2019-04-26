<template>
  <div class="sign-up">
    <p>Let's create a new account !</p>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="signUp">Sign Up</button>
    <span>or go back to <router-link to="/login">login</router-link>.</span>
  </div>
</template>

 <script>
  import firebase from 'firebase';
  import axios from 'axios';

  export default {
    name: 'signUp',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp: function() {
        // axios.post('https://us-central1-cartaroom-3f36f.cloudfunctions.net/addUser',{email: this.email, password: this.password}).then(
        //   function(response){
        //     console.log(response);
        //   }
        // ).catch(function(error){
        //   console.log(error);
        // });
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            firebase.database().ref('users').push({email: this.email, edit: false})
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