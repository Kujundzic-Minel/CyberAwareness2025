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
const postsPerPage = 3;

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

<style lang="scss" scoped>
.posts-page {
  padding: $spacing-unit * 4;
  background-color: $primary-color;
  min-height: 100vh;

  &__main {
    max-width: $container-max-width;
    margin: 0 auto;
  }
}

.categories {
  margin-bottom: $spacing-unit * 4;

  &__title {
    font-family: $font-family-primary;
    font-weight: $font-weight-semibold;
    text-align: center;
    margin-bottom: $spacing-unit * 3;
    font-size: 2.5rem;
    color: $text-color;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $spacing-unit * 1.5;
  }

  &__button {
    padding: $spacing-unit $spacing-unit * 2;
    background: $hover-color;
    border: 1px solid rgba($text-color, 0.1);
    border-radius: $border-radius;
    font-family: $font-family-primary;
    font-weight: $font-weight-medium;
    color: $text-color;
    transition: $transition-base;
    cursor: pointer;

    &:hover {
      background: $accent-color;
      color: $primary-color;
      transform: translateY(-2px);
    }

    &--active {
      background: $accent-color;
      color: $primary-color;
      border-color: $accent-color;
    }
  }
}

.posts {
  &__title {
    @extend .categories__title;
  }

  &__grid {
    display: grid;
    gap: $spacing-unit * 3;
    padding: $spacing-unit * 2;

    @media (min-width: $breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__empty {
    text-align: center;
    font-family: $font-family-primary;
    color: $text-color;
    font-size: 1.2rem;
    padding: $spacing-unit * 3;
  }
}

.post-card {
  background: $hover-color;
  border-radius: $border-radius;
  overflow: hidden;
  box-shadow: $shadow-lg;
  border: 1px solid rgba($text-color, 0.05);
  transition: $transition-transform;

  &:hover {
    transform: translateY(-5px);
  }

  &__link {
    text-decoration: none;
    color: inherit;
    display: block;
    padding: $spacing-unit * 2;
  }

  &__title {
    font-family: $font-family-primary;
    font-weight: $font-weight-semibold;
    font-size: 1.5rem;
    color: $text-color;
    margin-bottom: $spacing-unit * 1.5;
  }

  &__date {
    font-family: $font-family-primary;
    color: rgba($text-color, 0.7);
    font-size: 0.9rem;
    margin-bottom: $spacing-unit * 1.5;
  }

  &__categories {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-unit;
    margin-bottom: $spacing-unit * 1.5;
  }

  &__category {
    background: rgba($accent-color, 0.1);
    padding: $spacing-unit * 0.5 $spacing-unit;
    border-radius: $border-radius;
    font-size: 0.8rem;
    color: $accent-color;
  }

  &__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: $border-radius;
  }
}

.pagination {
  margin-top: $spacing-unit * 4;
  display: flex;
  justify-content: center;
  gap: $spacing-unit;

  &__button {
    padding: $spacing-unit $spacing-unit * 1.5;
    background: $hover-color;
    border: 1px solid rgba($text-color, 0.1);
    border-radius: $border-radius;
    font-family: $font-family-primary;
    font-weight: $font-weight-medium;
    color: $text-color;
    transition: $transition-base;
    cursor: pointer;

    &:hover {
      background: $accent-color;
      color: $primary-color;
    }

    &--active {
      background: $accent-color;
      color: $primary-color;
      border-color: $accent-color;
    }
  }
}
</style>
