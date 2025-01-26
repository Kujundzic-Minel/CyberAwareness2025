<template>
  <div class="switch-auth">
    <div class="switch-auth__container">
      <div
        class="switch-auth__slider"
        :style="{ transform: `translateX(${modelValue ? '0' : '100%'})` }"
      />
      <button
        class="switch-auth__btn"
        :class="{ 'switch-auth__btn--active': modelValue }"
        @click="$emit('update:modelValue', true)"
      >
        Connexion
      </button>
      <button
        class="switch-auth__btn"
        :class="{ 'switch-auth__btn--active': !modelValue }"
        @click="$emit('update:modelValue', false)"
      >
        Inscription
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  'update:modelValue': [value: boolean];
}>();
</script>

<style lang="scss" scoped>
.switch-auth {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  &__container {
    display: inline-flex;
    background-color: darken($primary-color, 5%);
    padding: 0.25rem;
    border-radius: 8px;
    position: relative;
    min-width: 260px;
  }

  &__btn {
    flex: 1;
    padding: 0.75rem 1.5rem;
    border: none;
    background: none;
    color: $text-color;
    cursor: pointer;
    font-weight: 500;
    position: relative;
    z-index: 1;
    transition: color 200ms ease;

    &--active {
      color: white;
    }

    &:hover:not(&--active) {
      color: $accent-color;
    }
  }

  &__slider {
    position: absolute;
    left: 0.25rem;
    top: 0.25rem;
    width: calc(50% - 0.25rem);
    height: calc(100% - 0.5rem);
    background-color: $accent-color;
    border-radius: 6px;
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>
