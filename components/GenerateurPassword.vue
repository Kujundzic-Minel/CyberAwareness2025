<script setup lang="ts">
import { ref } from 'vue';

const generatedPassword = ref('');
const length = ref(16);
const useUppercase = ref(true);
const useLowercase = ref(true);
const useNumbers = ref(true);
const useSymbols = ref(true);

const characterSets = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

const generatePassword = () => {
  let chars = '';
  if (useLowercase.value) chars += characterSets.lowercase;
  if (useUppercase.value) chars += characterSets.uppercase;
  if (useNumbers.value) chars += characterSets.numbers;
  if (useSymbols.value) chars += characterSets.symbols;

  let password = '';
  const array = new Uint32Array(length.value);
  window.crypto.getRandomValues(array);

  // Assurer au moins un caractère de chaque type sélectionné
  if (useLowercase.value)
    password +=
      characterSets.lowercase[
        Math.floor(Math.random() * characterSets.lowercase.length)
      ];
  if (useUppercase.value)
    password +=
      characterSets.uppercase[
        Math.floor(Math.random() * characterSets.uppercase.length)
      ];
  if (useNumbers.value)
    password +=
      characterSets.numbers[
        Math.floor(Math.random() * characterSets.numbers.length)
      ];
  if (useSymbols.value)
    password +=
      characterSets.symbols[
        Math.floor(Math.random() * characterSets.symbols.length)
      ];

  // Compléter le reste du mot de passe
  for (let i = password.length; i < length.value; i++) {
    password += chars[array[i] % chars.length];
  }

  // Mélanger le mot de passe
  password = password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
  generatedPassword.value = password;
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedPassword.value);
    alert('Mot de passe copié !');
  } catch {
    alert('Erreur lors de la copie');
  }
};
</script>

<template>
  <div class="generator">
    <h2 class="generator__title">Générateur de mot de passe sécurisé</h2>

    <div class="generator__output">
      <input
        type="text"
        :value="generatedPassword"
        readonly
        class="generator__password"
        placeholder="Votre mot de passe apparaîtra ici"
      />
      <button
        class="generator__copy"
        :disabled="!generatedPassword"
        @click="copyToClipboard"
      >
        Copier
      </button>
    </div>

    <div class="generator__options">
      <div class="generator__length">
        <label>Longueur: {{ length }}</label>
        <input
          v-model="length"
          type="range"
          min="8"
          max="32"
          class="generator__slider"
        />
      </div>

      <div class="generator__checkboxes">
        <label class="generator__option">
          <input v-model="useUppercase" type="checkbox" />
          Majuscules
        </label>
        <label class="generator__option">
          <input v-model="useLowercase" type="checkbox" />
          Minuscules
        </label>
        <label class="generator__option">
          <input v-model="useNumbers" type="checkbox" />
          Chiffres
        </label>
        <label class="generator__option">
          <input v-model="useSymbols" type="checkbox" />
          Symboles
        </label>
      </div>
    </div>

    <button class="generator__button" @click="generatePassword">
      Générer un mot de passe
    </button>
  </div>
</template>

<style scoped lang="scss">
.generator {
  background: $hover-color;
  border-radius: $border-radius;
  padding: $spacing-unit * 4;
  max-width: $container-max-width / 2;
  margin: ($spacing-unit * 4) auto;
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

  &__output {
    display: flex;
    gap: $spacing-unit * 2;
    margin-bottom: $spacing-unit * 3;
  }

  &__password {
    flex: 1;
    padding: $spacing-unit * 1.5;
    background: $primary-color;
    border: 2px solid rgba($text-color, 0.1);
    border-radius: $border-radius;
    color: $text-color;
    font-family: $font-family-primary;
    font-size: $spacing-unit * 2;
    transition: $transition-base;

    &:hover {
      border-color: rgba($accent-color, 0.5);
    }
  }

  &__copy {
    padding: $spacing-unit * 1.5 $spacing-unit * 3;
    background: $accent-color;
    border: none;
    border-radius: $border-radius;
    color: white;
    cursor: pointer;
    font-family: $font-family-primary;
    font-weight: $font-weight-medium;
    transition: $transition-base;

    &:hover {
      background: darken($accent-color, 10%);
    }

    &:disabled {
      background: $disabled-color;
      cursor: not-allowed;
    }
  }

  &__options {
    margin-bottom: $spacing-unit * 3;
  }

  &__length {
    margin-bottom: $spacing-unit * 2;
    color: $text-color;
  }

  &__slider {
    width: 100%;
    margin-top: $spacing-unit;
  }

  &__checkboxes {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-unit * 2;
  }

  &__option {
    color: $text-color;
    display: flex;
    align-items: center;
    gap: $spacing-unit;
    cursor: pointer;

    input[type='checkbox'] {
      cursor: pointer;
    }
  }

  &__button {
    width: 100%;
    padding: $spacing-unit * 2;
    background: $accent-color;
    border: none;
    border-radius: $border-radius;
    color: white;
    font-family: $font-family-primary;
    font-weight: $font-weight-medium;
    font-size: $spacing-unit * 2;
    cursor: pointer;
    transition: $transition-base;

    &:hover {
      background: darken($accent-color, 10%);
    }
  }
}

@media (max-width: $breakpoint-md) {
  .generator {
    margin: $spacing-unit * 2;
    padding: $spacing-unit * 2;

    &__checkboxes {
      grid-template-columns: 1fr;
    }
  }
}
</style>
