<template>
  <div class="quiz-container">
    <div v-if="questions.length === 0" class="loading">
      Chargement du quiz...
    </div>
    <div v-else>
      <QuizCard
        v-if="currentQuestion"
        :quiz="currentQuestion"
        @answer-selected="handleAnswer"
      />
      <ProgressBar :current="currentIndex + 1" :total="questions.length" />
      <div class="navigation">
        <Button
          v-if="currentIndex < questions.length - 1"
          :disabled="!hasAnswered"
          variant="success"
          @click="nextQuestion"
        >
          Question suivante
        </Button>
        <Button
          v-else
          :disabled="!hasAnswered"
          variant="primary"
          @click="finishQuiz"
        >
          Terminer le quiz
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import pb from '@/services/pocketbase';
import QuizCard from '@/components/QuizCard.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import Button from '@/components/Button.vue';

interface Quiz {
  id: string;
  title: string;
  choices: string[];
  correct_answer: string; // Changé de correctAnswer à correct_answer
  points: number;
  hint: string;
  theme: string;
}

const route = useRoute();
const router = useRouter();
const questions = ref<Quiz[]>([]);
const currentIndex = ref(0);
const hasAnswered = ref(false);
const totalPoints = ref(0);

onMounted(async () => {
  if (!pb.authStore.isValid) {
    router.push('/login');
    return;
  }

  try {
    const theme = await pb
      .collection('themes')
      .getFirstListItem(`slug="${route.params.theme}"`);

    if (!theme) {
      console.error('Thème non trouvé');
      router.push('/quizz');
      return;
    }

    const fetchedQuestions = await pb.collection('quizzes').getFullList<Quiz>({
      filter: `theme="${theme.id}"`,
      sort: 'created',
    });

    // Nettoyer les données reçues
    questions.value = fetchedQuestions.map((q) => ({
      ...q,
      correct_answer: JSON.parse(q.correct_answer), // Enlever les guillemets supplémentaires
    }));
  } catch (error) {
    console.error('Erreur lors du chargement des questions:', error);
    // Ne pas rediriger immédiatement en cas d'erreur
    // Afficher un message d'erreur à l'utilisateur à la place
  }
});

const currentQuestion = computed(() => questions.value[currentIndex.value]);

const handleAnswer = (isCorrect: boolean) => {
  hasAnswered.value = true;
  if (isCorrect) {
    totalPoints.value += currentQuestion.value.points;
  }
};

const nextQuestion = () => {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++;
    hasAnswered.value = false;
  }
};

const finishQuiz = async () => {
  try {
    await pb.collection('quiz_results').create({
      user: pb.authStore.model?.id,
      theme: route.params.theme,
      score: totalPoints.value,
      completed_at: new Date(),
    });
    router.push('/profile');
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du résultat:", error);
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/foundations/_variables.scss';

.quiz-container {
  max-width: 800px;
  margin: 0 auto;
  padding: $spacing-unit * 2.5;

  .loading {
    text-align: center;
    padding: $spacing-unit * 2.5;
    font-size: 1.2em;
    color: $text-color;
  }

  .navigation {
    display: flex;
    justify-content: center;
    gap: $spacing-unit * 2;
    margin-top: $spacing-unit * 3;
  }
}
</style>
