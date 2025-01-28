<template>
  <nav class="header">
    <button id="open-sidebar-button" class="header__toggle">☰</button>
    <ul class="header__list">
      <li class="header__item header__item--home">
        <NuxtLink class="header__link" to="/">Home</NuxtLink>
      </li>
      <li class="header__item">
        <NuxtLink class="header__link" to="moocs">Moocs</NuxtLink>
      </li>
      <li class="header__item">
        <NuxtLink class="header__link" to="quizz">Quizz</NuxtLink>
      </li>
      <li class="header__item">
        <NuxtLink class="header__link" to="about">About</NuxtLink>
      </li>
      <li class="header__item">
        <NuxtLink class="header__link" to="contact">Contact</NuxtLink>
      </li>
      <li class="header__item">
        <NuxtLink class="header__link" to="profile">Profil</NuxtLink>
      </li>
      <li class="header__item">
        <NuxtLink class="header__link header__link--login" to="login"
          >Login</NuxtLink
        >
      </li>
    </ul>
    <div id="overlay" class="header__overlay" />
  </nav>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.header {
  background-color: $primary-color;
  border-bottom: 1px solid $hover-color;

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
  }

  &__overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    inset: 0;
    z-index: 9;
    display: none;
  }

  @media screen and (max-width: 700px) {
    &__toggle {
      display: block;
    }

    & {
      position: fixed;
      top: 0;
      right: -100%;
      height: 100vh;
      width: min(15em, 100%);
      z-index: 10;
      border-left: 1px solid $hover-color;
      transition: right 300ms ease-in-out;

      &--show {
        right: 0;
      }

      &--show ~ .header__overlay {
        display: block;
      }
    }

    &__list {
      width: 100%;
      flex-direction: column;
    }

    &__link {
      width: 100%;
      padding-left: 2.5em;

      &.router-link-active {
        background-color: $hover-color;
        &::after {
          left: 0;
          bottom: 0;
          width: 4px;
          height: 100%;
        }
      }

      &--login {
        &.router-link-active {
          background-color: $accent-color;
        }
      }
    }
  }
}
</style>
