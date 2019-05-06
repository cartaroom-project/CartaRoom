<template>
    <div class="sign-up">
        <p>Let's create a new account!</p>
<!--        for testing to see what shows up-->
        Picked:{{ credentials.isHost }}
        <br>

<!--        buttons to switch between account and adds ishost param-->
        <label for="host">Host</label>
        <input id="host" type="radio" name="accType" v-bind:value="true" v-model="credentials.isHost"/>

        <label for="patron">Patron</label>
        <input id="patron" type="radio" name="accType" v-bind:value="false" v-model="credentials.isHost"/>

        <br>
<!--        information for both host and patrons-->
        <p>Let\'s create a new account!</p>
        <p>COMMON INFORMATION</p>
        <input type="email" v-model="credentials.email" placeholder="email"><br>
        <input type="password" v-model="credentials.password" placeholder="password"><br>
        <input type="password" v-model="credentials.password" placeholder=" confirm password"><br>
        <input v-model="credentials.firstName" placeholder="first name">
        <input v-model="credentials.lastName" placeholder="last name"><br>
        <input v-model="credentials.phone" placeholder="phone"><br>

<!--        patron only information-->
        <p>PATRON ONLY INFORMATION</p>
        <select v-model="patronCredentials.selected" multiple>
        <option>Student</option>
        <option>Employed</option>
        <option>Entrepreneur</option>
        </select>

        <span>Selected: {{ patronCredentials.selected }}</span> <br>

        <button @click="signUp">Sign Up</button>

<!--        host only information-->
        <h3>BUSINESSS INFORMATION</h3>
        <input v-model="hostCredentials.name" placeholder="business name">
        <input v-model="hostCredentials.address" placeholder="business address"><br>
        <input v-model="hostCredentials.phone" placeholder="business phone"><br>

        <select v-model="hostCredentials.selected" multiple>
            <option>Coffee Shop</option>
            <option>Library</option>
            <option>Community Centre</option>
        </select>

        <span>Selected: {{ hostCredentials.selected }}</span> <br>

        <button @click="signUp">Sign Up</button>

        <span>or go back to <router-link to="/login">login</router-link>.</span>
    </div>
</template>


 <script>
 import firebase from 'firebase';
 var setAccType = firebase.functions().httpsCallable('setAccType');
 var addPatron = firebase.functions().httpsCallable('addPatron');
 var addHost = firebase.functions().httpsCallable('addHost');

 export default {
     name: 'signUp',
     data: function() {
     return {
         hostCredentials:
             {
                 name: '',
                 address: '',
                 phone: '',
                 selected:[]
             },
         patronCredentials:
             {
                 selected: []
             },
         credentials:
             {
                 firstName: '',
                 lastName: '',
                 phone: '',
                 email: '',
                 password: '',
                 isHost: true,
             }
     }
   },
    methods: {
     signUp: function() {
       firebase.auth().createUserWithEmailAndPassword(this.credentials.email, this.credentials.password).then(
          () => {
              setAccType({isHost: this.credentials.isHost});
              if(this.credentials.isHost)
              {
                  addHost({
                      firstName: this.credentials.firstName,
                      lastName: this.credentials.lastName,
                      email: this.credentials.email,
                      phone: this.credentials.phone,
                      businessName: this.hostCredentials.name,
                      businessAddress: this.hostCredentials.address,
                      businessPhone: this.hostCredentials.phone,
                      businessType: this.hostCredentials.selected
                  });
                  console.log('host')
              } else {
                  addPatron({
                      firstName: this.credentials.firstName,
                      lastName: this.credentials.lastName,
                      email: this.credentials.email,
                      phone: this.credentials.phone,
                      occupation: this.patronCredentials.selected
                  });
                  console.log('patron')
              }
              this.$router.replace('login')
          })

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
