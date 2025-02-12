<script setup lang="ts">
import { ref, onMounted } from 'vue';
import pb from '../../services/pocketbase';

interface Stats {
  id: string;
  about_number: string;
  about_label: string;
}

const stats = ref<Stats[]>([]);

const getStats = async () => {
  try {
    const records = await pb.collection('about_stats').getFullList();
    stats.value = records.map((record) => ({
      id: record.id,
      about_number: record.stats_number,
      about_label: record.stats_label,
    }));
  } catch (error) {
    console.error('Error fetching stats:', error);
  }
};

onMounted(() => {
  getStats();
});
</script>

<template>
  <section class="stats">
    <h2 class="stats__title">Nos statistiques</h2>
    <div class="stats__grid">
      <div v-for="stat in stats" :key="stat.id" class="stats__item">
        <h3 class="stats__number">{{ stat.about_number }}</h3>
        <p class="stats__label">{{ stat.about_label }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.stats {
  padding: $spacing-unit * 6 0;

  &__title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: $spacing-unit * 4;
    color: $text-color;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(300px, 1fr)
    ); // Changé de 250px à 300px
    gap: $spacing-unit * 3;
    padding: 0 $spacing-unit * 2; // Ajout du padding horizontal
  }

  &__item {
    text-align: center;
    padding: $spacing-unit * 2; // Réduction du padding
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
