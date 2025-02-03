<script setup lang="ts">
interface Testimonial {
  name: string;
  role: string;
  feedback: string;
  photo?: { asset: { url: string } };
}

defineProps<{
  testimonials: Testimonial[];
}>();
</script>

<template>
  <section v-if="testimonials && testimonials.length" class="testimonials">
    <h2 class="testimonials__title">Témoignages</h2>
    <div class="testimonials__grid">
      <div
        v-for="testimonial in testimonials"
        :key="testimonial.name"
        class="testimonials__card"
      >
        <div v-if="testimonial.photo" class="testimonials__image-wrapper">
          <img
            :src="testimonial.photo.asset.url"
            :alt="testimonial.name"
            class="testimonials__image"
          />
        </div>
        <h3 class="testimonials__name">{{ testimonial.name }}</h3>
        <p class="testimonials__role">{{ testimonial.role }}</p>
        <blockquote class="testimonials__quote">
          {{ testimonial.feedback }}
        </blockquote>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.testimonials {
  padding: $spacing-unit * 8 $spacing-unit * 4;
  max-width: $container-max-width;
  margin: 0 auto;

  &__title {
    text-align: center;
    margin-bottom: $spacing-unit * 6;
    font-size: 2.5rem;
    font-family: $font-family-primary;
    font-weight: $font-weight-semibold;
    color: $text-color;
  }

  &__grid {
    display: grid;
    gap: $spacing-unit * 4;
    padding: $spacing-unit * 2;
    margin: 0 auto;

    @media (min-width: $breakpoint-md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__card {
    padding: $spacing-unit * 4;
    background: $primary-color;
    border-radius: $border-radius;
    box-shadow: $shadow-md;
    border: 1px solid rgba($text-color, 0.05);
    transition: $transition-transform;

    &:hover {
      transform: translateY(-5px);
    }
  }

  &__image-wrapper {
    width: 80px;
    height: 80px;
    margin: 0 auto 1rem;
  }

  &__image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  &__name {
    text-align: center;
    font-size: 1.25rem;
    margin-bottom: $spacing-unit;
    color: $text-color;
    font-weight: $font-weight-medium;
  }

  &__role {
    text-align: center;
    color: rgba($text-color, 0.7);
    margin-bottom: $spacing-unit * 2;
    font-weight: $font-weight-regular;
  }

  &__quote {
    font-style: italic;
    color: $text-color;
    line-height: 1.6;
    font-weight: $font-weight-regular;
  }
}
</style>
