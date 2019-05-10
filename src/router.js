import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/host/Home';
import AddRoom from '@/views/host/AddRoom';
import EditRoom from '@/views/host/EditRoom';
import CurrentBookings from '@/views/host/CurrentBookings';
import AllBookings from '@/views/host/AllBookings';
import AllCustomers from '@/views/host/AllCustomers';
import RoomViewHost from '@/views/host/RoomViewHost';

import Login from '@/views/Login';
import SignUp from '@/views/SignUp';
import About from '@/views/About';

import Search from '@/views/Search';
import Results from '@/views/Results';
import CurrentBookingsPatron from '@/views/patron/CurrentBookingsPatron';
import AllBookingsPatron from '@/views/patron/AllBookingsPatron';
import RoomViewPatron from '@/views/patron/RoomViewPatron';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/search'
    },
    {
      path: '/',
      redirect: '/search'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/addRoom',
      name: 'AddRoom',
      component: AddRoom,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/editRoom/:id',
      name: 'EditRoom',
      component: EditRoom,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/currentBookings',
      name: 'CurrentBookings',
      component: CurrentBookings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/allBookings',
      name: 'AllBookings',
      component: AllBookings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/allCustomers',
      name: 'AllCustomers',
      component: AllCustomers,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/roomViewHost/:id',
      name: 'RoomViewHost',
      component: RoomViewHost,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
    },
    {
      path: '/results/:criteria',
      name: 'Results',
      component: Results,
    },
    {
      path: '/currentBookingsPatron',
      name: 'CurrentBookingsPatron',
      component: CurrentBookingsPatron,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/allBookingsPatron',
      name: 'AllBookingsPatron',
      component: AllBookingsPatron,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/roomViewPatron/:id',
      name: 'RoomViewPatron',
      component: RoomViewPatron,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next('login');
    //else if (!requiresAuth && currentUser) next('home');
    else next();
});

export default router;
