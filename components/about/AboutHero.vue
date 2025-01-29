<script setup lang="ts"></script>

<template>
  <section class="hero">
    <div class="hero__content">
      <h1 class="hero__title">Cyber Awareness 2025</h1>
      <p class="hero__subtitle">Protéger le futur numérique ensemble</p>
      <p class="hero__text">
        Notre mission est de sensibiliser et d'éduquer sur la cybersécurité pour
        créer un environnement numérique plus sûr d'ici 2025.
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  min-height: 60vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, $primary-color 0%, $hover-color 100%);
  border-radius: $border-radius;
  padding: $spacing-unit * 6 $spacing-unit * 4;

  &__content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    color: $text-color;
  }

  &__title {
    font-size: 3.5rem;
    margin-bottom: $spacing-unit * 2;
  }

  &__subtitle {
    font-size: 1.5rem;
    margin-bottom: $spacing-unit * 3;
    color: $accent-color;
  }

  &__text {
    font-size: 1.1rem;
    line-height: 1.6;
    color: $text-color;
  }
}
</style>
