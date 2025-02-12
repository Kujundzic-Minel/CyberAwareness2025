<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <div class="legal">
    <h1 class="legal__title">Mentions Légales</h1>

    <section class="legal__section">
      <h2 class="legal__section-title">Présentation du projet</h2>
      <p>
        Ce site web a été développé dans le cadre d'un projet étudiant du
        département MMI (Métiers du Multimédia et de l'Internet) de l'IUT.
      </p>
      <p>
        Il s'agit d'un projet pédagogique réalisé à des fins d'apprentissage.
      </p>
    </section>

    <section class="legal__section">
      <h2 class="legal__section-title">Responsable du projet</h2>
      <p>Minel KUJUNDZIC</p>
      <p>Département MMI - Métiers du Multimédia et de l'Internet</p>
      <p>IUT - Université Nord Franche-Comté</p>
    </section>

    <section class="legal__section">
      <h2 class="legal__section-title">Hébergement</h2>
      <p>Ce site est hébergé par :</p>
      <p>Pulseheberg</p>
      <p>9 BOULEVARD DE STRASBOURG, 83000 TOULON</p>
    </section>

    <section class="legal__section">
      <h2 class="legal__section-title">Propriété intellectuelle</h2>
      <p>
        L'ensemble du contenu de ce site est protégé par le droit d'auteur.
        Toute reproduction, même partielle, est interdite sans autorisation
        préalable.
      </p>
    </section>

    <section class="legal__section">
      <h2 class="legal__section-title">Protection des données personnelles</h2>
      <p>
        Conformément au Règlement Général sur la Protection des Données (RGPD),
        aucune information personnelle n'est collectée à votre insu.
      </p>
      <p>
        Vous disposez d'un droit d'accès, de rectification et de suppression de
        vos données personnelles. Pour exercer ces droits, veuillez nous
        contacter.
      </p>
    </section>

    <section class="legal__section">
      <h2 class="legal__section-title">Cookies</h2>
      <p>
        Ce site n'utilise pas de cookies de traçage. Seuls des cookies
        techniques essentiels au fonctionnement du site peuvent être utilisés.
      </p>
    </section>

    <footer class="legal__footer">
      <p>© {{ currentYear }} - Projet étudiant MMI - Tous droits réservés</p>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.legal {
  max-width: $container-max-width;
  margin: 0 auto;
  padding: $spacing-unit * 4;
  font-family: $font-family-primary;
  color: $text-color;

  &__title {
    font-size: 2rem;
    margin-bottom: $spacing-unit * 4;
    font-weight: $font-weight-bold;
    color: $text-color;
  }

  &__section {
    margin-bottom: $spacing-unit * 4;

    &-title {
      font-size: 1.5rem;
      color: $text-color;
      margin-bottom: $spacing-unit * 2;
      font-weight: $font-weight-semibold;
    }

    p {
      margin-bottom: $spacing-unit;
      line-height: 1.6;
      font-weight: $font-weight-regular;
    }
  }

  &__footer {
    margin-top: $spacing-unit * 6;
    padding-top: $spacing-unit * 2;
    border-top: 1px solid $border-color;
    text-align: center;
    font-size: 0.9rem;
    color: $text-color;
  }

  @media (max-width: $breakpoint-md) {
    padding: $spacing-unit * 2;

    &__title {
      font-size: 1.75rem;
    }

    &__section-title {
      font-size: 1.25rem;
    }
  }
}
</style>
