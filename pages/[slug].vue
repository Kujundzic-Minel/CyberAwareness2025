<script setup lang="ts">
import type { SanityDocument } from '@sanity/client';
import useSanityImage from '@/composables/useSanityImage';

const { urlFor } = useSanityImage();

const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    body,
    image,
    "categories": categories[]->title 
  }
`;
const route = useRoute();
const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, {
  slug: route.params.slug,
});

useSeoMeta({
  title: `Blog | ${post.value?.title}`,
  description:
    'Retrouvez nos notes de mise à jour, nos astuces et nos conseils pour vous aider à atteindre vos objectifs.',
});
</script>

<template>
  <div class="article-page">
    <main class="article-page__main">
      <article v-if="post" class="article">
        <h1 class="article__title">{{ post.title }}</h1>
        <div class="article__content">
          <SanityContent v-bind="{ blocks: post.body }" class="article__body" />
          <div v-if="post.image" class="article__image">
            <img
              :src="urlFor(post.image)?.width(800).url()"
              :alt="post.title"
            />
          </div>
          <div class="article__categories">
            <span class="article__categories-label">Catégories :</span>
            <span
              v-for="(category, i) in post.categories"
              :key="i"
              class="article__category"
            >
              {{ category
              }}<span v-if="i < post.categories.length - 1">, </span>
            </span>
          </div>
        </div>
      </article>
      <div v-else class="article-page__error">
        <h1>Post not found</h1>
      </div>
    </main>
  </div>
</template>
