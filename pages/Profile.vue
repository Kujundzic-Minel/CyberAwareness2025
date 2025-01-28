<template>
  <div class="profile-container">
    <UserProfile
      v-if="user"
      :user="{
        username: user.username,
        total_points: user.total_points,
        current_grade: {
          name: user.expand?.current_grade?.name || 'Non défini',
        },
      }"
    />
    <div v-if="results.length > 0" class="quiz-results">
      <h2>Quiz joués</h2>
      <ul>
        <li v-for="result in results" :key="result.id" class="result-item">
          <span>{{ result.expand?.theme?.title || 'Quiz inconnu' }}</span>
          <span>{{ result.score }} points</span>
          <span>{{ formatDate(result.completed_at) }}</span>
        </li>
      </ul>
      <div class="stats">
        <p>Score total: {{ totalScore }} points</p>
        <p>Moyenne: {{ averageScore }} points/quiz</p>
      </div>
    </div>
    <p v-else>Aucun quiz complété pour le moment.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import pb from '@/services/pocketbase';
import UserProfile from '@/components/UserProfil.vue';

interface Grade {
  id: string;
  name: string;
}

interface User {
  id: string;
  username: string;
  total_points: number;
  expand?: {
    current_grade?: Grade;
  };
}

interface Theme {
  id: string;
  title: string;
  slug: string;
}

interface QuizResult {
  id: string;
  score: number;
  completed_at: string;
  theme: string;
  user: string;
  expand?: {
    theme?: Theme;
  };
}

const router = useRouter();
const user = ref<User | null>(null);
const results = ref<QuizResult[]>([]);

// Vérification de l'authentification
onMounted(async () => {
  if (!pb.authStore.isValid) {
    router.push('/login');
    return;
  }

  try {
    const userId = pb.authStore.model?.id;
    if (!userId) throw new Error('Utilisateur non connecté');

    const [userData, resultsData] = await Promise.all([
      pb.collection('users').getOne<User>(userId, {
        expand: 'current_grade',
      }),
      pb.collection('quiz_results').getFullList<QuizResult>({
        filter: `user="${userId}"`,
        sort: '-completed_at',
        expand: 'theme',
      }),
    ]);

    user.value = userData;
    results.value = resultsData;
  } catch (error) {
    console.error('Erreur lors du chargement du profil:', error);
    router.push('/login');
  }
});

// Calcul des statistiques
const totalScore = computed(() =>
  results.value.reduce((sum, result) => sum + result.score, 0)
);

const averageScore = computed(() =>
  results.value.length > 0
    ? Math.round(totalScore.value / results.value.length)
    : 0
);

// Formatage de la date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.quiz-results {
  margin-top: 20px;
}

.result-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 16px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.stats {
  margin-top: 20px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
}
</style>
