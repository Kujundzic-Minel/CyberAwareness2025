<script setup lang="ts">
import pb from '../../services/pocketbase';

interface Feature {
  id: string;
  title: string;
  description: string;
}

const features = ref<Feature[]>([]);

const getFeatures = async () => {
  try {
    const records = await pb.collection('about_feature').getFullList();
    features.value = records.map((record) => ({
      id: record.id,
      title: record.title,
      description: record.description,
    }));
  } catch (error) {
    console.error('Error fetching features:', error);
  }
};

onMounted(() => {
  getFeatures();
});
</script>

<template>
  <section class="features">
    <h2 class="features__title">Nos services</h2>
    <div class="features__grid">
      <FeaturesCard
        v-for="feature in features"
        :key="feature.id"
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
