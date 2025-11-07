import { createRouter, createWebHistory } from 'vue-router'
import Start from '../views/Start.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Swipe from '../views/Swipe.vue'
import Interests from '../views/Interests.vue'
import Matches from '../views/Matches.vue'
import Profile from '../views/Profile.vue'
import Users from '../views/Users.vue'

const routes = [
  { path: '/home', component: Start },
  { path: '/', component: Swipe },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/interests', component: Interests },
  { path: '/matches', component: Matches },
  { path: '/profile', component: Profile },
  { path: '/users', component: Users },
]

const router = createRouter({ history: createWebHistory(), routes })
export default router
