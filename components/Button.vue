<template>
  <button
    :type="type"
    :class="['button', `button--${variant}`, { 'button--disabled': disabled }]"
    :disabled="disabled"
    @click.stop="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'success' | 'warning';
    type?: 'button' | 'submit';
    disabled?: boolean;
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
  }
);

const handleClick = (event: MouseEvent) => {
  event.preventDefault();
  if (!event.target || (event.target as HTMLButtonElement).disabled) return;
  emit('click', event);
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/foundations/_variables.scss';

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-unit * 1.5 $spacing-unit * 3;
  border: none;
  border-radius: $border-radius;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;

  &--primary {
    background-color: $accent-color;
    color: $text-color;
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: transparent;
      border-color: $accent-color;
      color: $accent-color;
      transform: translateY(-1px);
    }
  }

  &--secondary {
    background-color: $hover-color;
    color: $text-color;
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: transparent;
      border-color: $text-color;
      transform: translateY(-1px);
    }
  }

  &--success {
    background-color: $accent-color;
    color: $text-color;
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: transparent;
      border-color: $accent-color;
      color: $accent-color;
      transform: translateY(-1px);
    }
  }

  &--warning {
    background-color: $warning-color;
    color: darken($warning-color, 50%);
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: transparent;
      border-color: $warning-color;
      transform: translateY(-1px);
    }
  }

  &--disabled {
    background-color: darken($accent-color, 15%);
    color: rgba($text-color, 0.9);
    cursor: not-allowed;
    transform: none;
    border-color: transparent;
    opacity: 0.85;
    box-shadow: $shadow-sm;

    &:hover {
      transform: none;
      box-shadow: $shadow-sm;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba($accent-color, 0.5);
  }
}
</style>
