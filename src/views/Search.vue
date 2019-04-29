<template>
   <div class="search">
        <h1>Reserve a Room</h1>
		<input type="text" placeholder="Location">
		<button @click="search">Search</button>
    </div>
</template>

<script>
  export default {
    name: 'search',
    data() {
      return {
      }
    },
	methods: {
	search: function(){	
	//document.getElementById("Search").innerHTML = "Searching";
	this.$router.replace('results')
		},
	}
  }
</script>