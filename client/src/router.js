import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'

import AddPost from './components/posts/AddPost'
import Posts from './components/posts/Posts'
import Notification from './components/posts/Notification'

import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'
import Dashboard from './components/auth/Dashboard'
import Profile from './components/auth/Profile'

import Default from './components/Default'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/post/add',
      name: 'AddPost',
      component: AddPost
    },
    {
      path: '/notification',
      name: 'Notification',
      component: Notification
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin

    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup

    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard

    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile

    },
    {
      path: '',
      name: 'default',
      component: Default
    }
  ]
})
