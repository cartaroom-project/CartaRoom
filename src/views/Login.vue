<template>
<div class="login">
    <div id="login_modal">
        <div id="loginBody">
            <h3 class="heading">Log into your CartaRoom Account</h3>
            <h3 class="login_label">Please Enter Your Email</h3>
            <input class="login_text" type="text" v-model="email" placeholder="email">
            <h3 class="login_label">Password</h3>
            <input class="login_text" type="password" v-model="password" placeholder="password" @keyup.enter="login">
        </div>

        <div id="loginNoAcc">
            <p>
                Don't have an account? You can
                <router-link to="/sign-up">create one</router-link>
                here.
            </p>
        </div>

        <div id="loginButton">
            <button class="log_final_button" @click="login">Login</button>
        </div>
    </div>

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
    #loginBody {
        border:2px solid red;
        background: rgba(0, 0, 0, 0.54);
        width: 25vw;
        border-radius: 10px;
        margin-left:10%;
        padding: 2%;
    }
    #loginNoAcc {
        border:2px solid orange;
    }
    #loginButton {
        bordeR:2px solid yellow;
    }

    #loginButton   button {
        width: 7%;
    }
    #login_modal {
        border: 2px solid black;

    }
  /* "scoped" attribute limit the CSS to this component only */
  .login {
      margin:7% 0;
  }

  .background {
      width: 100vw;
      height: 100vh;
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


  p {
      text-align: left;
      padding-left: 10vw;
      font-size: 16px;
  }

  p a {
      text-decoration: underline;
      color: black;
      cursor: pointer;
  }

  .login_label {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 28px;
      /* identical to box height */
      padding-left: 20px;
      text-align: left;
      color: #FFFFFF;
      padding-top:25px;
  }

  /* CSS for the Login pages */
  .login_text {
      width: 90%;
      height: 35px;
      background: #FFFFFF;
      border: 0.25px solid darkgray;
      box-sizing: border-box;
      border-radius: 5px;
      padding-left: 20px;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
      margin-right: 50%;
      border-radius: 15px;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 35px;
      text-align: center;
      color: #FFFFFF;
  }



  .heading {
      text-align:left;
      font-family: Rajdhani;
      font-size: 1.8em;
      color: #ffffff;
  }

    h3{
        margin-top:0;
        margin-bottom: 0px;
    }

</style>
