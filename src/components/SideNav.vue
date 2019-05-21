<template>
    <div id="mySidenav" class="sidenav">
        <router-link to="/home">
            <i class='fas fa-door-open' style="position: relative">&nbsp;&nbsp;&nbsp;&nbsp;</i>
            <h3 class="NavTitle" style="display: none;">View All Rooms</h3>
        </router-link>
        <br>
        <router-link to="/addRoom">
            <i class='fas fa-plus' style="position: relative">&nbsp;&nbsp;&nbsp;&nbsp;</i>
            <h3 class="NavTitle" style="display: none;">Add room</h3>
        </router-link>
        <br>
        <router-link to="/currentBookings">
            <i class="fas fa-concierge-bell" style="position: relative">&nbsp;&nbsp;&nbsp;&nbsp;</i>
            <h3 class="NavTitle" style="display: none;">Current Bookings</h3>
        </router-link>
        <br>
        <router-link to="/allBookings">
            <i class="fas fa-user-clock" style="position: relative">&nbsp;&nbsp;&nbsp;&nbsp;</i>
            <h3 class="NavTitle" style="display: none;">All Bookings</h3>
        </router-link>
        <br>
        <router-link to="/allCustomers">
            <i class="fas fa-address-book" style="position: relative"></i>&nbsp;&nbsp;&nbsp;&nbsp;
            <h3 class="NavTitle" style="display: none;">Customer Database</h3>
        </router-link>
        <br>
<!--        <router-link to="/Search">-->
<!--            <i class="fas fa-search" style="position: relative"></i>&nbsp;&nbsp;&nbsp;&nbsp;-->
<!--            <h3 class="NavTitle" style="display: none;">Customer Database</h3>-->
<!--        </router-link>-->
        <router-link id ="bottom" to="/about">
            <i class="fas fa-info" style="position: relative;">&nbsp;&nbsp;&nbsp;&nbsp;</i>
            <h3 class="NavTitle" style="display: none;">About</h3>
        </router-link>
    </div>
</template>

<style scoped>
/* Testing for the side bar nav */

/* The side navigation menu */
.sidenav {
  height: 100%; /* 100% Full-height */
  width: 95px; /* 0 width - change this with JavaScript */
  position: relative; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  /* bottom: 70%; Stay at the bottom */
  left: 0;
  background-color: #111; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  overflow-y: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  
}

/* The navigation menu links */
.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  color: #f1f1f1;
}


/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#main {
  transition: margin-left .5s;
  padding: 20px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}



/* Nav Bar Stuff */
.NavTitle{
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 25px;
position: relative;
line-height: 29px;
}

#bottom{
    padding-top: 500px;
    position: relative;
}
</style>
