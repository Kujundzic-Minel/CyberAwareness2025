<script setup lang="ts">
import { ref } from 'vue';

const paymentInfo = ref({
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  name: '',
});

const processing = ref(false);

const handlePayment = async () => {
  processing.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  alert('Payment processed successfully!');
  processing.value = false;
};
</script>

<template>
  <section class="payment__form">
    <h2 class="payment__form-title">Payment Details</h2>
    <form class="payment__form-container" @submit.prevent="handlePayment">
      <div class="payment__form-group">
        <label class="payment__form-label">Card Holder Name</label>
        <input
          v-model="paymentInfo.name"
          class="payment__form-input"
          type="text"
          placeholder="John Doe"
          required
        />
      </div>

      <div class="payment__form-group">
        <label class="payment__form-label">Card Number</label>
        <input
          v-model="paymentInfo.cardNumber"
          class="payment__form-input"
          type="text"
          placeholder="1234 5678 9012 3456"
          maxlength="19"
          required
        />
      </div>

      <div class="payment__form-row">
        <div class="payment__form-group">
          <label class="payment__form-label">Expiry Date</label>
          <input
            v-model="paymentInfo.expiryDate"
            class="payment__form-input"
            type="text"
            placeholder="MM/YY"
            maxlength="5"
            required
          />
        </div>

        <div class="payment__form-group">
          <label class="payment__form-label">CVV</label>
          <input
            v-model="paymentInfo.cvv"
            class="payment__form-input"
            type="text"
            placeholder="123"
            maxlength="3"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        class="payment__form-button"
        :class="{ 'payment__form-button--processing': processing }"
        :disabled="processing"
      >
        {{ processing ? 'Processing...' : 'Pay Now' }}
      </button>
    </form>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/foundations/_variables.scss';

.payment__form {
  max-width: 600px;
  margin: 0 auto;
  background-color: $primary-color;
  border-radius: $border-radius;
  padding: $spacing-unit * 4;
  box-shadow: $shadow-md;

  &-title {
    color: $text-color;
    font-size: 1.8rem;
    font-weight: $font-weight-semibold;
    margin-bottom: $spacing-unit * 3;
  }

  &-container {
    display: flex;
    flex-direction: column;
    gap: $spacing-unit * 2;
  }

  &-group {
    display: flex;
    flex-direction: column;
    gap: $spacing-unit;
  }

  &-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-unit * 2;
  }

  &-label {
    color: $text-color;
    font-size: 0.9rem;
    font-weight: $font-weight-medium;
  }

  &-input {
    background-color: $hover-color;
    border: 1px solid transparent;
    border-radius: $border-radius;
    padding: $spacing-unit * 1.5;
    color: $text-color;
    font-size: 1rem;
    transition: $transition-base;

    &:focus {
      outline: none;
      border-color: $accent-color;
    }

    &::placeholder {
      color: darken($text-color, 30%);
    }
  }

  &-button {
    background-color: $accent-color;
    color: white;
    border: none;
    border-radius: $border-radius;
    padding: $spacing-unit * 2;
    font-size: 1.1rem;
    font-weight: $font-weight-semibold;
    cursor: pointer;
    transition: $transition-base;
    margin-top: $spacing-unit * 2;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: $shadow-md;
    }

    &:disabled {
      background-color: $disabled-color;
      cursor: not-allowed;
    }

    &--processing {
      background-color: darken($accent-color, 15%);
    }
  }

  @media (max-width: $breakpoint-sm) {
    padding: $spacing-unit * 2;

    &-row {
      grid-template-columns: 1fr;
    }
  }
}
</style>
