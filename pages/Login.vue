<template>
  <main class="auth">
    <div class="auth__container">
      <div class="auth__header">
        <h1 class="auth__title">{{ isLogin ? 'Connexion' : 'Inscription' }}</h1>
        <SwitchAuthBtn v-model="isLogin" />
      </div>

      <Transition name="fade" mode="out-in">
        <LoginForm v-if="isLogin" key="login" />
        <RegisterForm v-else key="register" />
      </Transition>
    </div>
  </main>
</template>

<script setup lang="ts">
const isLogin = ref(true);

useSeoMeta({
  title: 'Cyber Awareness',
});
</script>

<style lang="scss" scoped>
.auth {
  max-width: 500px;
  margin: 2rem auto;
  padding: 0 1rem;

  &__container {
    background-color: darken($primary-color, 2%);
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  &__header {
    text-align: center;
    margin-bottom: 2rem;
  }

  &__title {
    color: $accent-color;
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
}

// Animations de transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

// Media queries
@media (max-width: 768px) {
  .auth {
    margin: 1rem auto;

    &__container {
      padding: 1.5rem;
    }

    &__title {
      font-size: 1.75rem;
    }

    &__toggle-btn {
      padding: 0.5rem 1.5rem;
    }
  }
}
</style>
