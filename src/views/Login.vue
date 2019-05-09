<template>
   <div class="login">
      <div id="login_body">
         <h3     class="heading">Log In</h3>
         <br>
         <br>
         <br>
         <br>
         <h3 class="login_label">Email</h3>
         <input class="login_text"type="text" v-model="email" placeholder="Email"><br>
         <h3 class="login_label">Password</h3>
         <input class="login_text" type="password" v-model="password" placeholder="Password"><br>
      </div>
      <button class="log_final_button" @click="login">Login</button>
      <p>
         You don't have an account ? You can 
         <router-link to="/sign-up">create one</router-link>
      </p>
      <img class="background" src="../assets/banner/LoginV2.png"/>
   </div>
</template>
<script>
   import firebase from 'firebase';
   
   export default {
       name: 'login',
       data() {
           return {
               email: '',
               password: ''
           }
       },
       methods: {
           login: function () {
               firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                   (user) => {
                       firebase.auth().currentUser.getIdTokenResult()
                           .then((idTokenResult) => {
                               console.log(idTokenResult);
                               // Confirm the user is an Admin.
                               if (idTokenResult.claims.host) {
                                   this.$router.replace('home')
                               } else {
                                   this.$router.replace('search')
                               }
                           })
                           .catch((error) => {
                               console.log(error)
                           })
                   },
                   function (err) {
                       alert('Oops: ' + err.message)
                   }
               )
           }
       }
   }
</script>
<style scoped>  /* "scoped" attribute limit the CSS to this component only */
   .login {
   margin-top: 40px;
   }
   .background{
   width: 100%;
   height: 100%;
   position: fixed;
   top: 0;
   left: 0;
   z-index: -1;
   }
   input {
   margin: 10px 0;
   width: 20%;
   padding: 15px;
   }
   button {
   margin-top: 20px;
   width: 10%;
   cursor: pointer;
   }
   p {
   margin-top: 40px;
   font-size: 13px;
   }
   p a {
   text-decoration: underline;
   cursor: pointer;
   }
   .login_label {
   font-family: Roboto;
   font-style: normal;
   font-weight: normal;
   font-size: 24px;
   line-height: 28px;
   /* identical to box height */
   padding-left: 45px;
   text-align: left;
   color: #FFFFFF;
   }
   /* CSS for the Login pages */
   .login_text {
   width: 492px;
   height: 47.33px;
   background: #FFFFFF;
   border: 0.25px solid #000000;
   box-sizing: border-box;
   border-radius: 10px;
   padding-left: 20px;
   font-family: Roboto;
   font-style: normal;
   font-weight: 300;
   font-size: 25px;
   line-height: 29px;
   color: #000000;
   float: inherit;
   }
   .log_final_button {
   width: 227px;
   height: 64px;
   background: #000000;
   margin-top: 32px;
   border-radius: 15px;
   font-family: Roboto;
   font-style: normal;
   font-weight: normal;
   font-size: 30px;
   line-height: 35px;
   text-align: center;
   color: #FFFFFF;
   }
   #login_body {
   background: rgba(0, 0, 0, 0.54);
   width: 560px;
   height: 411px;
   margin-left: 242px;
   top: 233px;
   border-radius: 15px;
   }
   .heading {
   position: absolute;
   padding-left: 25px;
   font-family: "Rajdhani";
   font-size: 36px;
   color: #ffffff;
   }
   #app {
   min-height: 100%;
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
   background: url('https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2236&q=80') no-repeat center center fixed;
   -webkit-background-size: cover;
   -moz-background-size: cover;
   -o-background-size: cover;
   background-size: cover;
   /* background-image: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url('https://images.unsplash.com/photo-1550596334-7bb40a71b6bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'); */
   }
</style>