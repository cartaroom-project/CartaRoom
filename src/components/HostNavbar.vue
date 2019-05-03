<template>
    <div id="mySidenav" class="sidenav">
        <router-link to="#">
            <i class='fas fa-plus' style="position: relative">&nbsp;&nbsp;&nbsp;&nbsp;</i>
            <h3 class="NavTitle" style="display: none;">New Room</h3>
        </router-link>
        <br>
        <router-link to="#">
            <i class='fas fa-door-open' style="position: relative">&nbsp;&nbsp;&nbsp;&nbsp;</i>
            <h3 class="NavTitle" style="display: none;">All Rooms</h3>
        </router-link>
        <br>
        <router-link to="#">
            <i class="fas fa-address-book" style="position: relative">&nbsp;&nbsp;&nbsp;&nbsp;</i>
            <h3 class="NavTitle" style="display: none;">Customers</h3>
        </router-link>
        <br>
        <router-link to="#">
            <i class="far fa-chart-bar" style="position: relative">&nbsp;&nbsp;&nbsp;&nbsp;</i>
            <h3 class="NavTitle" style="display: none;">Analytics</h3>
        </router-link>
        <br>
        <router-link to="#">
            <i class="far fa-calendar-alt" style="position: relative"></i>&nbsp;&nbsp;&nbsp;&nbsp;
            <h3 class="NavTitle" style="display: none;">History</h3>
        </router-link>
        <router-link id="bottom" to="#">
            <i class="fas fa-info" style="position: relative;">&nbsp;&nbsp;&nbsp;&nbsp;</i>
            <h3 class="NavTitle" style="display: none;">About</h3>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "HostNavbar"
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

    #   main {
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
