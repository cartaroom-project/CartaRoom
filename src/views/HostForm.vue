<template>
  <div class="HostForm">
    <p>This is Host Form!</p>

    <label>Premium</label>
    <input type="checkbox" value="premium" v-model="credentials.ispremium"/> <br><br>
    <input  type="text" placeholder="Full name" v-validate="'required|min:3'" v-model="credentials.fullName"> <br>
    <input  type="text" placeholder="Business Address" v-model="credentials.businessAddress"> <br>
    <input  type="text" placeholder="Email" v-model="credentials.email"> <br>
    <input  type="text" placeholder="Phone Number" v-model="credentials.phoneNumber"> <br> 
    <button @click="register">Register</button>
  </div>
</template>

 <script>
 import firebase from 'firebase';
  var HostFormFunction = firebase.functions().httpsCallable('HostFormFunction');

 export default {
     name: 'register',
     data() {
     return {
         credentials:
             {
                 ispremium: '',
                 fullName: '',
                 businessAddress: '',
                 email: '',
                 phoneNumber: ''
             }
     }
   },
    methods: {
        register: function() {
            console.log("entered host form function");
            
              let b = {ispremium: this.credentials.ispremium, 
                              fullName: this.credentials.fullName,
                              businessAddress: this.credentials.businessAddress,
                              email: this.credentials.email,
                              phoneNumber: this.credentials.phoneNumber
                              };
                              console.log(b);
            HostFormFunction({ispremium: this.credentials.ispremium, 
                              fullName: this.credentials.fullName,
                              businessAddress: this.credentials.businessAddress,
                              email: this.credentials.email,
                              phoneNumber: this.credentials.phoneNumber
                              })
            console.log("ant man")
            this.$router.replace('about')
            
        }
    }
}

</script>

 <style scoped>
  .HostForm {
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
  </style>