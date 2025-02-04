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
</script>

<template>
  <div v-if="homepage">
    <Hero v-if="homepage.hero" :hero="homepage.hero" />
    <HomeFeature v-if="homepage.features" :features="homepage.features" />
    <HomeTestimonial
      v-if="homepage.testimonials"
      :testimonials="homepage.testimonials"
    />
    <HomeSubscription
      v-if="homepage.subscriptions"
      :subscriptions="homepage.subscriptions"
    />
    <HomeFAQ v-if="homepage.faq" :faq="homepage.faq" />
  </div>
</template>
