<template>
  <div class="actions">
    <RouterLink to="/quizz" class="action-btn">
      Commencer un nouveau quiz
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped>
.actions {
  margin-top: 2rem;
  text-align: center;
}

.action-btn {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: $accent-color;
  color: white;
  text-decoration: none;
  border-radius: $border-radius;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    background-color: darken($accent-color, 10%);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}
</style>
