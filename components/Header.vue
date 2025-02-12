<template>
  <nav class="header" :class="{ 'header--show': isMenuOpen }">
    <button id="open-sidebar-button" class="header__toggle" @click="toggleMenu">
      ☰
    </button>
    <ul class="header__list" @click="handleLinkClick">
      <li class="header__item header__item--home">
        <NuxtLink class="header__link" to="/">Home</NuxtLink>
      </li>
      <li class="header__item">
        <NuxtLink class="header__link" to="/posts">Posts</NuxtLink>
      </li>
      <li class="header__item">
        <NuxtLink class="header__link" to="/moocs">Moocs</NuxtLink>
      </li>
      <li class="header__item">
        <NuxtLink class="header__link" to="/quizz">Quizz</NuxtLink>
      </li>
      <li class="header__item">
        <NuxtLink class="header__link" to="/formations">Formations</NuxtLink>
      </li>
      <li class="header__item">
        <NuxtLink class="header__link" to="/contact">Contact</NuxtLink>
      </li>
      <li class="header__item">
        <NuxtLink class="header__link" to="/profile">Profile</NuxtLink>
      </li>
      <li class="header__item">
        <NuxtLink class="header__link header__link--login" to="/login"
          >Login</NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const isMenuOpen = ref(false);
const route = useRoute();

watch(route, () => {
  closeMenu();
});

// Empêche le scroll quand le menu est ouvert
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Ferme le menu
const closeMenu = () => {
  isMenuOpen.value = false;
};

// Ferme le menu quand on clique sur un lien en mobile
const handleLinkClick = () => {
  if (window.innerWidth <= 860) {
    closeMenu();
  }
};

const handleResize = () => {
  if (window.innerWidth > 860) {
    closeMenu();
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style lang="scss" scoped>
.header {
  background-color: $primary-color;
  border-bottom: 1px solid $hover-color;
  position: relative;
  width: 100%;

  &__list {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }

  &__item {
    margin: 0;

    &--home {
      margin-right: auto;
    }
  }

  &__link {
    display: flex;
    text-decoration: none;
    color: $text-color;
    padding: 1em 2em;
    transition: all 150ms ease;
    position: relative;

    &:hover {
      background-color: $hover-color;
    }

    &.router-link-active {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: $accent-color;
      }
    }

    &--accent {
      background-color: $accent-color;
    }

    &--login {
      background-color: $accent-color;
      color: #ffffff;

      &:hover {
        background-color: darken($accent-color, 10%);
      }

      &.router-link-active::after {
        background-color: $text-color;
      }
    }
  }

  &__toggle {
    display: none;
    background: none;
    border: none;
    padding: 1em;
    cursor: pointer;
    color: $text-color;
    font-size: 1.5rem;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 11;
  }

  @media screen and (max-width: 860px) {
    &__toggle {
      display: block;
      position: fixed;
      top: 0.5rem;
      right: 1rem;
      padding: 0.5rem;
      font-size: 1.75rem;
      z-index: 11;
    }

    & {
      position: fixed;
      top: 0;
      right: -100%;
      height: 100vh;
      width: min(15em, 100%);
      z-index: 10;
      background-color: $primary-color;
      border-left: 1px solid $hover-color;
      transition: right 300ms ease-in-out;
      overflow-y: auto;

      &--show {
        right: 0;

        &::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: -1;
        }
      }
    }

    &__list {
      width: 100%;
      flex-direction: column;
      padding-top: 4rem;
    }

    &__item {
      width: 100%;

      &--home {
        margin-right: 0;
        order: -1;
      }
    }

    &__link {
      width: 100%;
      padding: 1rem 2rem;
      justify-content: flex-start;
      align-items: center;

      &.router-link-active {
        background-color: $hover-color;
        &::after {
          left: 0;
          bottom: 0;
          width: 4px;
          height: 100%;
        }
      }
    }
  }
}
</style>
