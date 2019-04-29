<template>
   <div id="search">
        <h1>Reserve a Room</h1>
        <form>
		Location: <input type= "text">
		<button type="button" value="Submit" onclick="ClickMe()">Search</button>
		<p id="Search"></p>
		</form>
    </div>
</template>

<script>
function ClickMe() {
	document.getElementById("Search").innerHTML = "Searching";
	}
</script>