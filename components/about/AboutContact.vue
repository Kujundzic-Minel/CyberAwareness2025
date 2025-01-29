<script setup lang="ts"></script>

<template>
  <section class="contact">
    <div class="contact__content">
      <h2 class="contact__title">Contactez-nous</h2>
      <p class="contact__text">
        Vous souhaitez en savoir plus sur nos services ? N'hésitez pas à nous
        contacter.
      </p>
      <button class="contact__button">Nous contacter</button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.contact {
  background: linear-gradient(135deg, $hover-color 0%, $primary-color 100%);
  border-radius: $border-radius;
  padding: $spacing-unit * 6 $spacing-unit * 3;
  margin: $spacing-unit * 6 0;

  &__content {
    text-align: center;
    color: $text-color;
    max-width: 600px;
    margin: 0 auto;
  }

  &__title {
    font-size: 2.5rem;
    margin-bottom: $spacing-unit * 2;
  }

  &__text {
    font-size: 1.1rem;
    margin-bottom: $spacing-unit * 3;
    line-height: 1.6;
  }

  &__button {
    background: $accent-color;
    color: $primary-color;
    border: none;
    padding: $spacing-unit * 1.5 $spacing-unit * 3;
    font-size: 1.1rem;
    border-radius: $border-radius;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: darken($accent-color, 10%);
      transform: translateY(-2px);
    }
  }
}
</style>
