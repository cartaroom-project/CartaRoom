<template>


<div class="row">
  <div class="column">
   <img src="../assets/search.png">
    <h2>Search</h2>
    <p>Find the best room for your needs at the most convieneit, simple, effiecnt, fast, easy, clean, modern, pleasent, sleek, colourful, mobile, and amazing web service. Yeah, exactly what I said. </p>
  </div>
  
  <div class="column">
     <img src="../assets/verifiability.png">
    <h2>Verifiability</h2>
    <p>A proposal or claim of early logical positivists according to which a requirement or criterion for the meaningfulness of a factual statement is its susceptibility to the possibility of being either theoretically or actually proved true or false by reference to empirical facts</p>
  </div>
  
  <div class="column">
     <img src="../assets/secure.png">
    <h2>Secure</h2>
    <p>We keep all of your information “safe” and away from the public eye. We all so keep your rooms insured incase of any damages cause to your room or building. We are Secure. Yeah.... I don’t know what else to write but because we need something here that is not randomly generated... here you go!</p>
  </div>
</div>

</template>

<script>
export default {
    name: "WhyCartaRoom"
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* Create three equal columns that floats next to each other */
.column {
  float: left;
  width: 33.33%;
  padding: 10px;
  height: 300px; /* Should be removed. Only for demonstration */
  text-align: center;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

p {
	text-align: left;
    padding-left: 80px;
    padding-right: 80px;
}

h2 {
	text-align: center;
}

img {
	width: 33.33%;
    height: auto;
}

</style>
