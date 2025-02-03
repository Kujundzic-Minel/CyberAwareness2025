<script setup lang="ts">
interface Subscription {
  title: string;
  description: string;
  price: string;
  features: string[];
  cta?: { label: string; url: string };
}

defineProps<{
  subscriptions: Subscription[];
}>();
</script>

<template>
  <section v-if="subscriptions && subscriptions.length" class="subscriptions">
    <h2 class="subscriptions__title">Subscriptions</h2>
    <div class="subscriptions__container">
      <div
        v-for="subscription in subscriptions"
        :key="subscription.title"
        class="subscriptions__card"
      >
        <h3 class="subscriptions__card-title">{{ subscription.title }}</h3>
        <div class="subscriptions__card-price">{{ subscription.price }}</div>
        <p class="subscriptions__card-description">
          {{ subscription.description }}
        </p>
        <ul class="subscriptions__card-features">
          <li
            v-for="feature in subscription.features"
            :key="feature"
            class="subscriptions__card-feature"
          >
            {{ feature }}
          </li>
        </ul>
        <div v-if="subscription.cta" class="subscriptions__card-action">
          <a :href="subscription.cta.url" class="subscriptions__card-button">{{
            subscription.cta.label
          }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.subscriptions {
  font-family: $font-family-primary;
  padding: $spacing-unit * 4;
  background-color: $primary-color;

  &__title {
    text-align: center;
    margin-bottom: $spacing-unit * 4;
    font-size: 2.5rem;
    color: $text-color;
    font-weight: $font-weight-bold;
  }

  &__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: $spacing-unit * 4;
    padding: $spacing-unit * 2;
    max-width: $container-max-width;
    margin: 0 auto;
  }

  &__card {
    background: $hover-color;
    border-radius: $border-radius;
    padding: $spacing-unit * 4;
    box-shadow: $shadow-md;
    transition: $transition-transform;
    text-align: center;

    &:hover {
      transform: translateY(-10px);
    }

    &-title {
      font-size: 1.8rem;
      color: $text-color;
      margin-bottom: $spacing-unit * 2;
      font-weight: $font-weight-semibold;
    }

    &-price {
      font-size: 3rem;
      font-weight: $font-weight-bold;
      color: $accent-color;
      margin: $spacing-unit * 3 0;
    }

    &-description {
      color: rgba($text-color, 0.8);
      margin-bottom: $spacing-unit * 4;
      line-height: 1.6;
    }

    &-features {
      list-style: none;
      padding: 0;
      margin: $spacing-unit * 4 0;
    }

    &-feature {
      padding: $spacing-unit 0;
      color: rgba($text-color, 0.8);

      &::before {
        content: '✓';
        color: $accent-color;
        margin-right: $spacing-unit;
      }
    }

    &-button {
      display: inline-block;
      padding: $spacing-unit * 2 $spacing-unit * 4;
      background: $accent-color;
      color: white;
      text-decoration: none;
      border-radius: 30px;
      font-weight: $font-weight-semibold;
      transition: $transition-base;

      &:hover {
        background: darken($accent-color, 10%);
      }
    }
  }

  @media (max-width: $breakpoint-md) {
    padding: $spacing-unit * 2;

    &__title {
      font-size: 2rem;
    }

    &__card {
      &-title {
        font-size: 1.5rem;
      }

      &-price {
        font-size: 2.5rem;
      }
    }
  }
}
</style>
