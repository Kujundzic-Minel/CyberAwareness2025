<script setup lang="ts">
import { ref, computed } from 'vue';

const password = ref('');

interface PasswordCriteria {
  label: string;
  check: (pwd: string) => boolean;
  points: number;
}

const criteria: PasswordCriteria[] = [
  {
    label: 'Au moins 8 caractères',
    check: (pwd) => pwd.length >= 8,
    points: 10,
  },
  {
    label: 'Au moins 12 caractères',
    check: (pwd) => pwd.length >= 12,
    points: 15,
  },
  {
    label: 'Contient des chiffres',
    check: (pwd) => /\d/.test(pwd),
    points: 10,
  },
  {
    label: 'Contient des minuscules',
    check: (pwd) => /[a-z]/.test(pwd),
    points: 10,
  },
  {
    label: 'Contient des majuscules',
    check: (pwd) => /[A-Z]/.test(pwd),
    points: 15,
  },
  {
    label: 'Contient des symboles',
    check: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    points: 20,
  },
  {
    label: 'Pas de séquences répétées',
    check: (pwd) => !/(.)\1{2,}/.test(pwd),
    points: 20,
  },
];

const strengthScore = computed(() => {
  return criteria.reduce((score, criterion) => {
    return score + (criterion.check(password.value) ? criterion.points : 0);
  }, 0);
});

const strengthLevel = computed(() => {
  if (strengthScore.value >= 90) return { text: 'Très fort', color: '#10B981' };
  if (strengthScore.value >= 70) return { text: 'Fort', color: '#059669' };
  if (strengthScore.value >= 40) return { text: 'Moyen', color: '#F59E0B' };
  return { text: 'Faible', color: '#DC2626' };
});

const estimatedCrackTime = computed(() => {
  const combinations = Math.pow(95, password.value.length); // 95 caractères imprimables ASCII
  const attemptsPerSecond = 10000000000; // 10 milliards/seconde (hypothèse)
  const seconds = combinations / attemptsPerSecond;

  if (seconds < 60) return 'Quelques secondes';
  if (seconds < 3600) return 'Quelques minutes';
  if (seconds < 86400) return 'Quelques heures';
  if (seconds < 2592000) return 'Quelques jours';
  if (seconds < 31536000) return 'Quelques mois';
  return 'Plusieurs années';
});
</script>

<template>
  <div class="password">
    <h2 class="password__title">Testez la force de votre mot de passe</h2>

    <div class="password__input-group">
      <input
        v-model="password"
        type="password"
        placeholder="Entrez un mot de passe"
        class="password__input"
      />
    </div>

    <div class="password__meter">
      <div
        class="password__progress"
        :style="{
          width: `${Math.min(100, strengthScore)}%`,
          backgroundColor: strengthLevel.color,
        }"
      />
    </div>

    <div class="password__info">
      <p class="password__strength">
        Force :
        <span :style="{ color: strengthLevel.color }">{{
          strengthLevel.text
        }}</span>
      </p>
      <p class="password__time">
        Temps estimé pour le cracker : {{ estimatedCrackTime }}
      </p>
    </div>

    <div class="password__criteria">
      <div
        v-for="criterion in criteria"
        :key="criterion.label"
        class="password__criterion"
        :class="{ 'password__criterion--met': criterion.check(password) }"
      >
        <span class="password__check">{{
          criterion.check(password) ? '✓' : '×'
        }}</span>
        {{ criterion.label }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.password {
  background: $hover-color;
  border-radius: $border-radius;
  padding: $spacing-unit * 4;
  max-width: 100%;
  flex: 1;
  margin: 0;
  box-shadow: $shadow-md;
  transition: $transition-base;

  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-lg;
  }

  &__title {
    color: $text-color;
    font-family: $font-family-primary;
    font-weight: $font-weight-semibold;
    font-size: $spacing-unit * 3;
    margin-bottom: $spacing-unit * 3;
    text-align: center;
  }

  &__input-group {
    margin-bottom: $spacing-unit * 3;
  }

  &__input {
    width: 100%;
    padding: $spacing-unit * 1.5;
    border: 2px solid rgba($text-color, 0.1);
    border-radius: $border-radius;
    background: $primary-color;
    color: $text-color;
    font-family: $font-family-primary;
    font-size: $spacing-unit * 2;
    transition: $transition-base;

    &:hover {
      border-color: rgba($accent-color, 0.5);
    }

    &:focus {
      outline: none;
      border-color: $accent-color;
      background: lighten($primary-color, 3%);
    }
  }

  &__meter {
    height: $spacing-unit;
    background: $primary-color;
    border-radius: $border-radius / 2;
    overflow: hidden;
    margin-bottom: $spacing-unit * 2;
  }

  &__progress {
    height: 100%;
    transition: $transition-base;
  }

  &__info {
    text-align: center;
    margin-bottom: $spacing-unit * 3;
    color: $text-color;
  }

  &__strength {
    font-size: $spacing-unit * 2.2;
    margin-bottom: $spacing-unit;
    font-weight: $font-weight-medium;
  }

  &__time {
    color: $text-color;
    font-size: $spacing-unit * 1.8;
  }

  &__criteria {
    display: grid;
    gap: $spacing-unit;
  }

  &__criterion {
    color: $text-color;
    display: flex;
    align-items: center;
    font-size: $spacing-unit * 1.8;
    transition: $transition-base;

    &--met {
      color: $success-color;
    }
  }

  &__check {
    margin-right: $spacing-unit;
    font-weight: $font-weight-bold;
  }

  @media (max-width: 1024px) {
    margin: 0;
    width: 100%;
  }

  @media (max-width: $breakpoint-md) {
    margin: 0;
    padding: $spacing-unit * 2;

    &__title {
      font-size: $spacing-unit * 2.5;
    }

    &__input {
      font-size: $spacing-unit * 1.8;
    }
  }
}
</style>
