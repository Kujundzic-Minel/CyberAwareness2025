<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__section">
        <h2 class="footer__title">CyberAwareness2025</h2>
        <p class="footer__description">
          Votre plateforme de formation à la cybersécurité
        </p>
      </div>

      <div class="footer__section">
        <h3 class="footer__subtitle">Navigation rapide</h3>
        <ul class="footer__list">
          <li>
            <NuxtLink to="/" class="footer__link" @click="scrollToTop"
              >Accueil</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/profile" class="footer__link">Profile</NuxtLink>
          </li>
          <li><NuxtLink to="/moocs" class="footer__link">Moocs</NuxtLink></li>
          <li><NuxtLink to="/quizz" class="footer__link">Quizz</NuxtLink></li>
          <li>
            <NuxtLink to="/formations" class="footer__link"
              >Formations</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/about" class="footer__link">À propos</NuxtLink>
          </li>
        </ul>
      </div>

      <div class="footer__section">
        <h3 class="footer__subtitle">Contact</h3>
        <ul class="footer__list">
          <li>
            <a href="mailto:contact@cyberawareness.com" class="footer__link"
              >contact@cyberawareness.com</a
            >
          </li>
          <li>
            <a href="tel:+33123456789" class="footer__link"
              >+33 1 23 45 67 89</a
            >
          </li>
        </ul>
      </div>

      <div class="footer__section">
        <h3 class="footer__subtitle">Suivez-nous</h3>
        <div class="footer__social">
          <a href="#" class="footer__social-link" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" class="footer__social-icon">
              <path
                fill="currentColor"
                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
              />
            </svg>
          </a>
          <a href="#" class="footer__social-link" aria-label="GitHub">
            <svg viewBox="0 0 24 24" class="footer__social-icon">
              <path
                fill="currentColor"
                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <p class="footer__copyright">
        © {{ new Date().getFullYear() }} CyberAwareness2025. Tous droits
        réservés.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>

<style lang="scss" scoped>
.footer {
  background-color: darken($primary-color, 5%);
  color: $text-color;
  padding: 3rem 1rem 1rem;
  margin-top: auto;

  &__content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  &__section {
    padding: 1rem;
  }

  &__title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: $accent-color;
  }

  &__subtitle {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: lighten($text-color, 10%);
  }

  &__description {
    color: darken($text-color, 10%);
    line-height: 1.6;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
    }
  }

  &__link {
    color: $text-color;
    text-decoration: none;
    transition: color 150ms ease;

    &:hover {
      color: $accent-color;
    }
  }

  &__social {
    display: flex;
    gap: 1.5rem;
  }

  &__social-link {
    color: $text-color;
    transition: color 150ms ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: $accent-color;
    }
  }

  &__social-icon {
    width: 28px;
    height: 28px;
  }

  &__bottom {
    margin-top: 3rem;
    padding-top: 1rem;
    border-top: 1px solid $hover-color;
    text-align: center;
  }

  &__copyright {
    color: darken($text-color, 20%);
    font-size: 0.9rem;
  }

  @media screen and (max-width: 768px) {
    padding: 2rem 1rem 1rem;

    &__content {
      grid-template-columns: 1fr;
      text-align: center;
    }

    &__social {
      justify-content: center;
    }

    &__section {
      padding: 0.5rem;
    }
  }
}
</style>
