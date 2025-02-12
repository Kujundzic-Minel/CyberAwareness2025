<script setup lang="ts">
interface Homepage {
  title: string;
  hero: {
    title: string;
    text: string;
    backgroundImage?: { asset: { url: string } };
    cta: { label: string; url: string }[];
    stats: {
      title: string;
      value: string;
    }[];
  };
  subscriptions: {
    title: string;
    description: string;
    price: string;
    features: string[];
    cta?: { label: string; url: string };
  }[];
  features: {
    title: string;
    text: string;
    icon?: { asset: { url: string } };
  }[];
  testimonials: {
    name: string;
    role: string;
    feedback: string;
    photo?: { asset: { url: string } };
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

const { data: homepage } = await useSanityQuery<Homepage>(groq`
*[_type == "homepage"][0]{
  title,
  hero {
    title,
    text,
    backgroundImage {
      asset -> { url }
    },
    cta[] {
      label,
      url
    },
    stats[] {
      title,
      value
    }
  },
  subscriptions[] {
    title,
    description,
    price,
    features,
    cta {
      label,
      url
    }
  },
  features[] {
    title,
    text,
    icon {
      asset -> { url }
    }
  },
  testimonials[] {
    name,
    role,
    feedback,
    photo {
      asset -> { url }
    }
  },
  faq[] {
    question,
    answer
  },
}
`);

const subscriptionsWithDisabled = computed(() => {
  if (!homepage.value?.subscriptions) return [];

  return homepage.value.subscriptions.map((sub) => ({
    ...sub,
    isDisabled: sub.title.toLowerCase().includes('basic'),
  }));
});
</script>

<template>
  <div v-if="homepage">
    <Hero v-if="homepage.hero" :hero="homepage.hero" />
    <HomeFeature v-if="homepage.features" :features="homepage.features" />
    <div class="password-tools">
      <PasswordTester />
      <GenerateurPassword />
    </div>
    <HomeTestimonial
      v-if="homepage.testimonials"
      :testimonials="homepage.testimonials"
    />
    <PromotionBar />
    <HomeSubscription
      v-if="homepage.subscriptions"
      :subscriptions="subscriptionsWithDisabled"
    />
    <HomeFAQ v-if="homepage.faq" :faq="homepage.faq" />
    <div class="about">
      <AboutStats />
      <AboutFeatures />
      <AboutContact />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.password-tools {
  display: flex;
  flex-direction: column;
  gap: $spacing-unit * 4;
  max-width: $container-max-width;
  margin: 0 auto;
  padding: $spacing-unit * 4;

  @media (max-width: $breakpoint-md) {
    padding: $spacing-unit * 2;
  }
}
</style>
