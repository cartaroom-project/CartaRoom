<template>
    <div class="login">
        <h3>Sign In</h3>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button @click="login">Login</button>
        <p>You don't have an account ? You can <router-link to="/sign-up">create one</router-link></p>
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
                    () => {
                        firebase.auth().currentUser.getIdTokenResult()
                            .then((idTokenResult) => {
                                console.log(idTokenResult);
                                // Confirm the user is an Admin.
                                if (idTokenResult.claims.host) {
                                    console.log('logged in as host');
                                    this.$router.replace('home')
                                } else {
                                    console.log('logged in as patron');
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
</style>
