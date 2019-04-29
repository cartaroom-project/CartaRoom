<template>
    <div id="host">
	<h1>Host a Room</h1>
	<button onclick="toggle_visibility('form');">Host a new Room</button>
        <div id="form" style="display:none;">You Hosted new Room</div>
</div>

</template>

<script>
function toggle_visibility(id) {
       var e = document.getElementById(id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
    }
</script>