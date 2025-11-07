<template>
  <div class="app-root">
    <!-- when on Start page we want a full-screen view without the topbar/container -->
    <template v-if="isStart">
      <router-view />
    </template>

    <template v-else>
      <header class="topbar">
        <h1>Destined</h1>
      </header>
      <main class="container">
        <router-view />
      </main>
    </template>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
// Start view uses path '/home'
const isStart = route.path === '/home' || route.name === 'Start'
</script>
