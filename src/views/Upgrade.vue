<template>
<div class="upgrade">
    <div class="banner">
        <h1>Upgrade to Premium</h1>
    </div>
    <div class="row">
        <div class="column">
            <h3>Free plan</h3>
            <ul>Host a single Room</ul>
        </div>
        <div class="column">
            <h3>Premium Plan</h3>
            <ul>Host Multiple Rooms</ul>
            <ul>View Analytics</ul>
            <ul>Premium Listings</ul>
            <ul>Sponsored Ads</ul>
            <button>Upgrade Now</button>
        </div>
    </div>
</div>
</template>

<style scoped>
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
