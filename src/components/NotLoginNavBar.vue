<template>
<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">

</head>

<body>

    <div class="header">

            <a class="logo">
                <img src="../assets/Final_CartaRoom.png">
            </a>
        <div class="header-right">
            <router-link to="/login"><button class="navButtons">LOGIN</button></router-link>
            <router-link to="/sign-up"><button class="navButtons">SIGN UP</button></router-link>
        </div>
    </div>
</body>

</html>
</template>


<script>
export default {
    name: "NotLoginNavBar"
}

</script>

<style scoped>

* {box-sizing: border-box;}

body { 
  margin: 0;
}

.header {
  overflow: hidden;
  padding: 20px 10px;
  text-align: left;
}

.header a {
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px; 
  line-height: 25px;
  border-radius: 4px;
}

.header a.logo {
  font-size: 25px;
  font-weight: bold;
}

.header a.active {
  background-color: dodgerblue;
  color: white;
}

.header-right {
  float: right;
  padding-top: 10px;
}

img {
  width: 20%;
  height: auto;
}

    .navButtons {
        background: rgba(47, 69, 80, 1);
        border: 1px solid #828282;
        margin-left: 20px;
        height: 35px;
        width: 90px;

        box-sizing: border-box;
        border-radius: 10px;
        color: white;

        font-family: Roboto;
        font-weight: normal;
        font-size: 16px;
        text-align: center;
    }

@media screen and (max-width: 500px) {
  .header a {
    float: none;
    display: block;
    text-align: left;
  }
  
  .header-right {
    float: none;
  }
}
</style>
