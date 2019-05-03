<template>
    <div id="mySidenav" class="sidenav">
        <a href="#">
            <i class='fas fa-search' style="position: relative">&nbsp;&nbsp;&nbsp;&nbsp;</i>
            <h3 class="NavTitle" style="display: none;">Search</h3>
        </a>
        <br>
        <a href="#">
            <i class='fas fa-door-open' style="position: relative">&nbsp;&nbsp;&nbsp;</i>
            <h3 class="NavTitle" style="display: none;">Your Bookings</h3>
        </a>
        <br>
        <a href="#">
            <i class="    far fa-calendar-alt" style="position: relative">&nbsp;&nbsp;&nbsp;&nbsp;</i>
            <h3 class="NavTitle" style="display: none;">All Bookings</h3>
        </a>
        <br>
        <a id="bottom" href="#">
            <i class="fas fa-info" style="position: relative;">&nbsp;&nbsp;&nbsp;&nbsp;</i>
            <h3 class="NavTitle" style="display: none;">About</h3>
        </a>
    </div>
</template>

<script>
    export default {
        name: "PatronNavbar"
    }
</script>

<style scoped>
    .sidenav {
        height: 100%;
        width: 95px;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: #111;
        overflow-x: hidden;
        padding-top: 60px;

    }

    .sidenav a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: #818181;
        display: block;
        transition: 0.3s;
    }

    .sidenav a:hover {
        color: #f1f1f1;
    }

    #main {
        transition: margin-left .5s;
        padding: 20px;
    }

    @media screen and (max-height: 450px) {
        .sidenav {
            padding-top: 15px;
        }

        .sidenav a {
            font-size: 18px;
        }
    }

    .NavTitle {
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 22px;
        position: relative;
        line-height: 29px;
    }

    #bottom {
        padding-top: 500px;
        position: relative;
    }

    .column {
        float: left;
        width: 50%;
    }

    .row:after {
        content: "";
        display: table;
        clear: both;
    }

</style>
