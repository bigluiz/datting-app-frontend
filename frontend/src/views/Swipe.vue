<template>
  <div class="swipe-screen">
    <!-- Match Dialog -->
    <div v-if="showMatch" class="match-overlay" @click="closeMatch">
      <div class="match-dialog">
        <h2>It's a Match!</h2>
        <p>You and {{ matchedUser?.firstName }} liked each other</p>
        <div class="match-photos">
          <img
            :src="base + matchedUser?.avatar"
            alt="Match"
            class="match-photo"
            v-if="matchedUser?.avatar"
          />
          <img
            :src="base + currentUser?.avatar"
            alt="You"
            class="match-photo"
            v-if="currentUser?.avatar"
          />
        </div>
        <button class="match-btn" @click="goToChat">Send Message</button>
        <button class="match-btn outline" @click="closeMatch">Keep Swiping</button>
      </div>
    </div>

    <!-- Main Swipe Card -->
    <div class="card-container">
      <div v-if="current" class="swipe-card">
        <div
          class="card-photo"
          :style="current.avatar ? `background-image: url(${base + current.avatar})` : ''"
        >
          <div class="card-gradient"></div>
          <div class="card-info">
            <h2>{{ current.firstName }} {{ current.lastName }}</h2>
            <div class="interests-list">
              <span
                v-for="interest in current.interests || []"
                :key="interest"
                class="interest-tag"
              >
                {{ interest }}
              </span>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <button class="action-btn skip" @click="skip">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z"
                  fill="#ffffff"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L6.53035 18.5303C6.23745 18.8232 5.76258 18.8232 5.46969 18.5303C5.17679 18.2374 5.17679 17.7626 5.46968 17.4697L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967Z"
                  fill="#ffffff"
                ></path>
              </g>
            </svg>
          </button>
          <button class="action-btn like" @click="like">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                  fill="#ffffff"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
      <div v-else class="no-more">
        <h3>No More Profiles</h3>
        <p v-if="currentUser">
          Looking for {{ currentUser.preference === 'all' ? 'all' : currentUser.preference + 's' }}
        </p>
        <p>Check back later for new people</p>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
      <router-link to="/" class="nav-item active">
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
      <router-link to="/matches" class="nav-item">
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import API, { setAuthToken } from '../services/api'

const router = useRouter()
const candidates = ref([])
const index = ref(0)
const base = import.meta.env.VITE_API_BASE || 'http://localhost:3000'
const showMatch = ref(false)
const matchedUser = ref(null)
const currentUser = ref(null)

// Limpa o estado quando a rota é reutilizada
const resetState = () => {
  candidates.value = []
  index.value = 0
  showMatch.value = false
  matchedUser.value = null
  currentUser.value = null
}

const load = async (forceReload = false) => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    // Reseta o estado se for forçar recarga
    if (forceReload) {
      resetState()
    }

    setAuthToken(token)

    const [usersRes, meRes] = await Promise.all([API.get('/users'), API.get('/users/me')])

    console.log('Usuários carregados:', usersRes.data)
    console.log('Perfil atual:', meRes.data)

    // Se o usuário atual mudou, recarrega a lista
    if (!currentUser.value || currentUser.value._id !== meRes.data._id) {
      candidates.value = usersRes.data
      currentUser.value = meRes.data
      index.value = 0
    }
  } catch (e) {
    console.error('Erro ao carregar dados:', e.response?.data || e.message)
    if (e.response?.status === 401) {
      router.push('/login')
    }
  }
}

onMounted(load)

const current = computed(() => candidates.value[index.value])

const like = async () => {
  if (!current.value) return
  try {
    console.log('Enviando like para:', current.value._id)
    const res = await API.post('/like', { targetId: current.value._id })
    console.log('Resposta do like:', res.data)

    if (res.data.match) {
      matchedUser.value = current.value
      showMatch.value = true
    }
    index.value++
  } catch (e) {
    console.error('Erro ao dar like:', e.response?.data || e.message)
    if (e.response?.status === 401) {
      router.push('/login')
    }
  }
}

const skip = () => index.value++

const closeMatch = () => {
  showMatch.value = false
  matchedUser.value = null
}

const goToChat = () => {
  closeMatch()
  router.push('/matches')
}

// Observa mudanças no token e força recarga quando mudar
watch(
  () => localStorage.getItem('token'),
  (newToken, oldToken) => {
    if (newToken && newToken !== oldToken) {
      load(true) // Força recarga quando o token mudar
    }
  },
  { immediate: true }
)

// Recarrega quando o componente for montado ou reativado
onMounted(() => load(true))
</script>

<style scoped>
.swipe-screen {
  min-height: 100vh;
  width: 100%;
  background: radial-gradient(ellipse at center, #2b003f 0%, #170019 40%, #120017 100%);
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.card-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-bottom: 4rem;
}

.swipe-card {
  width: 100%;
  max-width: 23.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 1.25rem;
  overflow: hidden;
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  padding-bottom: 1rem;
}

.card-photo {
  width: 100%;
  height: 28rem;
  background-size: cover;
  background-position: center;
  position: relative;
}

.card-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));
}

.card-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  color: #fff;
}

.card-info h2 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 600;
}

.interests-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.interest-tag {
  background: rgba(255, 255, 255, 0.15);
  padding: 0.375rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  backdrop-filter: blur(5px);
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
}

.action-btn {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.action-btn:hover {
  transform: scale(1.1);
}

.action-btn.skip {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.action-btn.like {
  background: linear-gradient(45deg, #ff4b8b, #b855ff);
  color: white;
}

.no-more {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  padding: 2rem;
}

.no-more h3 {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  color: white;
}

.no-more p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  opacity: 0.8;
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

/* Match Dialog */
.match-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
}

.match-dialog {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 1.5rem;
  text-align: center;
  color: white;
  max-width: 20rem;
  width: 100%;
}

.match-dialog h2 {
  color: #ff4b8b;
  margin: 0;
}

.match-photos {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
}

.match-photo {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ff4b8b;
}

.match-btn {
  width: 100%;
  padding: 0.875rem;
  border-radius: 0.75rem;
  border: none;
  background: linear-gradient(45deg, #ff4b8b, #b855ff);
  color: white;
  font-weight: 600;
  margin-top: 0.75rem;
  cursor: pointer;
}

.match-btn.outline {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
