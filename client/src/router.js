import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'

import AddBlog from './components/blogs/AddBlog'
import Blogs from './components/blogs/Blogs'
import Notification from './components/blogs/Notification'

import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'
import Dashboard from './components/auth/Dashboard'
import Profile from './components/auth/Profile'

import AuthGuard from './AuthGuard'

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
      path: '/blogs',
      name: 'Blogs',
      component: Blogs,
      beforeEnter: AuthGuard

    },
    {
      path: '/blog/add',
      name: 'AddBlog',
      component: AddBlog,
      beforeEnter: AuthGuard

    },
    {
      path: '/notification',
      name: 'Notification',
      component: Notification,
      beforeEnter: AuthGuard

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
      component: Dashboard,
      beforeEnter: AuthGuard

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
