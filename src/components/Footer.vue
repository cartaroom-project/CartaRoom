<template>
<div class="footer">
    <div class="row">
        <div class="column" id="icon">
            <a href = "https://www.facebook.com/CartaRoom/">
  	                <i class='fab fa-facebook'></i>
                </a>
            <a href = "https://www.instagram.com/meet.potatum">
  	                <i class='fab fa-instagram'></i>
                </a>
            <a href = "https://www.linkedin.com/company/cartaroom/">
                	<i class='fab fa-linkedin-in'></i>
                </a>
            <br>
            <a href = "mailto: contactpotatum.com">contactpotatum.com</a>
        </div>

        <div class="column">
            <img v-on:dblclick="easterEgg" src="https://drive.google.com/uc?export=view&id=1rxtg9V33m6s0IY4l3crjZaMEjRFSUgz9" style="width: 200px; height: 50px;">
            <p id="since">since 2000</p>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: "Footer",
    methods: {
        easterEgg: function () {
            window.open('https://www.nerdtests.com/mq/testimages/167138_5eac1357f32b04d5a131.jpg', '_blank');
        }
    }
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
    .footer {
        padding-top: 6.5%;
    }
</style>