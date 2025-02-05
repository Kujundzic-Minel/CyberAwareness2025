<template>
  <div class="search-wrapper">
    <input
      v-model="searchValue"
      type="text"
      :placeholder="placeholder"
      class="search-input"
      @input="$emit('update:modelValue', searchValue)"
    />
    <span v-if="searchValue" class="search-count">
      {{ resultCount }} résultat(s)
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  resultCount: number;
}>();

const _emit = defineEmits(['update:modelValue']);
const searchValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    searchValue.value = newValue;
  }
);
</script>

<style lang="scss" scoped>
.search-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 1rem;
  border: 1px solid $hover-color;
  border-radius: $border-radius;
  background-color: darken($primary-color, 3%);
  color: $text-color;
  font-size: 1rem;
  padding-right: 6rem;
  font-family: $font-family-primary;
  transition: $transition-base;

  &:focus {
    outline: none;
    border-color: $accent-color;
    box-shadow: 0 0 0 2px rgba($accent-color, 0.1);
  }

  &::placeholder {
    color: rgba($text-color, 0.6);
  }
}

.search-count {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.9rem;
  color: rgba($text-color, 0.6);
  font-family: $font-family-primary;
}
</style>
