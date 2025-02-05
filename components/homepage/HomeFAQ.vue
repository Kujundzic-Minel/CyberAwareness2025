<script setup lang="ts">
interface FAQItem {
  question: string;
  answer: string;
}

defineProps<{
  faq: FAQItem[];
}>();
</script>

<template>
  <section v-if="faq && faq.length" class="faq">
    <h2 class="faq__title">FAQ</h2>
    <div class="faq__list">
      <div v-for="item in faq" :key="item.question" class="faq__item">
        <h3 class="faq__question">{{ item.question }}</h3>
        <p class="faq__answer">{{ item.answer }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.faq {
  padding: $spacing-unit * 8 $spacing-unit * 4;
  max-width: 800px;
  margin: 0 auto;

  &__title {
    text-align: center;
    margin-bottom: $spacing-unit * 6;
    font-size: 2.5rem;
    font-family: $font-family-primary;
    font-weight: $font-weight-semibold;
    color: $text-color;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $spacing-unit * 3;
  }

  &__item {
    padding: $spacing-unit * 3;
    background: $hover-color;
    border-radius: $border-radius;
    box-shadow: $shadow-sm;
    transition: $transition-transform;

    &:hover {
      transform: translateX(5px);
    }
  }

  &__question {
    font-size: 1.25rem;
    margin-bottom: $spacing-unit * 1.5;
    color: $text-color;
    font-weight: $font-weight-medium;
  }

  &__answer {
    color: rgba($text-color, 0.8);
    line-height: 1.6;
    font-weight: $font-weight-regular;
    text-align: justify;
  }

  @media (max-width: $breakpoint-sm) {
    padding: $spacing-unit * 4 $spacing-unit * 2;

    &__title {
      font-size: 2rem;
    }

    &__question {
      font-size: 1.1rem;
    }
  }
}
</style>
