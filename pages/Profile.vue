<template>
  <div class="profile-container">
    <div v-if="loading" class="loading-state">
      <div class="loader" />
      <p>Chargement de votre profil...</p>
    </div>

    <div v-else-if="error" class="error-state">
      {{ error }}
      <button class="retry-button" @click="reloadData">Réessayer</button>
    </div>

    <div v-else class="profile-content">
      <ProfileHeader
        :user="user || {}"
        @avatar-updated="reloadData"
        @error="handleError"
      />
      <UserStats :user="userWithGrade" :results="results" />
      <ProfileActions />
    </div>
  </div>
</template>

<script setup lang="ts">
import pb from '@/services/pocketbase';

useSeoMeta({
  title: 'Cyber Awareness',
});

interface Grade {
  id: string;
  name: string;
  min_points: number;
}

interface QuizResult {
  id: string;
  user: string;
  quiz: string;
  score: number;
  created: string;
  expand?: {
    quiz: {
      id: string;
      title: string;
    };
  };
}

interface User {
  id: string;
  username: string;
  name?: string;
  email: string;
  created: string;
  total_points?: number;
  avatar?: string;
  expand?: {
    current_grade?: Grade;
  };
}

const router = useRouter();
const loading = ref(true);
const error = ref<string>('');
const user = ref<User>({
  id: '',
  username: '',
  email: '',
  created: '',
  total_points: 0,
});

const userWithGrade = computed(() => ({
  ...user.value,
  total_points: user.value.total_points ?? 0,
}));
const results = ref<QuizResult[]>([]);

const reloadData = () => {
  loading.value = true;
  error.value = '';
  loadUserData();
};

const determineGrade = async (points: number): Promise<Grade> => {
  try {
    const { items } = await pb.collection('grades').getList<Grade>(1, 50, {
      sort: '-min_points',
    });

    const currentGrade = items.find((grade) => points >= grade.min_points);
    return currentGrade || { id: 'default', name: 'Débutant', min_points: 0 };
  } catch (err) {
    console.error('Erreur lors de la récupération des grades:', err);
    return { id: 'default', name: 'Débutant', min_points: 0 };
  }
};

const loadUserData = async () => {
  try {
    const userId = pb.authStore.model?.id;
    if (!userId) throw new Error('Utilisateur non connecté');

    const userData = await pb.collection('users').getOne<User>(userId);
    const resultsData = await pb
      .collection('quiz_results')
      .getFullList<QuizResult>({
        filter: `user="${userId}"`,
        expand: 'quiz',
        sort: '-created',
      });

    const totalPoints = resultsData.reduce(
      (sum, result) => sum + (result.score || 0),
      0
    );
    const currentGrade = await determineGrade(totalPoints);

    user.value = {
      ...userData,
      total_points: totalPoints,
      expand: {
        current_grade: currentGrade,
      },
    };

    results.value = resultsData;
  } catch (err) {
    if (
      err instanceof Error &&
      err.message.includes('Failed to authenticate')
    ) {
      pb.authStore.clear();
      router.push('/login');
      return;
    }
    error.value =
      err instanceof Error ? err.message : 'Une erreur est survenue';
    console.error('Erreur lors du chargement du profil:', err);
  } finally {
    loading.value = false;
  }
};

const checkAuth = () => {
  if (!pb.authStore.isValid) {
    pb.authStore.clear();
    router.push('/login');
    return false;
  }
  return true;
};

onMounted(() => {
  if (checkAuth()) {
    loadUserData();
  }
});

const handleError = (message: string) => {
  error.value = message;
};
</script>

<style lang="scss" scoped>
.profile-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}

.loading-state {
  text-align: center;
  padding: 2rem;
  color: $text-color;

  .loader {
    border: 3px solid $hover-color;
    border-radius: 50%;
    border-top: 3px solid $accent-color;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }
}

.error-state {
  background-color: $error-color;
  color: $text-color;
  padding: 1rem;
  border-radius: $border-radius;
  text-align: center;

  .retry-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: $accent-color;
    color: $text-color;
    border: none;
    border-radius: $border-radius;
    cursor: pointer;

    &:hover {
      background-color: darken($accent-color, 10%);
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
