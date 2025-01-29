<template>
  <div class="contact-card">
    <h3 class="contact-card__title">{{ title }}</h3>
    <p class="contact-card__content">{{ content }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  content: string;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.contact-card {
  padding: 1.5rem;
  background-color: darken($primary-color, 3%);
  border: 1px solid $hover-color;
  border-radius: 8px;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 150ms ease;

  &:hover {
    transform: translateY(-5px);
    background-color: $hover-color;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &__title {
    color: $accent-color;
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
  }

  &__content {
    color: $text-color;
    line-height: 1.6;
    margin: 0;
    font-size: 1.1rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
}
</style>
