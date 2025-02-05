<template>
  <nav v-if="totalPages > 1" class="pagination">
    <button
      v-for="i in totalPages"
      :key="i"
      :class="[
        'pagination__button',
        { 'pagination__button--active': currentPage === i },
      ]"
      @click="$emit('update:currentPage', i)"
    >
      {{ i }}
    </button>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const _props = defineProps<{
  totalPages: number;
  currentPage: number;
}>();

const _emit = defineEmits(['update:currentPage']);
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: $spacing-unit * 4;
  display: flex;
  justify-content: center;
  gap: $spacing-unit;
}

.pagination__button {
  padding: $spacing-unit $spacing-unit * 1.5;
  background: $hover-color;
  border: 1px solid rgba($text-color, 0.1);
  border-radius: $border-radius;
  font-family: $font-family-primary;
  font-weight: $font-weight-medium;
  color: $text-color;
  cursor: pointer;
  transition: $transition-base;

  &:hover {
    background: $accent-color;
    color: $primary-color;
  }

  &--active {
    background: $accent-color;
    color: $primary-color;
    border-color: $accent-color;
  }
}
</style>
