<script setup lang="ts">
import pb from '@/services/pocketbase';

useSeoMeta({
  title: 'Cyber Awareness',
});

const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 3;

interface Formation {
  id: string;
  collectionId: string;
  title: string;
  description: string;
  address: string;
  picture: string;
  mail: string;
  phone_number: string;
  certification: boolean;
  duration: number;
  web_link: string;
}

const {
  data: formations,
  pending,
  error,
} = useAsyncData<Formation[]>('formations', async () => {
  try {
    const records = await pb.collection('formations').getList(1, 50);
    return records.items.map((record) => ({
      id: record.id,
      collectionId: record.collectionId,
      title: record.title,
      description: record.description,
      address: record.address,
      picture: record.picture,
      mail: record.mail,
      phone_number: record.phone_number,
      certification: record.certification,
      duration: record.duration,
      web_link: record.web_link,
    }));
  } catch (err) {
    console.error('Erreur lors de la récupération des formations:', err);
    return [];
  }
});

const filteredFormations = computed(() => {
  if (!formations.value) return [];
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return formations.value;

  return formations.value.filter(
    (formation) =>
      formation.title.toLowerCase().includes(query) ||
      formation.description.toLowerCase().includes(query)
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredFormations.value.length / itemsPerPage)
);

const paginatedFormations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredFormations.value.slice(start, start + itemsPerPage);
});

const _onPageClick = (i: number) => {
  currentPage.value = i;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <div class="formations-page">
    <div class="formations-page__header">
      <h1 class="formations-page__title">Les Formations Cyber Awareness</h1>
      <p class="formations-page__subtitle">
        Découvrez nos formations en cybersécurité
      </p>
    </div>

    <div class="formations-page__search">
      <SearchBar
        v-model="searchQuery"
        placeholder="Rechercher une formation..."
        :result-count="filteredFormations.length"
      />
    </div>

    <div class="formations-grid">
      <p v-if="pending" class="formations-message">Chargement...</p>
      <p v-else-if="error" class="formations-message formations-message--error">
        Une erreur s'est produite
      </p>
      <ClientOnly>
        <FormationCard
          v-for="formation in paginatedFormations"
          :key="formation.id"
          :formation="formation"
        />
      </ClientOnly>
    </div>

    <Pagination v-model:current-page="currentPage" :total-pages="totalPages" />
  </div>
</template>

<style lang="scss" scoped>
.formations-page {
  max-width: $container-max-width;
  margin: 0 auto;
  padding: $spacing-unit * 4;

  &__header {
    text-align: center;
    margin-bottom: $spacing-unit * 4;
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
  }

  &__search {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
  }

  @media (max-width: $breakpoint-lg) {
    padding: $spacing-unit * 3;

    &__title {
      font-size: 2rem;
    }
  }

  @media (max-width: $breakpoint-md) {
    padding: $spacing-unit * 2;

    &__title {
      font-size: 1.75rem;
      margin-bottom: $spacing-unit * 3;
    }
  }

  @media (max-width: $breakpoint-sm) {
    padding: $spacing-unit;

    &__title {
      font-size: 1.5rem;
    }
  }
}

.formations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: $spacing-unit * 3;
  margin-bottom: $spacing-unit * 4;
}

.formations-message {
  grid-column: 1 / -1;
  text-align: center;
  padding: $spacing-unit * 2;
  color: $text-color;

  &--error {
    color: $error-color;
  }
}
</style>
