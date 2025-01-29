<script setup lang="ts">
import FeaturesCard from './FeaturesCard.vue';

const features = [
  {
    title: 'Formation continue',
    description: 'Programmes de formation adaptés et mis à jour régulièrement',
  },
  {
    title: 'Expertise reconnue',
    description: "Une équipe d'experts certifiés en cybersécurité",
  },
  {
    title: 'Solutions personnalisées',
    description: 'Des solutions adaptées à vos besoins spécifiques',
  },
];
</script>

<template>
  <section class="features">
    <h2 class="features__title">Nos services</h2>
    <div class="features__grid">
      <FeaturesCard
        v-for="feature in features"
        :key="feature.title"
        :title="feature.title"
        :description="feature.description"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.features {
  padding: $spacing-unit * 6 0;

  &__title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: $spacing-unit * 4;
    color: $text-color;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: $spacing-unit * 3;
  }
}
</style>
