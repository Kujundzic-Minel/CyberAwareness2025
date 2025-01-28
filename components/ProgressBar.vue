<template>
  <div class="progress">
    <div class="progress__bar" :style="{ width: progressPercentage + '%' }" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ current: number; total: number }>();

const progressPercentage = computed(() => (props.current / props.total) * 100);
</script>

<style lang="scss" scoped>
@import '@/assets/scss/foundations/_variables.scss';

.progress {
  width: 100%;
  height: $spacing-unit;
  background-color: $hover-color;
  border-radius: $border-radius;
  margin: $spacing-unit * 2 0;
  overflow: hidden;

  &__bar {
    height: 100%;
    background-color: $accent-color;
    transition: width 0.3s ease;
  }
}
</style>
