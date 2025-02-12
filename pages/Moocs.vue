<template>
  <div class="moocs">
    <h1 class="moocs__title">MOOCs</h1>

    <div v-if="!isAuthenticated" class="auth-required">
      <p>Vous devez être connecté pour accéder aux MOOCs</p>
      <NuxtLink to="/login" class="auth-link"
        >Se connecter / S'inscrire</NuxtLink
      >
    </div>

    <div v-else>
      <div v-if="videos.length" class="moocs__content">
        <div
          v-for="video in videos"
          :key="video.id"
          class="moocs__video-container"
        >
          <h2 class="moocs__video-title">{{ video.title }}</h2>
          <iframe
            class="moocs__video-frame"
            :src="formatYoutubeUrl(video.video_link)"
            frameborder="0"
            allowfullscreen
          />
        </div>
      </div>
      <div v-else>
        <p class="moocs__empty-message">Aucune vidéo disponible.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import pb from '@/services/pocketbase';

useSeoMeta({
  title: 'Cyber Awareness',
});

const isAuthenticated = computed(() => pb.authStore.isValid);
const videos = ref([]);

onMounted(async () => {
  if (!isAuthenticated.value) return;

  try {
    const records = await pb.collection('moocs').getFullList();
    videos.value = records;
  } catch (error) {
    console.error('Erreur lors de la récupération des vidéos :', error);
  }
});

const formatYoutubeUrl = (url) => {
  if (!url) return '';
  const videoId = new URL(url).searchParams.get('v');
  return `https://www.youtube.com/embed/${videoId}`;
};
</script>

<style lang="scss" scoped>
.moocs {
  max-width: $container-max-width;
  margin: 0 auto;
  padding: $spacing-unit * 4;
  min-height: 100vh;

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

  &__content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 450px), 1fr));
    gap: $spacing-unit * 4;
    perspective: 1000px;
  }

  &__video-container {
    background: linear-gradient(
      145deg,
      lighten($primary-color, 3%),
      darken($primary-color, 3%)
    );
    border-radius: $border-radius * 2;
    padding: $spacing-unit * 3;
    box-shadow: $shadow-lg, inset 0 1px 1px rgba(255, 255, 255, 0.1);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);

    &:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: $shadow-lg, 0 15px 30px rgba(0, 0, 0, 0.25),
        inset 0 1px 1px rgba(255, 255, 255, 0.1);
      border-color: rgba($accent-color, 0.3);

      .moocs__video-title {
        color: $accent-color;
      }
    }
  }

  &__video-title {
    font-family: $font-family-primary;
    font-weight: $font-weight-semibold;
    color: $text-color;
    margin-bottom: $spacing-unit * 2;
    font-size: 1.25rem;
    letter-spacing: 0.5px;
    transition: $transition-base;
    padding: $spacing-unit 0;
    border-bottom: 1px solid rgba($text-color, 0.1);
  }

  &__video-frame {
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: $border-radius;
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: $transition-base;

    &:hover {
      transform: scale(1.01);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }
  }

  &__empty-message {
    color: $text-color;
    font-family: $font-family-primary;
    text-align: center;
    padding: $spacing-unit * 8;
    font-size: 1.2rem;
    background: linear-gradient(
      145deg,
      lighten($primary-color, 2%),
      darken($primary-color, 2%)
    );
    border-radius: $border-radius;
    box-shadow: $shadow-md;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  @media (max-width: $breakpoint-lg) {
    padding: $spacing-unit * 3;

    &__title {
      font-size: 2rem;
    }
  }

  @media (max-width: $breakpoint-md) {
    padding: $spacing-unit * 2;

    &__content {
      gap: $spacing-unit * 3;
    }

    &__video-container {
      padding: $spacing-unit * 2;
    }

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

    &__video-container {
      padding: $spacing-unit;
    }
  }
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
</style>
