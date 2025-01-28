<template>
  <div class="user-profile">
    <h2 class="user-profile__username">{{ user.username }}</h2>
    <p class="user-profile__points">Points: {{ user.total_points }}</p>
    <p class="user-profile__grade">Grade: {{ user.current_grade?.name }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  user: {
    username: string;
    total_points: number;
    current_grade: { name: string };
  };
}>();
</script>

<style lang="scss" scoped>
.user-profile {
  padding: $spacing-unit * 2;
  background-color: lighten($primary-color, 70%);
  border-radius: $border-radius;
  margin-bottom: $spacing-unit * 3;

  &__username {
    color: $primary-color;
    font-size: 1.5em;
    margin-bottom: $spacing-unit;
  }

  &__points {
    color: $accent-color;
    font-weight: bold;
    margin-bottom: $spacing-unit;
  }

  &__grade {
    color: lighten($primary-color, 20%);
  }
}
</style>
