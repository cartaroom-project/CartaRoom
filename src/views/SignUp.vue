<template>
  <div class="sign-up">
    <p>Let's create a new account!</p>


      Picked:{{ credentials.isAdmin }}
      <br>

      <label>Admin</label>
      <input type="checkbox" true-value="true" false-value="false" v-model="credentials.isAdmin">
        <br>
    <input type="text" v-model="credentials.email" placeholder="Email"><br>
    <input type="password" v-model="credentials.password" placeholder="Password">
      <br>
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
          credentials:
              {
                  email: '',
                  password: '',
                  isAdmin: 'false'
              }
      }
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.credentials.email, this.credentials.password).then(
          (user) => {
            firebase.database().ref('users').push({email: this.credentials.email, edit: false, isAdmin:this.credentials.isAdmin})
            this.$router.replace('home')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
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
