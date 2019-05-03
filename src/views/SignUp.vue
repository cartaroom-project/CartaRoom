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

        <button @click="current='patronComponent'">Patron</button><p></p>
        <button @click="current='hostComponent'">Host</button><p></p>
        <component :is="current"></component>
        <br>

        <p>Let\'s create a new Patron account!</p>
        <input type="email" v-model="credentials.email" placeholder="email"><br>
        <input type="password" v-model="credentials.password" placeholder="password"><br>
        <input type="password" v-model="credentials.password" placeholder=" confirm password"><br>
        <input v-model="credentials.firstName" placeholder="first name">
        <input v-model="credentials.lastName" placeholder="last name"><br>
        <input v-model="credentials.phone" placeholder="(604) 123 - 4567"><br>

        <select v-model="credentials.selected" multiple>
        <option>Student</option>
        <option>Employed</option>
        <option>Entrepreneur</option>
    </select>

        <span>Selected: {{ credentials.selected }}</span> <br>



        <button @click="signUp">Sign Up</button>
        <span>or go back to <router-link to="/login">login</router-link>.</span>
    </div>
</template>


 <script>
 import firebase from 'firebase';
 var SetAccType = firebase.functions().httpsCallable('SetAccType');

 export default {
     name: 'signUp',
     data: function() {
     return {
         current: 'hostComponent',
         credentials:
             {
                 firstName: '',
                 lastName: '',
                 phone: '',
                 email: '',
                 password: '',
                 isHost: true,
                 selected: ''

             }
     }
   },
    methods: {
     signUp: function() {
       firebase.auth().createUserWithEmailAndPassword(this.credentials.email, this.credentials.password).then(
          (user) => {
              SetAccType({isHost: this.credentials.isHost});

              // firebase.database().ref('users/patrons').push({
              //     email: this.credentials.email,
              //     firstName:this.credentials.firstName,
              //     lastName:this.credentials.lastName,
              //     host:this.credentials.isHost,
              //     selected:this.credentials.selected,
              // })
              // console.log("passed db");
              //
          }).then()
         {
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

           }
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
