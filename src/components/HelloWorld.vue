<template>
  <div class="hello">
    <h1>List of users</h1>
    <ul>
      <li v-for="userEmail of users"> {{userEmail.email}}</li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
