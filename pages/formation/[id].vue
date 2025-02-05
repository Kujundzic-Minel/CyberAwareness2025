<script setup lang="ts">
import pb from '@/services/pocketbase';

const route = useRoute();

const { data: formation } = useAsyncData(
  `formation-${route.params.id}`,
  async () => {
    return await pb.collection('formations').getOne(route.params.id as string);
  }
);
</script>

<template>
  <div v-if="formation" class="formation-detail">
    <img :src="formation.picture" :alt="formation.title" />
    <h1>{{ formation.title }}</h1>
    <p class="description">{{ formation.description }}</p>

    <div class="formation-info">
      <p>Durée: {{ formation.duration }} an(s)</p>
      <span v-if="formation.certification" class="certification-badge"
        >Formation Certifiante</span
      >
    </div>

    <div class="contact-info">
      <h3>Informations de contact</h3>
      <p>Adresse: {{ formation.address }}</p>
      <p>Téléphone: {{ formation.phone_number }}</p>
      <p>
        Email: <a :href="`mailto:${formation.mail}`">{{ formation.mail }}</a>
      </p>
      <p>
        Site web:
        <a :href="formation.web_link" target="_blank">{{
          formation.web_link
        }}</a>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.formation-detail {
  max-width: $container-max-width;
  margin: 0 auto;
  padding: $spacing-unit * 4;

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: $border-radius;
    margin-bottom: $spacing-unit * 4;
  }

  h1 {
    font-size: 2.5rem;
    color: $text-color;
    margin-bottom: $spacing-unit * 3;
    font-weight: $font-weight-bold;
  }

  .description {
    font-size: 1.2rem;
    color: $text-color;
    line-height: 1.8;
    margin-bottom: $spacing-unit * 4;
    opacity: 0.9;
  }

  .formation-info {
    display: flex;
    gap: $spacing-unit * 2;
    align-items: center;
    margin-bottom: $spacing-unit * 4;

    p {
      color: $accent-color;
      font-size: 1.2rem;
    }
  }

  .certification-badge {
    background: rgba($success-color, 0.1);
    color: $success-color;
    padding: $spacing-unit $spacing-unit * 2;
    border-radius: $border-radius;
  }

  .contact-info {
    background: $hover-color;
    padding: $spacing-unit * 3;
    border-radius: $border-radius;

    h3 {
      color: $accent-color;
      margin-bottom: $spacing-unit * 2;
      font-size: 1.5rem;
    }

    p {
      color: $text-color;
      margin-bottom: $spacing-unit * 2;

      &:last-child {
        margin-bottom: 0;
      }
    }

    a {
      color: $accent-color;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
