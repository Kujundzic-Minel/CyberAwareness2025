<script setup lang="ts">
const messages = [
  "1 mois offert pour une souscription a l'offre pro",
  'Profitez de -20% sur votre abonnement annuel',
  'Formation cybersécurité incluse',
];
</script>

<template>
  <div class="promotion">
    <div class="promotion__container">
      <div
        v-for="(message, index) in messages"
        :key="`first-${index}`"
        class="promotion__group"
      >
        <span class="promotion__text">{{ message }}</span>
        <span class="promotion__separator">•</span>
      </div>
      <div
        v-for="(message, index) in messages"
        :key="`second-${index}`"
        class="promotion__group"
      >
        <span class="promotion__text">{{ message }}</span>
        <span class="promotion__separator">•</span>
      </div>
      <div
        v-for="(message, index) in messages"
        :key="`third-${index}`"
        class="promotion__group"
      >
        <span class="promotion__text">{{ message }}</span>
        <span class="promotion__separator">•</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.promotion {
  width: 100%;
  background-color: $accent-color;
  overflow: hidden;
  padding: $spacing-unit;

  &__container {
    display: flex;
    white-space: nowrap;
    animation: scrollX 40s linear infinite;
  }

  &__group {
    display: flex;
    align-items: center;
    gap: $spacing-unit * 2;
  }

  &__text {
    color: white;
    font-family: $font-family-primary;
    font-weight: $font-weight-semibold;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    flex-shrink: 0;
  }

  &__separator {
    color: white;
    opacity: 0.7;
    flex-shrink: 0;
  }
}

@keyframes scrollX {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.333%);
  }
}

.promotion:hover .promotion__container {
  animation-play-state: paused;
}
</style>
