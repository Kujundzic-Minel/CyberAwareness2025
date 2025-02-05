<script setup lang="ts">
interface Stat {
  title: string;
  value: string;
}

interface CTA {
  label: string;
  url: string;
}

interface Hero {
  title: string;
  text: string;
  backgroundImage?: { asset: { url: string } };
  cta: CTA[];
  stats: Stat[];
}

defineProps<{
  hero: Hero;
}>();
</script>

<template>
  <section v-if="hero" class="hero">
    <div v-if="hero.backgroundImage" class="hero__background">
      <img
        :src="hero.backgroundImage.asset.url"
        alt="Hero Background"
        class="hero__background-image"
      />
    </div>
    <div class="hero__content">
      <h2 class="hero__title">{{ hero.title }}</h2>
      <p class="hero__text">{{ hero.text }}</p>
      <div class="hero__stats">
        <div v-for="stat in hero.stats" :key="stat.title" class="hero__stat">
          <h3 class="hero__stat-title">{{ stat.title }}</h3>
          <p class="hero__stat-value">{{ stat.value }}</p>
        </div>
      </div>
      <div class="hero__ctas">
        <a
          v-for="cta in hero.cta"
          :key="cta.label"
          :href="cta.url"
          class="hero__cta"
        >
          {{ cta.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  font-family: $font-family-primary;
  overflow: hidden;

  &__background {
    position: absolute;
    width: 100%;
    height: 100%;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba($primary-color, 0.5);
    }
  }

  &__background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__content {
    position: relative;
    z-index: 1;
    color: $text-color;
    padding: $spacing-unit * 4;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-width: $container-max-width;
    margin: 0 auto;
  }

  &__title {
    font-size: 3.5rem;
    font-weight: $font-weight-bold;
    margin-bottom: $spacing-unit * 2;
    text-shadow: 2px 2px 4px $shadow-color;
  }

  &__text {
    font-size: 1.2rem;
    max-width: 600px;
    margin-bottom: $spacing-unit * 4;
    line-height: 1.6;
    text-align: justify;
  }

  &__stats {
    display: flex;
    gap: $spacing-unit * 4;
    margin-bottom: $spacing-unit * 4;
  }

  &__stat {
    background: rgba($hover-color, 0.1);
    backdrop-filter: blur(10px);
    padding: $spacing-unit * 3;
    border-radius: $border-radius;
    min-width: 150px;
  }

  &__cta {
    background: $accent-color;
    color: white;
    padding: $spacing-unit * 2 $spacing-unit * 4;
    border-radius: 30px;
    text-decoration: none;
    font-weight: $font-weight-semibold;
    transition: $transition-transform;

    &:hover {
      transform: translateY(-2px);
      background: darken($accent-color, 10%);
    }
  }
}
</style>
