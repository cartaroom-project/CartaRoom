<template>
<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.7.0/css/all.css' integrity='sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ' crossorigin='anonymous'>

</head>

<body>
    <div class="footer">
        <div class="row">
            <div class="column" id="icon">
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

            <div class="column">
                <img src="https://drive.google.com/uc?export=view&id=1rxtg9V33m6s0IY4l3crjZaMEjRFSUgz9" style="width: 200px; height: 50px;">
                <p id="since">since 2000</p>
            </div>
        </div>
    </div>
</body>

</html>
</template>

<script>
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
    text-align: right;
    width: 50%;
    padding: 10px;
    height: 90px;
    background-color: black;
}

#icon {
    text-align: left;
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

i {
    padding-right: 15px;
}

</style>
