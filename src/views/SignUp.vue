<template>
<div class="sign-up">
    <div class="sign_up">
        <p id="sign_up">Create Your CartaRoom Account</p>
        <div class="search_body">
            <div class="accType">
                <p class="signtext">Choose the Type of Account <i class="fas fa-info-circle" style="color:white"></i></p>
                <button class="sign_button_a" id="host" name="accType" v-bind:value="true" v-on:click="credentials.isHost = true; info();">Host</button>
                <button class="sign_button_b" id="patron" name="accType" v-bind:value="false"  v-on:click="credentials.isHost = false; info();">Patron</button>
            </div>

            <div class="personalInfo">
                <p class="signtext">Personal Information</p>
                <input class="sign_input_half" v-model="credentials.firstName" placeholder="first name">
                <input class="sign_input_half" v-model="credentials.lastName" placeholder="last name">
                <input class="sign_input" v-model="credentials.phone" placeholder="phone">
                <input class="sign_input" type="email" v-model="credentials.email" placeholder="email">
                <input class="sign_input" type="password" v-model="credentials.password" placeholder="password">
                <input class="sign_input" type="password" v-model="credentials.password" placeholder="confirm password">
            </div>

                <!-- patron info -->
                <div class="overlay_div" id="overlay_div_b">
                    <p class="signtext">Patron Information</p>
                    <select class="sign_input_half" v-model="patronCredentials.selected">
                    <option>Student</option>
                    <option>Employed</option>
                    <option>Entrepreneur</option>
                </select>
                </div>

                <!-- business info -->
                <div class="overlay_div" id="overlay_div_a">
                    <p class="signtext">Business Inforation</p>
                    <input class="sign_input" v-model="hostCredentials.name" placeholder="business name">
                    <input class="sign_input" v-model="hostCredentials.address" placeholder="business address">
                    <input class="sign_input" v-model="hostCredentials.phone" placeholder="business phone">
                    <select class="sign_input_half" v-model="hostCredentials.selected" >
                    <option>Coffee Shop</option>
                    <option>Library</option>
                    <option>Community Centre</option>
                </select>
                    <!-- <span>Selected: {{ hostCredentials.selected }}</span> -->
                </div>
                <div class="signUpButtom">
                    <button class="progressive" @click="signUp">Sign Up</button>
                </div>
            </div>
            <div class="goBackToLogin">
                <span>
                    go back to 
                    <router-link to="/login">login</router-link>
                </span>
            </div>
        </div>
        <img class="background" src="../assets/banner/SignUp.jpg"/>

</div>
</template>

<script>
import firebase from 'firebase';
var setAccType = firebase.functions().httpsCallable('setAccType');
var addPatron = firebase.functions().httpsCallable('addPatron');
var addHost = firebase.functions().httpsCallable('addHost');

export default {
    head: {
        script: [{
            src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
        }, ]
    },
    name: 'signUp',
    data: function () {
        return {
            hostCredentials: {
                name: '',
                address: '',
                phone: '',
                selected: []
            },
            patronCredentials: {
                selected: []
            },
            credentials: {
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
        signUp: function () {
            if (this.credentials.firstName == '' || this.credentials.lastName == '' || this.credentials.phone == '' || this.credentials.email == '' || this.credentials.password == '') {
                alert('Missing part of PERSONAL information')
            } else if (this.credentials.isHost && (this.hostCredentials.name == '' || this.hostCredentials.address == '' || this.hostCredentials.phone == '' || this.hostCredentials.selected.length == 0)) {
                alert('Missing part of HOST information')
            } else if (!this.credentials.isHost && this.patronCredentials.selected.length == 0) {
                alert('Missing part of PATRON information')
            } else {
                firebase.auth().createUserWithEmailAndPassword(this.credentials.email, this.credentials.password).then(
                    () => {
                        setAccType({
                            isHost: this.credentials.isHost
                        });
                        if (this.credentials.isHost) {
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
            }
        },

        //<div class="overlay_div" id="overlay_div_a">
        info: function () {
            $("#patron, #host").click(function () {
                $('.overlay_div').hide();
                var classname = $(this).attr('class');
                switch (classname) {
                    case "sign_button_a":
                        $(this).css('background', 'black');
                        $(this).css('color', 'white');
                        $('#patron').css('background', 'white');
                        $('#patron').css('color', 'lightgray');
                        $('#overlay_div_a').show();
                        break;
                    case "sign_button_b":
                        $(this).css('background', 'black');
                        $(this).css('color', 'white');
                        $('#host').css('background', 'white');
                        $('#host').css('color', 'lightgray');
                        $('#overlay_div_b').show();
                        break;
                }
            });
        }
    }
}
</script>

<style scoped>
#overlay_div_a {
    display: none;
}

.background {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}

.sign-up {
    margin-top: 0px;
    margin-left: 160px;
}

.search_body {
    width: 600px;
    text-align: left;
    background: rgba(218, 229, 227, 0.9);
    /* height: 1460px; */
    /* 1015px for patrons*/
    /* 1342px for hosts*/
}



#sign_up {
    font-family: Rajdhani;
    font-style: normal;
    font-weight: 600;
    font-size: 60px;
    width: 1493px;
    line-height: 153px;
    text-align: left;
    margin-top: 0px;
    margin-bottom: 0px;
}

.sign_button_a {
    width: 120px;

    left: 271px;
    top: 706px;
    margin-left: 120px;
    background: #FFFFFF;
    border-radius: 35px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 42px;
    text-align: center;
    color: #000000;
}

.sign_button_b {
    width: 120px;
    left: 271px;
    top: 706px;
    margin-left: 120px;
    background: #FFFFFF;
    border-radius: 35px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 42px;
    text-align: center;
    color: #000000;
}

.progressive {
    width: 140px;

    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 35px;
    text-align: center;
    /* float: right; */
    margin: 65px 30px;
    color: #000000;
    background: #FFFFFF;
    border-radius: 15px;
    margin-top: 0px;
    margin-bottom: 25px;
    margin-right: 45px;
}

.goBackToLogin {
    text-align: left;
    padding-left: 17%;
}

.signUpButtom {
    text-align: right;
}

.goBackToLogin{
    text-align:left;
    padding-left: 17%;
}
.signUpButtom {
    text-align:right;
}
.signtext {
    margin-left: 45px;
    padding-top: 25px;
    margin-bottom: 0px;
    margin-top: 0px;
    padding-bottom: 25px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 42px;
    color: #000000;
}

.sign_input {
    width: 509.5px;
    height: 45px;
    padding-left: 24px;
    background: #FFFFFF;
    border: 0.25px solid #000000;
    box-sizing: border-box;
    margin-top: 25px;
    border-radius: 10px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    margin: 10px 45px;
}

.sign_input_half {
    width: 232px;
    height: 45px;
    background: #FFFFFF;
    border: 0.25px solid #000000;
    padding-left: 24px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    /*
    margin: 10px 45px;
    */
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 45px;
    line-height: 35px;
    box-sizing: border-box;
    border-radius: 10px;
}

::placeholder {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 35px;
    color: #828282;
}

:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 35px;
    color: #828282;
}

::-ms-input-placeholder {
    /* Microsoft Edge */
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 35px;
    color: #828282;
}
</style>
