<template>
<div class="login">
    <div id="login_body">
        <h3 class="heading">Log In</h3>
         <h3 class="login_label">Email</h3>
        <input class="login_text" type="text" v-model="email" placeholder="Email">
        <h3 class="login_label">Password</h3>
        <input class="login_text" type="password" v-model="password" placeholder="Password" @keyup.enter="login">
      </div>
        <p id="noacc">
            You don't have an account ? You can
            <router-link to="/sign-up">create one</router-link>
        </p>
        <button class="log_final_button" @click="login">Login</button>

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

<style scoped>
  /* "scoped" attribute limit the CSS to this component only */
  .login {
      margin-top: 40px;
  }

  .background {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
  }

  input {
      margin: 5px 0;
      width: 20%;
      padding: 10px;
  }

  button {
      margin-top: 10px;
      width: 10%;
      cursor: pointer;
  }

  p {
      margin-top: 20px;
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
      font-size: 20px;
      line-height: 28px;
      /* identical to box height */
      padding-left: 20px;
      text-align: left;
      color: #FFFFFF;
  }

  /* CSS for the Login pages */
  .login_text {
      width: 380px;
      height: 35px;
      background: #FFFFFF;
      border: 0.25px solid #000000;
      box-sizing: border-box;
      border-radius: 10px;
      padding-left: 20px;
      font-family: Roboto;
      font-style: normal;
      font-weight: 300;
      font-size: 15px;
      line-height: 29px;
      color: #000000;
      float: inherit;
  }

  .log_final_button {
      width: 127px;
      height: 40px;
      background: #000000;
      margin-right: 25%;
      border-radius: 15px;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 35px;
      text-align: center;
      color: #FFFFFF;
  }

  #login_body {
      background: rgba(0, 0, 0, 0.54);
      width: 400px;
      height: 295px;
      margin-left: 242px;
      top: 200px;
      border-radius: 15px;
  }

  .heading {
        text-align:left;
      padding-top: 10px;
      padding-left: 20px;
      font-family: "Rajdhani";
      font-size: 26px;
      color: #ffffff;
  }
    
    h3{
        margin-bottom: 0px;
    }

    #noacc {
        padding-right: 45%;
    }

</style>
