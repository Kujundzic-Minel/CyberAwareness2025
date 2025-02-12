<script setup lang="ts">
import type { SanityDocument } from '@sanity/client';
import useSanityImage from '@/composables/useSanityImage';

useSeoMeta({
  title: 'Cyber Awareness',
});

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
    <div v-if="post" class="article-page__header">
      <div class="article-page__header-overlay" />
      <img
        v-if="post.image"
        :src="urlFor(post.image)?.width(1200).url()"
        :alt="post.title"
        class="article-page__header-image"
      />
      <h1 class="article-page__header-title">{{ post.title }}</h1>
    </div>
    <main class="article-page__main">
      <article v-if="post" class="article">
        <div class="article__content">
          <SanityContent v-bind="{ blocks: post.body }" class="article__body" />
        </div>
        <div v-if="post.categories?.length" class="article__footer">
          <div class="article__categories">
            <span class="article__categories-label">Catégories :</span>
            <div class="article__categories-list">
              <span
                v-for="(category, i) in post.categories"
                :key="i"
                class="article__category"
              >
                {{ category }}
              </span>
            </div>
          </div>
        </div>
      </article>
      <div v-else class="article-page__error">
        <h1>Post not found</h1>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.article-page {
  background-color: $primary-color;
  min-height: 100vh;

  &__header {
    position: relative;
    height: 50vh;
    min-height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    &-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba($primary-color, 0.8),
        rgba($primary-color, 0.95)
      );
      z-index: 1;
    }

    &-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(2px);
    }

    &-title {
      position: relative;
      z-index: 2;
      color: $text-color;
      font-size: 3.5rem;
      font-weight: $font-weight-bold;
      text-align: center;
      max-width: 800px;
      padding: 0 $spacing-unit * 2;
      margin: 0 auto;
      font-family: $font-family-primary;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      animation: fadeInUp 0.6s ease-out;
    }
  }

  &__main {
    max-width: $container-max-width;
    margin: -100px auto 0;
    position: relative;
    z-index: 2;
    padding: 0 $spacing-unit * 2;
  }

  &__error {
    text-align: center;
    font-family: $font-family-primary;
    color: $text-color;
    padding: $spacing-unit * 3;
  }
}

.article {
  background: $hover-color;
  border-radius: $border-radius * 2;
  padding: $spacing-unit * 4;
  box-shadow: $shadow-lg;
  animation: fadeIn 0.6s ease-out;

  &__meta {
    margin-bottom: $spacing-unit * 4;
    text-align: center;
  }

  &__categories {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-unit;
    justify-content: center;
  }

  &__category {
    background: rgba($accent-color, 0.1);
    color: $accent-color;
    padding: $spacing-unit $spacing-unit * 2;
    border-radius: $border-radius;
    font-size: 0.9rem;
    font-weight: $font-weight-medium;
    transition: $transition-base;

    &:hover {
      background: $accent-color;
      color: $primary-color;
      transform: translateY(-2px);
    }
  }

  &__content {
    max-width: 800px;
    margin: 0 auto;
    padding: $spacing-unit * 3 0;
  }

  &__body {
    line-height: 1.8;
    color: $text-color;
    font-size: 1.1rem;

    :deep(h2) {
      font-size: 2rem;
      color: $text-color;
      margin: $spacing-unit * 3 0 $spacing-unit * 2;
      font-weight: $font-weight-bold;
    }

    :deep(p) {
      margin-bottom: $spacing-unit * 2;
      opacity: 0.9;
    }

    :deep(a) {
      color: $accent-color;
      text-decoration: none;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 1px;
        background: $accent-color;
        transform: scaleX(0);
        transition: $transition-base;
      }

      &:hover:after {
        transform: scaleX(1);
      }
    }

    :deep(ul),
    :deep(ol) {
      margin: $spacing-unit * 3 0;
      padding-left: $spacing-unit * 4;

      li {
        margin-bottom: $spacing-unit * 1.5;
        position: relative;

        &::before {
          content: '→';
          color: $accent-color;
          position: absolute;
          left: -$spacing-unit * 3;
        }
      }
    }
  }

  &__footer {
    margin-top: $spacing-unit * 3;
    padding-top: $spacing-unit * 3;
    border-top: 1px solid rgba($text-color, 0.2);
  }

  &__categories {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: $spacing-unit * 2;

    &-label {
      font-family: $font-family-primary;
      font-weight: $font-weight-medium;
      color: $text-color;
      font-size: 1.1rem;
    }

    &-list {
      display: flex;
      flex-wrap: wrap;
      gap: $spacing-unit;
    }
  }

  &__category {
    background: rgba($accent-color, 0.1);
    color: $accent-color;
    padding: $spacing-unit $spacing-unit * 2;
    border-radius: $border-radius;
    font-size: 0.9rem;
    font-weight: $font-weight-medium;
    transition: $transition-base;

    &:hover {
      background: $accent-color;
      color: $primary-color;
      transform: translateY(-2px);
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: $breakpoint-md) {
  .article-page {
    &__header {
      height: 40vh;

      &-title {
        font-size: 2.5rem;
      }
    }

    &__main {
      margin-top: -80px;
    }
  }

  .article {
    padding: $spacing-unit * 2;
  }
}
</style>
