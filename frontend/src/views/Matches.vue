<template>
  <div class="matches-screen">
    <header class="matches-header">
      <router-link to="/" class="back-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </router-link>
      <div class="header-content">
        <h1>Dating Matches</h1>
        <p>Check out lists of matches & keep enjoing</p>
      </div>
    </header>

    <div class="matches-list">
      <div v-for="match in matches" :key="match._id" class="match-item">
        <div class="match-avatar">
          <img
            :src="base + other(match)?.avatar"
            :alt="other(match)?.firstName"
            v-if="other(match)?.avatar"
          />
          <div v-else class="avatar-placeholder">
            {{ other(match)?.firstName?.charAt(0) || '?' }}
          </div>
        </div>
        <div class="match-info">
          <h3>{{ other(match)?.firstName }} {{ other(match)?.lastName }}</h3>
          <p>It's a Match!</p>
        </div>
        <button class="match-chat" @click="startChat(match)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        </button>
      </div>
      <div v-if="!matches.length" class="no-matches">
        <p>No matches yet</p>
        <p class="no-matches-sub">Keep swiping to find your match! ✨</p>
      </div>
    </div>
    <nav class="bottom-nav">
      <router-link to="/" class="nav-item">
        <svg
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          fill="none"
          stroke="#ffffff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <rect height="11.5" width="8.25" y="2.75" x="1.75"></rect>
            <path d="m10 3.75 4.25 2-4.25 7.5"></path>
          </g>
        </svg>
      </router-link>
      <router-link to="/users" class="nav-item">
        <svg
          fill="#ffffff"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <title>users</title>
            <path
              d="M16 21.416c-5.035 0.022-9.243 3.537-10.326 8.247l-0.014 0.072c-0.018 0.080-0.029 0.172-0.029 0.266 0 0.69 0.56 1.25 1.25 1.25 0.596 0 1.095-0.418 1.22-0.976l0.002-0.008c0.825-3.658 4.047-6.35 7.897-6.35s7.073 2.692 7.887 6.297l0.010 0.054c0.127 0.566 0.625 0.982 1.221 0.982 0.69 0 1.25-0.559 1.25-1.25 0-0.095-0.011-0.187-0.031-0.276l0.002 0.008c-1.098-4.78-5.305-8.295-10.337-8.316h-0.002zM9.164 11.102c0 0 0 0 0 0 2.858 0 5.176-2.317 5.176-5.176s-2.317-5.176-5.176-5.176c-2.858 0-5.176 2.317-5.176 5.176v0c0.004 2.857 2.319 5.172 5.175 5.176h0zM9.164 3.25c0 0 0 0 0 0 1.478 0 2.676 1.198 2.676 2.676s-1.198 2.676-2.676 2.676c-1.478 0-2.676-1.198-2.676-2.676v0c0.002-1.477 1.199-2.674 2.676-2.676h0zM22.926 11.102c2.858 0 5.176-2.317 5.176-5.176s-2.317-5.176-5.176-5.176c-2.858 0-5.176 2.317-5.176 5.176v0c0.004 2.857 2.319 5.172 5.175 5.176h0zM22.926 3.25c1.478 0 2.676 1.198 2.676 2.676s-1.198 2.676-2.676 2.676c-1.478 0-2.676-1.198-2.676-2.676v0c0.002-1.477 1.199-2.674 2.676-2.676h0zM31.311 19.734c-0.864-4.111-4.46-7.154-8.767-7.154-0.395 0-0.784 0.026-1.165 0.075l0.045-0.005c-0.93-2.116-3.007-3.568-5.424-3.568-2.414 0-4.49 1.448-5.407 3.524l-0.015 0.038c-0.266-0.034-0.58-0.057-0.898-0.063l-0.009-0c-4.33 0.019-7.948 3.041-8.881 7.090l-0.012 0.062c-0.018 0.080-0.029 0.173-0.029 0.268 0 0.691 0.56 1.251 1.251 1.251 0.596 0 1.094-0.417 1.22-0.975l0.002-0.008c0.684-2.981 3.309-5.174 6.448-5.186h0.001c0.144 0 0.282 0.020 0.423 0.029 0.056 3.218 2.679 5.805 5.905 5.805 3.224 0 5.845-2.584 5.905-5.794l0-0.006c0.171-0.013 0.339-0.035 0.514-0.035 3.14 0.012 5.765 2.204 6.442 5.14l0.009 0.045c0.126 0.567 0.625 0.984 1.221 0.984 0.69 0 1.249-0.559 1.249-1.249 0-0.094-0.010-0.186-0.030-0.274l0.002 0.008zM16 18.416c-0 0-0 0-0.001 0-1.887 0-3.417-1.53-3.417-3.417s1.53-3.417 3.417-3.417c1.887 0 3.417 1.53 3.417 3.417 0 0 0 0 0 0.001v-0c-0.003 1.886-1.53 3.413-3.416 3.416h-0z"
            ></path>
          </g>
        </svg>
      </router-link>
      <router-link to="/matches" class="nav-item active">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
      </router-link>
      <router-link to="/profile" class="nav-item">
        <svg
          width="164px"
          height="164px"
          viewBox="0 0 20 20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <title>profile_round [#1342]</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g
                id="Dribbble-Light-Preview"
                transform="translate(-140.000000, -2159.000000)"
                fill="#ffffff"
              >
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <path
                    d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598"
                    id="profile_round-[#1342]"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import API, { setAuthToken } from '../services/api'

const router = useRouter()
const matches = ref([])
const base = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

const loadMatches = async () => {
  try {
    // Verificar se o usuário está logado
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    setAuthToken(token)

    // Carregar os matches
    const response = await API.get('/matches')
    matches.value = response.data
  } catch (e) {
    console.error('Erro ao carregar matches:', e.response?.data || e.message)
    if (e.response?.status === 401) {
      router.push('/login')
    }
  }
}

const startChat = match => {
  // Implementar navegação para o chat quando estiver pronto
  console.log('Iniciar chat com:', other(match).firstName)
}

const other = match => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return null

    // Decodifica o token JWT para pegar o ID do usuário atual
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentUserId = payload.id

    // Retorna o outro usuário do match
    return match.userA._id === currentUserId ? match.userB : match.userA
  } catch (e) {
    console.error('Erro ao determinar outro usuário:', e)
    return null
  }
}

onMounted(loadMatches)
</script>

<style scoped>
.matches-screen {
  min-height: 100vh;
  width: 100%;
  background: radial-gradient(ellipse at center, #2b003f 0%, #170019 40%, #120017 100%);
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
}

.matches-header {
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  color: white;
  position: sticky;
  top: 0;
  background: inherit;
  z-index: 10;
}

.back-button {
  color: rgba(255, 255, 255, 0.7);
  width: 2rem;
  height: 2rem;
}

.header-content h1 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 600;
}

.header-content p {
  margin: 0.5rem 0 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
}

.matches-list {
  padding-top: 1rem;
}

.matches-list {
  padding: 0 1.5rem;
}

.match-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.match-avatar {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
}

.match-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
}

.match-info {
  flex: 1;
}

.match-info h3 {
  margin: 0;
  color: white;
  font-size: 1rem;
  font-weight: 500;
}

.match-info p {
  margin: 0.25rem 0 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
}

.match-chat {
  background: linear-gradient(45deg, #ff4b8b, #b855ff);
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: transform 0.2s;
}

.match-chat:hover {
  transform: scale(1.1);
}

.match-chat svg {
  width: 1.25rem;
  height: 1.25rem;
}

.no-matches {
  text-align: center;
  padding: 4rem 1rem;
  color: rgba(255, 255, 255, 0.7);
}

.no-matches p {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
}

.no-matches-sub {
  color: rgba(255, 255, 255, 0.5) !important;
  font-size: 0.875rem !important;
  margin-top: 0.5rem !important;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.nav-item {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  padding: 0.5rem;
  transition: color 0.2s;
}

.nav-item.active {
  color: #ff4b8b;
}

.nav-item svg {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
