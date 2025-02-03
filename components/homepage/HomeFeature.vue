<script setup lang="ts">
interface Feature {
  title: string;
  text: string;
  icon?: { asset: { url: string } };
}

defineProps<{
  features: Feature[];
}>();
</script>

<template>
  <section v-if="features && features.length" class="features">
    <h2 class="features__title">Features</h2>
    <div class="features__grid">
      <div
        v-for="feature in features"
        :key="feature.title"
        class="features__card"
      >
        <div v-if="feature.icon" class="features__icon-wrapper">
          <img
            :src="feature.icon.asset.url"
            alt="Feature Icon"
            class="features__icon"
          />
        </div>
        <h3 class="features__card-title">{{ feature.title }}</h3>
        <p class="features__text">{{ feature.text }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.features {
  padding: $spacing-unit * 8 $spacing-unit * 4;
  background-color: $primary-color;
  max-width: $container-max-width;
  margin: 0 auto;

  &__title {
    font-family: $font-family-primary;
    font-weight: $font-weight-semibold;
    text-align: center;
    margin-bottom: $spacing-unit * 6;
    font-size: 2.5rem;
    color: $text-color;
  }

  &__grid {
    display: grid;
    gap: $spacing-unit * 4;
    padding: $spacing-unit * 2;
    margin: 0 auto;

    @media (min-width: $breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__card {
    padding: $spacing-unit * 4;
    background: $hover-color;
    border-radius: $border-radius;
    text-align: center;
    transition: $transition-transform;
    box-shadow: $shadow-md;
    border: 1px solid rgba($text-color, 0.05);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:hover {
      transform: translateY(-5px);
    }
  }

  &__icon-wrapper {
    width: 60px;
    height: 60px;
    margin: 0 auto 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__card-title {
    font-weight: $font-weight-medium;
    font-size: 1.5rem;
    margin-bottom: $spacing-unit * 2;
    color: $text-color;
  }

  &__text {
    font-weight: $font-weight-regular;
    color: rgba($text-color, 0.8);
    line-height: 1.6;
  }
}
</style>
