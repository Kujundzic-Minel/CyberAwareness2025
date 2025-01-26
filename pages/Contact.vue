<template>
  <main class="contact">
    <div class="contact__header">
      <h1 class="contact__title">Contactez-nous</h1>
      <p class="contact__subtitle">
        Une question ? Un projet ? N'hésitez pas à nous contacter !
      </p>
    </div>
    <ContactForm />
    <div class="contact__info">
      <ContactCard
        v-for="card in contactCards"
        :key="card.id"
        :title="card.title"
        :content="card.content"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
interface ContactCardData {
  id: number;
  title: string;
  content: string;
}

const contactCards = ref<ContactCardData[]>([
  {
    id: 1,
    title: 'Email',
    content: 'contact@cyberawareness.com',
  },
  {
    id: 2,
    title: 'Téléphone',
    content: '+33 1 23 45 67 89',
  },
  {
    id: 3,
    title: 'Adresse',
    content: '123 Rue de la Cybersécurité, 75000, Paris, France',
  },
]);
</script>

<style lang="scss" scoped>
.contact {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  &__header {
    text-align: center;
    margin-bottom: 3rem;
  }

  &__title {
    color: $accent-color;
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  &__subtitle {
    color: $text-color;
    font-size: 1.1rem;
  }

  &__info {
    margin-top: 4rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    padding: 0 1rem;
  }
}
</style>
