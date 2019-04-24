<template>
  <div class="login">
  <h3>Login</h3>
    <input type="text" placeholder="Email"><br>
    <input type="password" placeholder="Password"><br>
    <button @click="login">Login!</button>
  </div>
</template>

<script>
export default {
  name: 'signUp',
  data(){
    return {};
  },
  methods: {
    login: function() {
      this.$router.replace('home');
    }
  }
}
</script>
