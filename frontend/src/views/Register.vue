<template>
  <div class="register-screen">
    <div class="content-card">
      <div class="logo-badge">
        <h1 class="brand">Destined</h1>
        <p class="subtitle">Create Account</p>
      </div>

      <form @submit.prevent="onSubmit" class="register-form">
        <div class="input-group">
          <input v-model="firstName" placeholder="First name" />
          <input v-model="lastName" placeholder="Last name" />
        </div>

        <input type="date" v-model="dob" placeholder="Date of Birth" />

        <select v-model="genre" aria-label="Your genre">
          <option value="" disabled>Your genre</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select v-model="preference" aria-label="Preferences">
          <option value="" disabled>Preferences</option>
          <option value="all">Everyone</option>
          <option value="female">Women</option>
          <option value="male">Men</option>
        </select>

        <input v-model="email" placeholder="Email" type="email" />
        <input type="password" v-model="password" placeholder="Password" />

        <div class="file-upload">
          <label for="avatar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
              />
            </svg>
            <span>Upload Avatar</span>
          </label>
          <input type="file" id="avatar" @change="onFile" />
        </div>

        <button class="register-btn" type="submit">Create Account</button>
      </form>

      <p class="login-link">Already registered? <router-link to="/login">Login</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import API, { setAuthToken } from '../services/api'
import { useRouter } from 'vue-router'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const dob = ref('')
const password = ref('')
const file = ref(null)
const preference = ref('all')
const genre = ref('')
const router = useRouter()

const onFile = e => {
  file.value = e.target.files[0]
}

const onSubmit = async () => {
  const form = new FormData()
  form.append('firstName', firstName.value)
  form.append('lastName', lastName.value)
  form.append('genre', genre.value)
  form.append('email', email.value)
  form.append('dob', dob.value)
  form.append('password', password.value)
  if (file.value) form.append('avatar', file.value)
  form.append('preference', preference.value)

  const res = await API.post('/register', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  localStorage.setItem('token', res.data.token)
  setAuthToken(res.data.token)

  router.push('/interests')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.register-screen {
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
  max-width: 480px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.logo-badge {
  text-align: center;
  margin-bottom: 32px;
}

.brand {
  font-size: 2rem;
  margin: 0;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(45deg, #ff4b8b, #b855ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  margin: 4px 0 0;
  font-size: 1rem;
  color: #d6c7f8;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: rgba(184, 85, 255, 0.5);
  box-shadow: 0 0 0 3px rgba(184, 85, 255, 0.1);
}

input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

input[type='date'] {
  color-scheme: dark;
}

.file-upload {
  margin: 8px 0;
}

.file-upload label {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.file-upload label:hover {
  background: rgba(255, 255, 255, 0.08);
}

.file-upload svg {
  fill: currentColor;
  opacity: 0.8;
}

.file-upload input[type='file'] {
  display: none;
}

.register-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 14px 28px;
  background: linear-gradient(90deg, #ff4b8b, #b855ff);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
}

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(184, 69, 171, 0.2);
}

.register-btn svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.login-link {
  text-align: center;
  margin-top: 24px;
  color: rgba(255, 255, 255, 0.6);
}

.login-link a {
  color: #ff4b8b;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.login-link a:hover {
  color: #b855ff;
}
</style>
