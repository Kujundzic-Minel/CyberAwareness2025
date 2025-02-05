<script setup lang="ts">
interface Formation {
  id: string;
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

defineProps<{
  formation: Formation;
}>();

const truncateDescription = (text: string, length: number) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};
</script>

<template>
  <NuxtLink :to="`/formation/${formation.id}`" class="formation-card">
    <div>
      <img :src="formation.picture" :alt="formation.title" />
      <h3>{{ formation.title }}</h3>
      <p>{{ truncateDescription(formation.description, 150) }}</p>
      <div class="formation-details">
        <p>Durée: {{ formation.duration }} an(s)</p>
        <span v-if="formation.certification" class="certification-badge"
          >Certifiante</span
        >
      </div>
      <div class="formation-contact">
        <p>{{ formation.address }}</p>
        <p>{{ formation.phone_number }}</p>
        <a :href="`mailto:${formation.mail}`">{{ formation.mail }}</a>
        <a :href="formation.web_link" target="_blank">Site web</a>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.formation-card {
  background-color: $primary-color;
  border-radius: $border-radius;
  padding: $spacing-unit * 3;
  transition: $transition-base;
  border: 1px solid $hover-color;
  text-decoration: none;
  display: block;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-lg;
    border-color: $accent-color;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: $border-radius;
    margin-bottom: $spacing-unit * 2;
  }

  h3 {
    color: $text-color;
    font-size: 1.5rem;
    margin-bottom: $spacing-unit * 2;
    font-weight: $font-weight-semibold;
    text-align: justify;
  }

  p {
    color: $text-color;
    opacity: 0.8;
    margin-bottom: $spacing-unit * 2;
    line-height: 1.6;
    text-align: justify;
  }

  .formation-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-unit * 2;

    p {
      margin: 0;
      color: $accent-color;
      text-align: justify;
    }
  }

  .certification-badge {
    background: rgba($success-color, 0.1);
    color: $success-color;
    padding: $spacing-unit $spacing-unit * 2;
    border-radius: $border-radius;
    font-size: 0.9rem;
  }

  .formation-contact {
    border-top: 1px solid $hover-color;
    padding-top: $spacing-unit * 2;
    display: flex;
    flex-direction: column;
    gap: $spacing-unit;

    p,
    a {
      color: $text-color;
      opacity: 0.8;
      font-size: 0.9rem;
      text-decoration: none;
      text-align: justify;
    }

    a:hover {
      color: $accent-color;
      opacity: 1;
    }
  }
}
</style>
