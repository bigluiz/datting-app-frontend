<template>
  <div class="interests-screen">
    <div class="content-card">
      <a class="back" @click="$router.back()">←</a>
      <a class="skip" @click="skip">Skip</a>

      <div class="header">
        <h1>Likes, Interests</h1>
        <p>Share your likes & passion with others</p>
      </div>

      <div class="grid">
        <button
          v-for="opt in options"
          :key="opt"
          :class="['pill', { selected: selected.includes(opt) }]"
          @click="toggle(opt)"
        >
          <span class="pill-label">{{ opt }}</span>
        </button>
      </div>

      <div class="load-more">Load More</div>

      <button class="continue-btn" @click="saveAndContinue">Continue</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import API from '../services/api'

const router = useRouter()
const options = ref([
  'Photography',
  'Cooking',
  'Video Games',
  'Music',
  'Travelling',
  'Shopping',
  'Speeches',
  'Art & Crafts',
  'Swimming',
  'Drinking',
  'Extreme Sports',
  'Fitness',
])
const selected = ref([])

onMounted(async () => {
  try {
    const res = await API.get('/users/me')
    if (res.data.interests) selected.value = res.data.interests
  } catch (e) {
    // ignore
  }
})

const toggle = opt => {
  const idx = selected.value.indexOf(opt)
  if (idx === -1) selected.value.push(opt)
  else selected.value.splice(idx, 1)
}

const saveAndContinue = async () => {
  try {
    await API.put('/users/me', { interests: selected.value })
  } catch (e) {
    // ignore
  }
  router.push('/login')
}

const skip = () => {
  router.push('/login')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.interests-screen {
  min-height: 100vh;
  width: 100%;
  background: radial-gradient(ellipse at center, #2b003f 0%, #170019 40%, #120017 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  padding: 1.25rem;
}

.content-card {
  width: 100%;
  max-width: 23.75rem;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(0.5rem);
  border-radius: 1.25rem;
  padding: 1.75rem 1.375rem;
  box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.12);
  border: 0.0625rem solid rgba(255, 255, 255, 0.035);
  position: relative;
}

.back {
  position: absolute;
  left: 0.75rem;
  top: 0.75rem;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  font-size: 1.125rem;
}

.skip {
  position: absolute;
  right: 0.75rem;
  top: 0.75rem;
  color: #ff6b9a;
  cursor: pointer;
  font-weight: 600;
}

.header {
  text-align: center;
  margin-bottom: 18px;
}

.header h1 {
  color: #fff;
  margin: 0;
  font-size: 1.6rem;
}

.header p {
  color: #d6c7f8;
  margin: 6px 0 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-top: 0.875rem;
}

.pill {
  height: 5.5rem;
  padding: 0 1rem;
  border-radius: 999rem;
  background: rgba(255, 255, 255, 0.02);
  color: rgba(255, 255, 255, 0.95);
  border: 0.0625rem solid rgba(255, 255, 255, 0.03);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.75rem;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
  font-weight: 600;
}

.pill:hover {
  transform: translateY(-0.125rem);
  box-shadow: 0 0.5rem 1.25rem rgba(0, 0, 0, 0.18);
}

.pill.selected {
  background: linear-gradient(90deg, rgba(255, 107, 154, 0.08), rgba(184, 85, 255, 0.06));
  border: 0.09375rem solid rgba(255, 107, 154, 0.7);
  box-shadow: 0 0.625rem 1.875rem rgba(184, 69, 171, 0.12);
}

.pill-label {
  display: block;
}

.load-more {
  text-align: center;
  color: #ff6b9a;
  margin: 1.125rem 0 0.875rem;
  cursor: pointer;
  font-weight: 600;
}

.continue-btn {
  width: 100%;
  padding: 0.875rem 1.125rem;
  border-radius: 1.75rem;
  border: none;
  background: linear-gradient(90deg, #ff6b9a, #b855ff);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.375rem;
}
</style>
