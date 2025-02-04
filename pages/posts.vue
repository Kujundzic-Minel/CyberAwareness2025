<script setup lang="ts">
import type { SanityDocument } from '@sanity/client';

import useSanityImage from '@/composables/useSanityImage';
const { urlFor } = useSanityImage();

useSeoMeta({
  title: 'Blog | Habit tracker',
  description:
    'Retrouvez nos notes de mise à jour, nos astuces et nos conseils pour vous aider à atteindre vos objectifs.',
});

const selectCategory = ref('');

const onCategoryClick = (categorySlug: string) => {
  if (selectCategory.value === categorySlug) {
    selectCategory.value = '';
  } else {
    selectCategory.value = categorySlug;
  }
  page.value = 1;
};

function onPageClick(i: number) {
  page.value = i;
}

const page = ref(1);
const postsPerPage = 2;

const startPost = computed(() => (page.value - 1) * postsPerPage);
const endPost = computed(() => page.value * postsPerPage);

const { data: categories } = await useSanityQuery<
  SanityDocument[]
>(groq`*[_type == "category"]{
  title,
  slug
}`);

const { data: posts } = await useSanityQuery<SanityDocument[]>(
  groq`*[
  _type == "post"
  && defined(slug.current)
  && ($selectCategory == '' || $selectCategory in (categories[] -> slug.current))
]|order(publishedAt desc)[$startPost...$endPost]{_id, title, slug, publishedAt, image, "categories": categories[]->{title, slug}}`,
  { selectCategory, startPost: startPost, endPost: endPost }
);

const { data: totalPosts } = await useSanityQuery<number>(
  groq`
  count(*[_type == "post" && defined(slug.current)
  && ($selectCategory == '' || $selectCategory in (categories[] -> slug.current))]
  )`,
  { selectCategory }
);

const totalPages = computed(() => {
  console.log(totalPosts);
  return totalPosts?.value ? Math.ceil(totalPosts.value / postsPerPage) : 0;
});
</script>

<template>
  <div class="posts-page">
    <main class="posts-page__main">
      <section class="posts-page__categories categories">
        <h1 class="categories__title">Categories</h1>
        <div class="categories__list">
          <button
            v-for="category in categories"
            :key="category.slug.current"
            :class="[
              'categories__button',
              {
                'categories__button--active':
                  selectCategory === category.slug.current,
              },
            ]"
            @click="onCategoryClick(category.slug.current)"
          >
            {{ category.title }}
          </button>
        </div>
      </section>

      <section class="posts-page__content posts">
        <h1 class="posts__title">Posts</h1>
        <div v-if="posts && posts.length" class="posts__grid">
          <article
            v-for="post in posts"
            :key="post._id"
            class="posts__item post-card"
          >
            <NuxtLink :to="`/${post.slug.current}`" class="post-card__link">
              <h2 class="post-card__title">{{ post.title }}</h2>
              <p class="post-card__date">
                {{ new Date(post.publishedAt).toLocaleDateString() }}
              </p>
              <div v-if="post.categories?.length" class="post-card__categories">
                <span
                  v-for="category in post.categories"
                  :key="category.slug.current"
                  class="post-card__category"
                >
                  {{ category.title }}
                </span>
              </div>
              <img
                v-if="post.image"
                :src="urlFor(post.image)?.width(200).height(200).url()"
                alt="Post Image"
                class="post-card__image"
              />
            </NuxtLink>
          </article>
        </div>
        <div v-else class="posts__empty">
          <p>No posts found</p>
        </div>
      </section>

      <nav class="posts-page__pagination pagination">
        <button
          v-for="i in totalPages"
          :key="i"
          :class="[
            'pagination__button',
            { 'pagination__button--active': page === i },
          ]"
          @click="onPageClick(i)"
        >
          {{ i }}
        </button>
      </nav>
    </main>
  </div>
</template>
