<template>
 <div class="sign-up">
   <p>Let's create a new account!</p>


     Picked:{{ credentials.isHost }}
     <br>
     <label for="host">Host</label>
     <input id="host" type="radio" name="accType" v-bind:value="true" v-model="credentials.isHost"/>

     <label for="patron">Patron</label>
     <input id="patron" type="radio" name="accType" v-bind:value="false" v-model="credentials.isHost"/>

       <br>
   <input type="email" v-model="credentials.email" placeholder="Email"><br>
   <input type="password" v-model="credentials.password" placeholder="Password">
     <br>
   <button @click="signUp">Sign Up</button>
   <span>or go back to <router-link to="/login">login</router-link>.</span>
 </div>
</template>


 <script>
 import firebase from 'firebase';
 var SetAccType = firebase.functions().httpsCallable('SetAccType');

 export default {
     name: 'signUp',
     data() {
     return {
         credentials:
             {
                 email: '',
                 password: '',
                 isHost: true
             }
     }
   },
    methods: {
     signUp: function() {
       firebase.auth().createUserWithEmailAndPassword(this.credentials.email, this.credentials.password).then(
          (user) => {
          SetAccType({isHost: this.credentials.isHost})
          this.$router.replace('login')

        // Logging in after sign up
      //   firebase.auth().signInWithEmailAndPassword(this.credentials.email, this.credentials.password).then(
      //     firebase.auth().currentUser.getIdTokenResult()
      //       .then((idTokenResult) => {
      //         console.log(idTokenResult)
      //         // Confirm the user is an Admin.
      //         if (idTokenResult.claims.host) {
      //           this.$router.replace('home')
      //         } else {
      //           this.$router.replace('search')
      //         }
      //       })
      //       .catch((error) => {
      //         console.log(error)
      //       })
      // )

           });
     }

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
