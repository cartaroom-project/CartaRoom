<template>
  <div id="app">
    <div id="nav">
      <!-- renders view once logged in -->
      <router-link to="/home">Dashboard</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/search">Search</router-link>
      <router-view></router-view>
    </div>
    
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
