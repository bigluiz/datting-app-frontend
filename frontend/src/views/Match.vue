<template>
  <div class="match-screen">
    <div class="match-content">
      <div class="avatars">
        <div
          class="avatar current"
          v-if="currentUser && currentUser.avatar"
          :style="{ backgroundImage: `url(${base + currentUser.avatar})` }"
        ></div>
        <div
          class="avatar other"
          v-if="matchedUser && matchedUser.avatar"
          :style="{ backgroundImage: `url(${base + matchedUser.avatar})` }"
        ></div>
      </div>

      <h2 class="title">Congrats!</h2>
      <p class="subtitle">It's a Match!</p>
      <p class="names" v-if="currentUser && matchedUser">
        {{ matchedUser.firstName }} &amp; {{ currentUser.firstName }}
      </p>

      <div class="actions">
        <button class="btn primary" @click="backToSwipe">Back to Swipe</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import API, { setAuthToken } from '../services/api'

const router = useRouter()
const route = useRoute()
const base = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

const currentUser = ref(null)
const matchedUser = ref(null)

const load = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    setAuthToken(token)

    // load current user
    const meRes = await API.get('/users/me')
    currentUser.value = meRes.data

    // matched user can be passed via history state or query param `id`
    const stateMatch =
      router?.history?.state?.matchedUser || route.params.matchedUser || route.query.matchedUser
    if (stateMatch && typeof stateMatch === 'object') {
      matchedUser.value = stateMatch
      return
    }

    // if matched user passed as JSON string in query/params
    const maybeJson = route.query.matched || route.params.matched
    if (maybeJson) {
      try {
        matchedUser.value = JSON.parse(decodeURIComponent(maybeJson))
        return
      } catch (e) {
       
      }
    }

    // if an id is provided, fetch from /users/all and find
    const id = route.params.id || route.query.id
    if (id) {
      const all = await API.get('/users/all')
      matchedUser.value = all.data.find(u => u._id === id) || null
    }
  } catch (e) {
    console.error('Erro carregando tela de match:', e.response?.data || e.message)
  }
}

const backToSwipe = () => router.push('/')

onMounted(load)
</script>

<style scoped>
.match-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at center, #2b003f 0%, #170019 40%, #120017 100%);
  color: #fff;
  padding: 2rem 1rem;
}
.match-content {
  text-align: center;
  max-width: 420px;
  width: 100%;
}
.avatars {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: -1rem;
  margin-bottom: 1.5rem;
  position: relative;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: 4px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}
.avatar.other {
  transform: translateX(40px);
}
.avatar.current {
  transform: translateX(-40px);
}
.title {
  font-size: 2rem;
  margin: 0.5rem 0 0.25rem;
  color: #ffd6ea;
}
.subtitle {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
}
.names {
  margin: 0.75rem 0 1.25rem;
  font-weight: 600;
  font-size: 1.125rem;
}
.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.btn {
  padding: 0.9rem 1.25rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  font-weight: 600;
}
.btn.primary {
  background: linear-gradient(45deg, #ff4b8b, #b855ff);
  color: white;
}
</style>
