<template>
  <div class="theme-card" @click="goToTheme">
    <h2 class="theme-card__title">{{ theme.title }}</h2>
    <p class="theme-card__description">{{ theme.description }}</p>
    <div v-if="theme.progress" class="theme-card__progress">
      <span>Progression: {{ theme.progress }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

interface Theme {
  id: string;
  title: string;
  description: string;
  slug: string;
  progress?: number;
}

const props = defineProps<{ theme: Theme }>();
const router = useRouter();

const goToTheme = () => {
  if (!props.theme.slug) {
    console.error('Slug non défini pour le thème');
    return;
  }
  router.push(`/quiz/${props.theme.slug}`);
};
</script>

<style lang="scss" scoped>
.theme-card {
  background-color: $primary-color;
  border: 1px solid $hover-color;
  border-radius: $border-radius;
  padding: $spacing-unit * 2;
  margin: $spacing-unit;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background-color: $hover-color;
  }

  &__title {
    color: $text-color;
    margin-bottom: $spacing-unit;
  }

  &__description {
    color: darken($text-color, 20%);
    margin-bottom: $spacing-unit * 2;
  }

  &__progress {
    color: $accent-color;
    font-weight: bold;
  }
}
</style>
