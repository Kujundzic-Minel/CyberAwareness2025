<template>
  <main class="quiz-page">
    <div class="quiz-page__header">
      <h1 class="quiz-page__title">Les Quiz Cyber Awareness</h1>
      <p class="quiz-page__subtitle">
        Testez vos connaissances en cybersécurité à travers nos différents
        thèmes
      </p>
    </div>

    <div v-if="!isAuthenticated" class="auth-required">
      <p>Vous devez être connecté pour accéder aux quiz</p>
      <NuxtLink to="/login" class="auth-link"
        >Se connecter / S'inscrire</NuxtLink
      >
    </div>

    <div v-else>
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
    </div>
  </main>
</template>

<script setup lang="ts">
import pb from '@/services/pocketbase';

useSeoMeta({
  title: 'Cyber Awareness',
});

interface Theme {
  id: string;
  slug: string;
  title: string;
  description: string;
}

const isAuthenticated = computed(() => pb.authStore.isValid);
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
  if (!isAuthenticated.value) return;

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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  &__header {
    text-align: center;
    margin-bottom: 3rem;
  }

  &__title {
    font-family: $font-family-primary;
    font-weight: $font-weight-bold;
    color: $text-color;
    margin-bottom: $spacing-unit * 4;
    font-size: 2.5rem;
    text-align: center;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -$spacing-unit;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: linear-gradient(
        90deg,
        $accent-color,
        darken($accent-color, 15%)
      );
      border-radius: $border-radius;
    }
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
    flex: 1; // Permet au contenu de prendre l'espace restant
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

.auth-required {
  text-align: center;
  padding: 2rem;
  background: darken($primary-color, 3%);
  border-radius: 8px;
  border: 1px solid $hover-color;
  margin: 2rem auto;
  max-width: 500px;

  p {
    color: $text-color;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
}

.auth-link {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: $accent-color;
  color: $text-color;
  border-radius: $border-radius;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease;

  &:hover {
    background-color: darken($accent-color, 10%);
    transform: translateY(-2px);
  }
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
