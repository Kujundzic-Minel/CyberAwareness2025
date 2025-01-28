<template>
  <div>
    <h1>Choisissez un thème</h1>
    <ThemeCard v-for="theme in themes" :key="theme.slug" :theme="theme" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import pb from '@/services/pocketbase';
import ThemeCard from '@/components/ThemeCard.vue';

interface Theme {
  slug: string;
  title: string;
  description: string;
}

const themes = ref<Theme[]>([]);

onMounted(async () => {
  try {
    themes.value = await pb.collection('themes').getFullList();
  } catch (error) {
    console.error('Erreur lors du chargement des thèmes:', error);
  }
});
</script>
