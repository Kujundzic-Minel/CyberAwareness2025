<script setup lang="ts">
import Button from '@/components/Button.vue';

interface Subscription {
  title: string;
  description: string;
  price: string;
  features: string[];
  isDisabled?: boolean;
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
        :class="{ 'subscriptions__card--disabled': subscription.isDisabled }"
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
        <div class="subscriptions__card-action">
          <Button
            v-if="subscription.cta"
            :variant="subscription.isDisabled ? 'primary' : 'primary'"
            :disabled="subscription.isDisabled"
            class="subscriptions__card-button"
          >
            <template v-if="subscription.isDisabled"> Current Plan </template>
            <NuxtLink v-else to="/PremiumSub" class="subscriptions__card-link">
              {{ subscription.cta?.label }}
            </NuxtLink>
          </Button>
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
      text-align: justify;
    }

    &-features {
      list-style: none;
      padding: 0;
      margin: $spacing-unit * 4 0;
    }

    &-feature {
      padding: $spacing-unit 0;
      color: rgba($text-color, 0.8);
      text-align: justify;
    }

    &-action {
      margin-top: $spacing-unit * 3;
      display: flex;
      justify-content: center;
    }

    &--disabled {
      opacity: 1;
      cursor: default;
      transform: none !important;

      &:hover {
        transform: none !important;
      }

      .subscriptions__card-price,
      .subscriptions__card-title,
      .subscriptions__card-description,
      .subscriptions__card-feature {
        color: $disabled-color;
      }

      .subscriptions__card-feature::before {
        color: $disabled-color;
      }
    }

    &-link {
      color: inherit;
      text-decoration: none;
      display: block;
      width: 100%;
      height: 100%;
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
