<script setup lang="ts"></script>

<template>
  <section class="stats">
    <div class="stats__grid">
      <div class="stats__item">
        <h3 class="stats__number">10K+</h3>
        <p class="stats__label">Utilisateurs formés</p>
      </div>
      <div class="stats__item">
        <h3 class="stats__number">95%</h3>
        <p class="stats__label">Taux de satisfaction</p>
      </div>
      <div class="stats__item">
        <h3 class="stats__number">24/7</h3>
        <p class="stats__label">Support disponible</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.stats {
  padding: $spacing-unit * 6 0;

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-unit * 3;
  }

  &__item {
    text-align: center;
    padding: $spacing-unit * 3;
    background: $primary-color;
    border-radius: $border-radius;
    transition: transform 0.3s ease;
    box-shadow: 0 4px 6px $shadow-color;
    border: 1px solid $hover-color;

    &:hover {
      transform: translateY(-5px);
      background: $hover-color;
    }
  }

  &__number {
    font-size: 2.5rem;
    color: $accent-color;
    margin-bottom: $spacing-unit;
  }

  &__label {
    font-size: 1.1rem;
    color: $text-color;
  }
}
</style>
