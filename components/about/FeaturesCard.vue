<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="card">
    <h3 class="card__title">{{ title }}</h3>
    <p class="card__description">{{ description }}</p>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background: $primary-color;
  padding: $spacing-unit * 3;
  border-radius: $border-radius;
  border: 1px solid $hover-color;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: $hover-color;
  }

  &__title {
    font-size: 1.5rem;
    color: $accent-color;
    margin-bottom: $spacing-unit * 2;
  }

  &__description {
    color: $text-color;
    line-height: 1.6;
  }
}
</style>
