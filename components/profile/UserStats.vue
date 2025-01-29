<template>
  <div class="user-stats">
    <div class="stats-cards">
      <div class="stat-card">
        <h3>Rang</h3>
        <p class="grade">
          {{ user?.expand?.current_grade?.name }}
        </p>
      </div>
      <div class="stat-card">
        <h3>Score Total</h3>
        <p class="points">{{ user?.total_points || 0 }} points</p>
      </div>
      <div class="stat-card">
        <h3>Quiz Complétés</h3>
        <p class="completed">{{ results.length }}</p>
      </div>
      <div class="stat-card">
        <h3>Moyenne</h3>
        <p class="average">{{ averageScore }}/250</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface QuizResult {
  score: number;
}

interface UserWithGrade {
  expand?: {
    current_grade?: {
      name: string;
    };
  };
  total_points: number;
}

const props = defineProps<{
  user: UserWithGrade;
  results: QuizResult[];
}>();

const averageScore = computed(() => {
  if (props.results.length === 0) return 0;
  const total = props.results.reduce(
    (sum, result) => sum + (result.score || 0),
    0
  );
  return Math.round(total / props.results.length);
});
</script>

<style lang="scss" scoped>
.user-stats {
  margin-top: 2rem;
  background: $primary-color;
  padding: 2rem;
  border-radius: $border-radius;
  box-shadow: 0 2px 4px $shadow-color;

  .stats-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
}

.stat-card {
  text-align: center;
  padding: 1.5rem;
  background: $primary-color;
  border-radius: $border-radius;
  transition: transform 0.2s ease;
  border: 1px solid rgba($text-color, 0.1);

  &:hover {
    transform: translateY(-5px);
    background: $hover-color;
  }

  h3 {
    color: $text-color;
    margin-bottom: 0.5rem;
    font-size: 1.1em;
    font-weight: 500;
    opacity: 0.9;
  }

  p {
    font-size: 1.8em;
    font-weight: bold;
    margin: 0;
    color: $text-color;

    &.grade {
      color: $success-color;
    }
    &.points {
      color: $warning-color;
    }
    &.completed {
      color: $accent-color;
    }
    &.average {
      color: $text-color;
    }
  }
}
</style>
