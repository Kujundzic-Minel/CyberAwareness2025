<script setup lang="ts">
import PaymentForm from '@/components/PaymentForm.vue';

const premiumPlan = {
  title: 'Premium Plan',
  price: '$9.99/month',
  description: 'Unlock the full potential of habit tracking',
  features: [
    'Unlimited habits tracking',
    'Advanced analytics & insights',
    'Custom reminder schedules',
    'Priority support',
    'Detailed progress reports',
    'Goal setting & tracking',
    'Data export options',
    'Multiple device sync',
    'Personal coach AI assistant',
    'Premium templates',
  ],
};
</script>

<template>
  <div class="payment">
    <section class="payment__plan">
      <h1 class="payment__plan-title">{{ premiumPlan.title }}</h1>
      <div class="payment__plan-price">{{ premiumPlan.price }}</div>
      <p class="payment__plan-description">{{ premiumPlan.description }}</p>
      <ul class="payment__plan-features">
        <li
          v-for="feature in premiumPlan.features"
          :key="feature"
          class="payment__plan-feature"
        >
          {{ feature }}
        </li>
      </ul>
    </section>

    <PaymentForm />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/foundations/_variables.scss';

.payment {
  max-width: 800px;
  margin: 0 auto;
  padding: $spacing-unit * 3;

  &__plan {
    background-color: $primary-color;
    border-radius: $border-radius;
    padding: $spacing-unit * 4;
    margin-bottom: $spacing-unit * 4;
    box-shadow: $shadow-lg;
    border: 1px solid rgba($accent-color, 0.3);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(
        90deg,
        $accent-color,
        lighten($accent-color, 20%)
      );
    }

    &-title {
      color: $accent-color;
      font-size: 2.8rem;
      font-weight: $font-weight-bold;
      margin-bottom: $spacing-unit * 2;
      text-align: center;
      text-shadow: 0 2px 4px rgba($accent-color, 0.2);
    }

    &-price {
      font-size: 3.5rem;
      color: $text-color;
      text-align: center;
      margin-bottom: $spacing-unit * 3;
      font-weight: $font-weight-bold;
      background: linear-gradient(135deg, $text-color, $accent-color);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      padding: $spacing-unit 0;
    }

    &-description {
      color: $text-color;
      text-align: center;
      font-size: 1.3rem;
      margin-bottom: $spacing-unit * 4;
      line-height: 1.6;
      padding: 0 $spacing-unit * 2;
    }

    &-features {
      list-style: none;
      padding: $spacing-unit * 2;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: $spacing-unit * 2;
      background: rgba($hover-color, 0.5);
      border-radius: $border-radius;
    }

    &-feature {
      color: $text-color;
      padding: $spacing-unit * 2;
      position: relative;
      padding-left: $spacing-unit * 4;
      transition: $transition-base;
      border-radius: $border-radius;

      &::before {
        content: '✓';
        position: absolute;
        left: $spacing-unit * 2;
        color: $accent-color;
        font-weight: $font-weight-bold;
        font-size: 1.2rem;
      }

      &:hover {
        background-color: rgba($accent-color, 0.1);
        transform: translateX($spacing-unit);
      }
    }
  }

  @media (max-width: $breakpoint-md) {
    padding: $spacing-unit * 2;

    &__plan {
      padding: $spacing-unit * 3;

      &-title {
        font-size: 2.2rem;
      }

      &-price {
        font-size: 2.8rem;
      }

      &-description {
        font-size: 1.1rem;
      }
    }
  }
}
</style>
