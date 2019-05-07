<template>
    <div class="search">
        <h1>Reserve a Room(Patron Home Page)</h1>
		<input type="text" v-model="criteria" placeholder="Location">
		<button @click="search()">Search</button>
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
            criteria: 'hello'
      }
    },
	methods: {
	search: function(){	
      this.$router.push({
        name: 'Results',
        params: { criteria: this.criteria }
      })
		},
	}
  }

</script>
