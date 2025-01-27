<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <div class="auth-form__group">
      <label for="reg-name" class="auth-form__label">Nom complet</label>
      <input
        id="reg-name"
        v-model="form.name"
        type="text"
        class="auth-form__input"
        required
        :class="{ 'auth-form__input--error': errors.name }"
      />
      <span v-if="errors.name" class="auth-form__error">{{ errors.name }}</span>
    </div>

    <div class="auth-form__group">
      <label for="reg-email" class="auth-form__label">Email</label>
      <input
        id="reg-email"
        v-model="form.email"
        type="email"
        class="auth-form__input"
        required
        :class="{ 'auth-form__input--error': errors.email }"
      />
      <span v-if="errors.email" class="auth-form__error">{{
        errors.email
      }}</span>
    </div>

    <div class="auth-form__group">
      <label for="reg-password" class="auth-form__label">Mot de passe</label>
      <input
        id="reg-password"
        v-model="form.password"
        type="password"
        class="auth-form__input"
        required
        :class="{ 'auth-form__input--error': errors.password }"
      />
      <span v-if="errors.password" class="auth-form__error">{{
        errors.password
      }}</span>
    </div>

    <div class="auth-form__group">
      <label for="reg-confirm-password" class="auth-form__label"
        >Confirmer le mot de passe</label
      >
      <input
        id="reg-confirm-password"
        v-model="form.confirmPassword"
        type="password"
        class="auth-form__input"
        required
        :class="{ 'auth-form__input--error': errors.confirmPassword }"
      />
      <span v-if="errors.confirmPassword" class="auth-form__error">{{
        errors.confirmPassword
      }}</span>
    </div>

    <button type="submit" class="auth-form__submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Inscription en cours...' : "S'inscrire" }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import pb from '../services/pocketbase';

const router = useRouter();

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const errors = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  errors.value = { name: '', email: '', password: '', confirmPassword: '' };

  // Validations
  if (form.value.name.length < 2) {
    errors.value.name = 'Le nom doit contenir au moins 2 caractères';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Email invalide';
    return;
  }
  if (form.value.password.length < 8) {
    errors.value.password =
      'Le mot de passe doit contenir au moins 8 caractères';
    return;
  }
  if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Les mots de passe ne correspondent pas';
    return;
  }

  isSubmitting.value = true;
  try {
    const data = {
      email: form.value.email,
      password: form.value.password,
      passwordConfirm: form.value.confirmPassword,
      name: form.value.name,
      username: form.value.email.split('@')[0],
    };

    await pb.collection('users').create(data);
    await pb
      .collection('users')
      .authWithPassword(form.value.email, form.value.password);
    router.push('/');
  } catch {
    console.error('Erreur inscription:', error);
    if (error.data?.data?.email) {
      errors.value.email = 'Cet email est déjà utilisé';
    } else if (error.data?.data?.password) {
      errors.value.password = 'Mot de passe invalide';
    } else {
      errors.value.email = "Une erreur s'est produite lors de l'inscription";
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style lang="scss" scoped>
.auth-form {
  max-width: 400px;
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
    transition: all 150ms ease;

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
