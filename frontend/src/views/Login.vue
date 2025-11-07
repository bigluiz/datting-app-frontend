<template>
  <div class="login-screen">
    <div class="content-card">
      <a class="back" @click="$router.push('/home')">←</a>
      <div class="logo-badge">
        <h1 class="brand">Destined</h1>
        <p class="subtitle">Online Dating App</p>
      </div>

      <form @submit.prevent="onLogin" class="login-form">
        <input v-model="email" placeholder="Email" type="email" />
        <input type="password" v-model="password" placeholder="Password" />

        <router-link to="/register" class="signup-link">Sign up</router-link>

        <button class="continue-btn" type="submit">Continue</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import API, { setAuthToken } from '../services/api'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const onLogin = async () => {
  try {
    const res = await API.post('/login', { email: email.value, password: password.value })
    localStorage.setItem('token', res.data.token)
    setAuthToken(res.data.token)
    router.push('/')
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed')
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.login-screen {
  min-height: 100vh;
  width: 100%;
  background: radial-gradient(ellipse at center, #2b003f 0%, #170019 40%, #120017 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  padding: 20px;
}

.content-card {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 40px 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.04);
  position: relative;
}

.back {
  position: absolute;
  left: 16px;
  top: 14px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 18px;
  cursor: pointer;
}

.logo-badge {
  text-align: center;
  margin-top: 6px;
  margin-bottom: 28px;
}

.brand {
  font-size: 2rem;
  margin: 0;
  font-weight: 700;
  background: linear-gradient(45deg, #ff4b8b, #b855ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  margin: 6px 0 0;
  color: #d6c7f8;
  font-size: 0.95rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

input {
  width: 100%;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  color: #fff;
  font-size: 1rem;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.45);
}

input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(184, 85, 255, 0.08);
  border-color: rgba(184, 85, 255, 0.5);
}

.signup-link {
  text-align: center;
  color: #ff6b9a;
  text-decoration: none;
  font-weight: 600;
  margin-top: 6px;
}

.continue-btn {
  margin-top: 6px;
  padding: 12px 20px;
  border-radius: 28px;
  border: none;
  background: linear-gradient(90deg, #ff6b9a, #b855ff);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(184, 69, 171, 0.18);
}

.continue-btn:hover {
  transform: translateY(-2px);
}
</style>
