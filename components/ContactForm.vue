<template>
  <form class="contact-form" @submit.prevent="handleSubmit">
    <div class="contact-form__group">
      <label for="name" class="contact-form__label">Nom</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        class="contact-form__input"
        required
        :class="{ 'contact-form__input--error': errors.name }"
      />
      <span v-if="errors.name" class="contact-form__error">{{
        errors.name
      }}</span>
    </div>

    <div class="contact-form__group">
      <label for="email" class="contact-form__label">Email</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        class="contact-form__input"
        required
        :class="{ 'contact-form__input--error': errors.email }"
      />
      <span v-if="errors.email" class="contact-form__error">{{
        errors.email
      }}</span>
    </div>

    <div class="contact-form__group">
      <label for="subject" class="contact-form__label">Sujet</label>
      <input
        id="subject"
        v-model="form.subject"
        type="text"
        class="contact-form__input"
        required
        :class="{ 'contact-form__input--error': errors.subject }"
      />
      <span v-if="errors.subject" class="contact-form__error">{{
        errors.subject
      }}</span>
    </div>

    <div class="contact-form__group">
      <label for="message" class="contact-form__label">Message</label>
      <textarea
        id="message"
        v-model="form.message"
        class="contact-form__input contact-form__input--textarea"
        required
        rows="5"
        :class="{ 'contact-form__input--error': errors.message }"
      />
      <span v-if="errors.message" class="contact-form__error">{{
        errors.message
      }}</span>
    </div>

    <button type="submit" class="contact-form__submit">
      {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer' }}
    </button>
  </form>
</template>

<script setup lang="ts">
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const errors = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const isSubmitting = ref(false);

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const handleSubmit = async () => {
  errors.value = { name: '', email: '', subject: '', message: '' };

  if (form.value.name.length < 2) {
    errors.value.name = 'Le nom doit contenir au moins 2 caractères';
  }
  if (!validateEmail(form.value.email)) {
    errors.value.email = 'Email invalide';
  }
  if (form.value.subject.length < 3) {
    errors.value.subject = 'Le sujet doit contenir au moins 3 caractères';
  }
  if (form.value.message.length < 10) {
    errors.value.message = 'Le message doit contenir au moins 10 caractères';
  }

  if (Object.values(errors.value).some((error) => error !== '')) {
    return;
  }

  isSubmitting.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    form.value = { name: '', email: '', subject: '', message: '' };
    alert('Message envoyé avec succès!');
  } catch {
    alert("Erreur lors de l'envoi du message");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style lang="scss" scoped>
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: darken($primary-color, 3%);
  border: 1px solid $hover-color;
  border-radius: 8px;

  &__group {
    margin-bottom: 1.5rem;
  }

  &__label {
    display: block;
    margin-bottom: 0.5rem;
    color: $text-color;
    font-weight: 500;
  }

  &__input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid $hover-color;
    border-radius: 4px;
    background-color: lighten($primary-color, 5%);
    color: $text-color;
    transition: all 150ms ease;

    &:focus {
      outline: none;
      border-color: $accent-color;
      box-shadow: 0 0 0 2px rgba($accent-color, 0.1);
    }

    &--error {
      border-color: #ff4444;
    }

    &--textarea {
      resize: vertical;
      min-height: 120px;
    }
  }

  &__error {
    display: block;
    margin-top: 0.5rem;
    color: #ff4444;
    font-size: 0.875rem;
  }

  &__submit {
    width: 100%;
    padding: 1rem;
    background-color: $accent-color;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 150ms ease;

    &:hover {
      background-color: darken($accent-color, 10%);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
}
</style>
