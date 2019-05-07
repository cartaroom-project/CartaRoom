<template>
    <div class="search">
        <h1>Reserve a Room</h1>
		<input type="text" placeholder="Location">
		<button @click="search">Search</button>
       <Recommended></Recommended>
    </div>
</template>

<script>

  import Recommended from "../components/Recommended";
  export default {
    name: 'search',
      components: {Recommended},
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
