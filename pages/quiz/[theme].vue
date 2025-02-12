<template>
  <div class="quiz-container">
    <div v-if="loading" class="loading-state">Chargement du quiz...</div>

    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button class="retry-button" @click="reloadQuiz">Réessayer</button>
      <NuxtLink to="/quizz" class="back-button"> Retour aux quiz </NuxtLink>
    </div>

    <div v-else-if="theme" class="quiz-content">
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
import pb from '@/services/pocketbase';

useSeoMeta({
  title: 'Cyber Awareness',
});

interface Quiz {
  id: string;
  title: string;
  choices: string[];
  correct_answer: string;
  points: number;
  hint: string;
  theme: string;
  created: string;
}

interface Theme {
  id: string;
  title: string;
  slug: string;
}

interface QuizResult {
  user: string;
  theme: string;
  score: number;
  completed_at: Date;
}

const route = useRoute();
const router = useRouter();
const questions = ref<Quiz[]>([]);
const currentIndex = ref(0);
const hasAnswered = ref(false);
const totalPoints = ref(0);
const theme = ref<Theme | null>(null);
const loading = ref(true);
const error = ref<string>('');

const loadQuiz = async () => {
  const themeSlug = route.params.theme as string;

  try {
    loading.value = true;
    error.value = '';

    const records = await pb.collection('themes').getList<Theme>(1, 1, {
      filter: `slug = "${themeSlug}"`,
    });

    if (records.items.length === 0) {
      throw new Error('Quiz non trouvé');
    }

    theme.value = records.items[0];

    const fetchedQuestions = await pb.collection('quizzes').getFullList<Quiz>({
      filter: `theme = "${theme.value.id}"`,
      sort: 'created',
    });

    questions.value = fetchedQuestions.map((q) => ({
      ...q,
      correct_answer: q.correct_answer ? JSON.parse(q.correct_answer) : '',
    }));
  } catch (err) {
    console.error('Erreur lors du chargement des questions:', err);
    error.value =
      err instanceof Error ? err.message : 'Impossible de charger le quiz';

    if (err instanceof Error && err.message.includes('404')) {
      router.push('/quizz');
    }
  } finally {
    loading.value = false;
  }
};

const reloadQuiz = () => {
  loadQuiz();
};

onMounted(() => {
  loadQuiz();
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
    const quizResult: QuizResult = {
      user: pb.authStore.model?.id ?? '',
      theme: theme.value?.id ?? '',
      score: totalPoints.value,
      completed_at: new Date(),
    };

    await pb.collection('quiz_results').create(quizResult);
    router.push('/profile');
  } catch (err) {
    console.error("Erreur lors de l'enregistrement du résultat:", err);
    error.value = "Erreur lors de l'enregistrement du résultat";
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/foundations/_variables.scss';

.quiz-container {
  max-width: 800px;
  margin: 0 auto;
  padding: $spacing-unit * 2.5;

  .loading-state {
    text-align: center;
    padding: 2rem;
    color: $primary-color;
  }

  .error-state {
    text-align: center;
    padding: 2rem;

    p {
      color: #dc3545;
      margin-bottom: 1rem;
    }

    .retry-button,
    .back-button {
      padding: 0.5rem 1rem;
      margin: 0.5rem;
      border-radius: 4px;
      cursor: pointer;
    }

    .retry-button {
      background-color: $primary-color;
      color: white;
      border: none;

      &:hover {
        background-color: darken($primary-color, 10%);
      }
    }

    .back-button {
      background-color: #f8f9fa;
      color: #333;
      text-decoration: none;
      border: 1px solid #ddd;

      &:hover {
        background-color: #e9ecef;
      }
    }
  }

  .navigation {
    display: flex;
    justify-content: center;
    gap: $spacing-unit * 2;
    margin-top: $spacing-unit * 3;
  }
}
</style>
