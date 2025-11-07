<template>
  <div class="start-screen">
    <div class="center">
      <div class="rings">
        <div class="ring ring-3"></div>
        <div class="ring ring-2"></div>
        <div class="ring ring-1"></div>

        <div class="logo-badge">
          <h1 class="brand">Destined</h1>
          <p class="subtitle">Online Dating App</p>
        </div>
      </div>

      <router-link to="/register" class="start-btn">
        Get Started
        <svg
          fill="#ffffff"
          height="1.5rem"
          width="1.5rem"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 492.004 492.004"
          xml:space="preserve"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <g>
                <path
                  d="M484.14,226.886L306.46,49.202c-5.072-5.072-11.832-7.856-19.04-7.856c-7.216,0-13.972,2.788-19.044,7.856l-16.132,16.136 c-5.068,5.064-7.86,11.828-7.86,19.04c0,7.208,2.792,14.2,7.86,19.264L355.9,207.526H26.58C11.732,207.526,0,219.15,0,234.002 v22.812c0,14.852,11.732,27.648,26.58,27.648h330.496L252.248,388.926c-5.068,5.072-7.86,11.652-7.86,18.864 c0,7.204,2.792,13.88,7.86,18.948l16.132,16.084c5.072,5.072,11.828,7.836,19.044,7.836c7.208,0,13.968-2.8,19.04-7.872 l177.68-177.68c5.084-5.088,7.88-11.88,7.86-19.1C492.02,238.762,489.228,231.966,484.14,226.886z"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.start-screen {
  height: 100vh;
  width: 100%;
  background: radial-gradient(ellipse at center, #2b003f 0%, #170019 40%, #120017 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
  color: #fff;
}

.center {
  z-index: 5;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.rings {
  position: relative;
  width: 420px;
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-36px);
}

.ring {
  position: absolute;
  border-radius: 50%;
  box-sizing: border-box;
}

.ring-3 {
  width: 420px;
  height: 420px;
  border: 12px solid rgba(180, 120, 255, 0.06);
  box-shadow:
    0 0 110px rgba(155, 90, 255, 0.14),
    inset 0 0 70px rgba(155, 90, 255, 0.04);
}

.ring-2 {
  width: 320px;
  height: 320px;
  border: 10px solid rgba(255, 90, 140, 0.08);
  box-shadow: 0 0 80px rgba(255, 90, 140, 0.14);
}

.ring-1 {
  width: 220px;
  height: 220px;
  border: 8px solid rgba(0, 180, 255, 0.12);
  box-shadow: 0 0 60px rgba(0, 180, 255, 0.12);
}

.logo-badge {
  position: absolute;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.06), rgba(0, 0, 0, 0.12));
  backdrop-filter: blur(4px);
}

.heart {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(180deg, #ff4b8b, #b855ff);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 22px;
  box-shadow: 0 10px 50px rgba(184, 69, 171, 0.26);
  margin-bottom: 8px;
}

.brand {
  font-size: 1.6rem;
  margin: 0;
  font-weight: 700;
  color: #fff;
}

.subtitle {
  margin: 0;
  font-size: 1rem;
  color: #d6c7f8;
}

.indicators {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  opacity: 0.95;
  display: inline-block;
}

.d1 {
  background: #ff7aa3;
  box-shadow: 0 6px 18px rgba(255, 122, 163, 0.18);
}

.d2 {
  background: #8e6bff;
  box-shadow: 0 6px 18px rgba(142, 107, 255, 0.18);
  transform: scale(1.2);
}

.d3 {
  background: #39c6ff;
  box-shadow: 0 6px 18px rgba(57, 198, 255, 0.12);
}

.start-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 44px;
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  padding: 12px 28px;
  border-radius: 40px;
  background: linear-gradient(90deg, #ff4b8b, #b855ff);
  box-shadow: 0 12px 30px rgba(184, 69, 171, 0.18);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
}

/* .start-btn .arrow {
    margin-left: 8px;
    width: 20px;
    height: 20px;
    display: inline-block;
    flex-shrink: 0;
} */

.start-btn:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(184, 69, 171, 0.22);
}

/* subtle floating animations (kept for future floats) */
@keyframes floatA {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-18px);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes floatB {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes floatC {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-24px);
  }

  100% {
    transform: translateY(0);
  }
}

@media (max-width: 420px) {
  .rings {
    width: 320px;
    height: 320px;
    transform: translateY(-28px);
  }

  .ring-3 {
    width: 320px;
    height: 320px;
  }

  .ring-2 {
    width: 240px;
    height: 240px;
  }

  .ring-1 {
    width: 160px;
    height: 160px;
  }

  .logo-badge {
    width: 120px;
    height: 120px;
  }

  .brand {
    font-size: 1.15rem;
  }

  .start-btn {
    padding: 10px 20px;
    margin-top: 34px;
  }
}
</style>
