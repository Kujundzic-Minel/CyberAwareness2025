<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <div class="auth-form__group">
      <label for="login-email" class="auth-form__label">Email</label>
      <input
        id="login-email"
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
      <label for="login-password" class="auth-form__label">Mot de passe</label>
      <input
        id="login-password"
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

    <div class="auth-form__options">
      <label class="auth-form__remember">
        <input v-model="form.remember" type="checkbox" />
        Se souvenir de moi
      </label>
      <a href="#" class="auth-form__forgot">Mot de passe oublié ?</a>
    </div>

    <button type="submit" class="auth-form__submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Connexion en cours...' : 'Se connecter' }}
    </button>
  </form>
</template>

<script setup lang="ts">
const form = ref({
  email: '',
  password: '',
  remember: false,
});

const errors = ref({
  email: '',
  password: '',
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  errors.value = { email: '', password: '' };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Email invalide';
  }
  if (!form.value.password) {
    errors.value.password = 'Mot de passe requis';
  }

  if (Object.values(errors.value).some((error) => error !== '')) return;

  isSubmitting.value = true;
  try {
    // Simulation de connexion
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Connexion réussie', form.value);
  } catch {
    console.error('Erreur lors de la connexion');
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

  &__options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    color: $text-color;
    font-size: 0.9rem;
  }

  &__remember {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;

    input[type='checkbox'] {
      accent-color: $accent-color;
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  }

  &__forgot {
    color: $accent-color;
    text-decoration: none;
    transition: color 150ms ease;
    font-weight: 500;

    &:hover {
      color: darken($accent-color, 10%);
      text-decoration: underline;
    }
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
