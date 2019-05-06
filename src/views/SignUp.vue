<template>
    <div class="sign-up">
        <div class="sign_up">
        <p id="sign_up">Create Your CartaRoom Account</p>
        Picked:{{ credentials.isHost }}
        <br>
            <div class="search_body">
        <p class="signtext">Choose the Type of Account <i class="fas fa-info-circle" style="color:white"></i></p>
        <button class="sign_buttons" id="host" name="accType" v-bind:value="true" v-model="credentials.isHost" v-on:click="credentials.isHost = true">Host</button>

        
        <button class="sign_buttons"id="patron" name="accType" v-bind:value="false" v-model="credentials.isHost" v-on:click="credentials.isHost = false">Patron</button>

        <br>

        <p class="signtext">Personal Information</p>
        <span style="display: inline">
        <input class="sign_input_half" v-model="credentials.firstName" placeholder="first name">
        <input class="sign_input_half" v-model="credentials.lastName" placeholder="last name">        
        </span>
                <input class="sign_input" v-model="credentials.phone" placeholder="phone">
        <input class="sign_input" type="email" v-model="credentials.email" placeholder="email">
        <input class="sign_input" type="password" v-model="credentials.password" placeholder="password">
        <input class="sign_input" type="password" v-model="credentials.password" placeholder="confirm password"><br>
        <br>
        

        <p class="signtext">PATRON INFORMATION</p>
        <select class="sign_input_half" v-model="patronCredentials.selected">
        <option>Student</option>
        <option>Employed</option>
        <option>Entrepreneur</option>
        </select>
<br>
        <span>Selected: {{ patronCredentials.selected }}</span> <br>

        <button class="progressive" @click="signUp">Sign Up</button>
<br>
<br>
<br>
<br>
<br>
        <p class="signtext">BUSINESSS INFORMATION</p>
        <input class="sign_input" v-model="hostCredentials.name" placeholder="business name">
        <input class="sign_input" v-model="hostCredentials.address" placeholder="business address"><br>
        <input class="sign_input" v-model="hostCredentials.phone" placeholder="business phone"><br>
                <br><br>

        <select class="sign_input_half" v-model="hostCredentials.selected" >
            <option>Coffee Shop</option>
            <option>Library</option>
            <option>Community Centre</option>
        </select>

        <span>Selected: {{ hostCredentials.selected }}</span> <br>

        <button class="progressive" @click="signUp">Sign Up</button>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
            </div>
        </div>
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
          (user) => {
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
margin-left: 160px;
  }

 
.search_body {
	width: 961px;
	background: rgba(218, 229, 227, 0.9);

    /* 1015px for patrons*/
    /* 1342px for hosts*/ 
}

.column {
	float: center;
	width: 50%;
}

#sign_up {
	font-family: Rajdhani;
	font-style: normal;
	font-weight: 600;
	font-size: 120px;
	width: 1493px;
	line-height: 153px;
}

.sign_buttons {
	width: 241px;
	height: 70px;
	left: 271px;
	top: 706px;
	margin-left: 155px;
	background: #FFFFFF;
	border-radius: 35px;
	font-family: Roboto;
	font-style: normal;
	font-weight: normal;
	font-size: 36px;
	line-height: 42px;
	text-align: center;
	color: #000000;
}

.progressive {
	width: 227px;
	height: 64px;
	font-family: Roboto;
	font-style: normal;
	font-weight: normal;
	font-size: 30px;
	line-height: 35px;
	text-align: center;
	float: right;
	margin: 65px 30px;
	color: #000000;
	background: #FFFFFF;
	border-radius: 15px;
}

.signtext {
	padding-left: 65px;
	padding-top: 25px;
	padding-bottom: 25px;
	font-family: Roboto;
	font-style: normal;
	font-weight: normal;
	font-size: 36px;
	line-height: 42px;
	color: #000000;
}

.sign_input {
	width: 865px;
	height: 57px;
	padding-left: 24px;
	background: #FFFFFF;
	border: 0.25px solid #000000;
	box-sizing: border-box;
	margin-top: 25px;
	border-radius: 10px;
	font-family: Roboto;
	font-style: normal;
	font-weight: 300;
	font-size: 30px;
}

.sign_input_half {
	width: 383px;
	height: 57px;
	background: #FFFFFF;
	border: 0.25px solid #000000;
	padding-left: 24px;
	font-family: Roboto;
	margin: 0 55px;
	margin-left: 42px;
	font-style: normal;
	font-weight: 300;
	font-size: 30px;
	line-height: 35px;
	box-sizing: border-box;
	border-radius: 10px;
}

 ::placeholder {
	font-family: Roboto;
	font-style: normal;
	font-weight: 300;
	font-size: 30px;
	line-height: 35px;
	color: #828282;
}

:-ms-input-placeholder {
	/* Internet Explorer 10-11 */
	font-family: Roboto;
	font-style: normal;
	font-weight: 300;
	font-size: 30px;
	line-height: 35px;
	color: #828282;
}

::-ms-input-placeholder {
	/* Microsoft Edge */
	font-family: Roboto;
	font-style: normal;
	font-weight: 300;
	font-size: 30px;
	line-height: 35px;
	color: #828282;
}     

</style>
