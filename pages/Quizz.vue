<template>
  <main class="quiz-page">
    <div class="quiz-page__header">
      <h1 class="quiz-page__title">Les Quiz Cyber Awareness</h1>
      <p class="quiz-page__subtitle">
        Testez vos connaissances en cybersécurité à travers nos différents
        thèmes
      </p>
    </div>

    <div class="quiz-page__stats">
      <div class="stat-card">
        <span class="stat-card__number">{{ themes.length }}</span>
        <span class="stat-card__label">Quiz disponibles</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__number">20+</span>
        <span class="stat-card__label">Questions par quiz</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__number">100%</span>
        <span class="stat-card__label">Gratuit</span>
      </div>
    </div>

    <div class="quiz-page__search">
      <SearchBar
        v-model="searchQuery"
        placeholder="Rechercher un quiz..."
        :result-count="filteredThemes.length"
      />
    </div>

    <div class="quiz-page__themes">
      <p v-if="searchQuery && !filteredThemes.length" class="no-results">
        Aucun quiz ne correspond à votre recherche
      </p>
      <ThemeCard
        v-for="theme in filteredThemes"
        :key="theme.slug"
        :theme="theme"
        class="quiz-page__theme-card"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import pb from '@/services/pocketbase';

interface Theme {
  id: string;
  slug: string;
  title: string;
  description: string;
}

const themes = ref<Theme[]>([]);
const searchQuery = ref('');

const filteredThemes = computed(() => {
  if (!searchQuery.value.trim()) return themes.value;
  const query = searchQuery.value.toLowerCase().trim();
  return themes.value.filter(
    (theme) =>
      theme.title.toLowerCase().includes(query) ||
      theme.description.toLowerCase().includes(query)
  );
});

onMounted(async () => {
  try {
    themes.value = await pb.collection('themes').getFullList();
  } catch (error) {
    console.error('Erreur lors du chargement des thèmes:', error);
  }
});
</script>

<style lang="scss" scoped>
.quiz-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  &__header {
    text-align: center;
    margin-bottom: 3rem;
  }

  &__title {
    font-size: 2.5rem;
    color: $accent-color;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  &__subtitle {
    font-size: 1.2rem;
    color: $text-color;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
  }

  &__stats {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }

  &__search {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
  }

  &__themes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }
}

.stat-card {
  background-color: darken($primary-color, 3%);
  padding: 1.5rem 2rem;
  border-radius: 8px;
  text-align: center;
  border: 1px solid $hover-color;
  min-width: 200px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &__number {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    color: $accent-color;
    margin-bottom: 0.5rem;
  }

  &__label {
    color: $text-color;
    font-size: 1.1rem;
  }
}

.no-results {
  grid-column: 1 / -1;
  text-align: center;
  color: $text-color;
  font-size: 1.1rem;
  padding: 2rem;
  background-color: darken($primary-color, 3%);
  border-radius: 8px;
  border: 1px solid $hover-color;
}

@media (max-width: 768px) {
  .quiz-page {
    &__title {
      font-size: 2rem;
    }

    &__subtitle {
      font-size: 1.1rem;
    }

    &__themes {
      grid-template-columns: 1fr;
    }
  }

  .stat-card {
    min-width: 150px;
    padding: 1rem;
  }
}
</style>
