<template>
<div id="mySidenav" class="sidenav">
    <body>
        <div class="row">
            <div class="column">
                <a href = "https://www.google.com/">
  	<i class='fab fa-facebook'></i>
  </a>
                <a href = "https://www.google.com/">
  	<i class='fab fa-instagram'></i>
  </a>
                <a href = "https://www.google.com/">
  	<i class='fab fa-linkedin-in'></i>
  </a>
                <br>
                <a href = "mailto: contactpotatum.com">contactpotatum.com</a>
            </div>
            <div class="column" style="text-align: right;">
                <img src="https://drive.google.com/uc?export=view&id=1rxtg9V33m6s0IY4l3crjZaMEjRFSUgz9" style="width: 200px; height: 50px;">
                <p id="since">since 2000</p>
            </div>
        </div>
    </body>
</div>
</template>



<script>
//import RecommendedItem from "./RecommendedItem";
export default {
    name: "Footer"
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

/* Create three equal columns that floats next to each other */
.column {
    float: left;

    width: 50%;
    padding: 10px;
    height: 90px;
    background-color: black;
}

/* Clear floats after the columns */
.row:after {
    content: "";
    display: table;
    clear: both;
}

.fab {
    color: white;
    font-size: 50px;
}

a {
    text-decoration: none;
    color: white;
}

#since {
    margin-top: -5px;
    margin-bottom: 0px;
    color: white;
    font-size: 16px;
}
</style>