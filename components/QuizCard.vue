<template>
  <div class="quiz-card">
    <h2 class="quiz-card__title">{{ quiz.title }}</h2>
    <form class="quiz-card__form" @submit.prevent="submitAnswer">
      <div class="quiz-card__choices">
        <div
          v-for="(choice, index) in quiz.choices"
          :key="index"
          class="quiz-card__choice"
          :class="{
            'quiz-card__choice--correct':
              answered && choice === quiz.correct_answer,
            'quiz-card__choice--incorrect':
              answered &&
              selectedAnswer === choice &&
              choice !== quiz.correct_answer,
          }"
        >
          <input
            :id="'choice-' + index"
            v-model="selectedAnswer"
            type="radio"
            :value="choice"
            :disabled="answered"
            :name="'quiz-answer'"
            class="quiz-card__radio"
          />
          <label :for="'choice-' + index" class="quiz-card__label">
            {{ choice }}
          </label>
        </div>
      </div>
      <div class="quiz-card__actions">
        <Button
          type="submit"
          :disabled="!selectedAnswer || answered"
          variant="primary"
        >
          Valider
        </Button>
        <Button :disabled="answered" variant="secondary" @click="toggleHint">
          {{ hintVisible ? "Masquer l'indice" : "Afficher l'indice" }}
        </Button>
      </div>
    </form>
    <p v-if="hintVisible" class="quiz-card__hint">
      {{ quiz.hint }}
    </p>
    <div
      v-if="answered"
      class="quiz-card__result"
      :class="{
        'quiz-card__result--correct': isCorrect,
        'quiz-card__result--incorrect': !isCorrect,
      }"
    >
      {{ resultMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Button from './Button.vue';

interface QuizQuestion {
  title: string;
  choices: string[];
  correct_answer: string;
  hint: string;
  points: number;
}

const props = defineProps<{
  quiz: QuizQuestion;
}>();

const emit = defineEmits<{
  (e: 'answer-selected', isCorrect: boolean): void;
}>();

const selectedAnswer = ref<string>('');
const answered = ref(false);
const hintVisible = ref(false);
const isCorrect = ref(false);

// Réinitialiser l'état quand la question change
watch(
  () => props.quiz,
  () => {
    selectedAnswer.value = '';
    answered.value = false;
    hintVisible.value = false;
    isCorrect.value = false;
  },
  { deep: true }
);

const toggleHint = () => {
  hintVisible.value = !hintVisible.value;
};

const submitAnswer = () => {
  if (!selectedAnswer.value || answered.value) return;

  answered.value = true;
  isCorrect.value = selectedAnswer.value === props.quiz.correct_answer;
  console.log('Réponse donnée:', selectedAnswer.value);
  console.log('Réponse correcte:', props.quiz.correct_answer);
  console.log('Est correcte:', isCorrect.value);
  emit('answer-selected', isCorrect.value);
};

const resultMessage = computed(() => {
  if (!answered.value) return '';
  if (isCorrect.value) {
    return `Bonne réponse ! +${props.quiz.points} points`;
  }
  if (!props.quiz.correct_answer) {
    return 'Erreur: Réponse correcte non définie';
  }
  return `Mauvaise réponse. La bonne réponse était : ${props.quiz.correct_answer}`;
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/foundations/_variables.scss';

.quiz-card {
  max-width: 800px;
  margin: 0 auto;
  padding: $spacing-unit * 3;
  background-color: $primary-color;
  border-radius: $border-radius;
  box-shadow: 0 $spacing-unit $spacing-unit * 2 $shadow-color;

  &__title {
    color: $text-color;
    margin-bottom: $spacing-unit * 3;
    font-size: 1.5rem;
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $spacing-unit * 3;
  }

  &__choices {
    display: flex;
    flex-direction: column;
    gap: $spacing-unit * 2;
  }

  &__choice {
    position: relative;
    border: 2px solid $hover-color;
    border-radius: $border-radius;
    transition: all 0.2s ease;
    background-color: $primary-color;

    &:hover:not(&--correct):not(&--incorrect) {
      background-color: $hover-color;
      transform: translateY(-1px);
    }

    &--correct {
      background-color: rgba($success-color, 0.2);
      border-color: $success-color;
    }

    &--incorrect {
      background-color: rgba($error-color, 0.2);
      border-color: $error-color;
    }
  }

  &__radio {
    position: absolute;
    opacity: 0;

    &:checked + .quiz-card__label {
      background-color: $hover-color;
      border-radius: $border-radius;
    }

    &:focus + .quiz-card__label {
      outline: 2px solid $accent-color;
      outline-offset: 2px;
      border-radius: $border-radius;
    }
  }

  &__label {
    display: block;
    padding: $spacing-unit * 2;
    cursor: pointer;
    color: $text-color;
    transition: all 0.2s ease;
    border-radius: $border-radius;
  }

  &__actions {
    display: flex;
    gap: $spacing-unit * 2;
    justify-content: center;
    margin-top: $spacing-unit * 2;
  }

  &__hint {
    margin-top: $spacing-unit * 2;
    padding: $spacing-unit * 2;
    background-color: rgba($warning-color, 0.1);
    border: 1px solid $warning-color;
    color: $text-color;
    border-radius: $border-radius;
  }

  &__result {
    margin-top: $spacing-unit * 2;
    padding: $spacing-unit * 2;
    border-radius: $border-radius;
    text-align: center;
    font-weight: bold;
    color: $text-color;

    &--correct {
      background-color: rgba($success-color, 0.2);
      border: 1px solid $success-color;
    }

    &--incorrect {
      background-color: rgba($error-color, 0.2);
      border: 1px solid $error-color;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
