<template>
  <div class="profile-header">
    <div class="avatar-section">
      <img :src="userAvatar" :alt="user?.username" class="user-avatar" />
      <input
        id="avatar-input"
        type="file"
        accept="image/*"
        class="hidden-input"
        @change="(event) => updateAvatar(event as FileInputEvent)"
      />
      <label for="avatar-input" class="update-avatar-btn">
        Modifier la photo de profil
      </label>
    </div>

    <div class="user-info">
      <h1>{{ user?.name || user?.username }}</h1>
      <p v-if="user?.name" class="username">@{{ user?.username }}</p>
      <p class="email">{{ user?.email }}</p>
      <p class="member-since">
        Membre depuis: {{ formatDate(user?.created || '') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import pb from '@/services/pocketbase';

const props = defineProps<{
  user: {
    id: string;
    username: string;
    name?: string;
    email: string;
    created: string;
    avatar?: string;
  };
}>();

const userAvatar = computed(() => {
  if (!props.user?.avatar) {
    return 'https://via.placeholder.com/150';
  }
  return pb.files.getUrl(props.user, props.user.avatar);
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

interface FileInputEvent extends Event {
  target: HTMLInputElement;
}

const updateAvatar = async (event: FileInputEvent) => {
  if (!event.target.files?.length) return;

  try {
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);

    const userId = pb.authStore.model?.id;
    if (!userId) throw new Error('Utilisateur non connecté');

    await pb.collection('users').update(userId, formData);
    emit('avatar-updated');
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'avatar:", err);
    emit('error', "Erreur lors de la mise à jour de l'avatar");
  }
};

const emit = defineEmits(['avatar-updated', 'error']);
</script>

<style lang="scss" scoped>
.profile-header {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: $primary-color;
  border-radius: $border-radius;
  box-shadow: 0 2px 4px $shadow-color;
}

.avatar-section {
  text-align: center;

  .user-avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
    border: 3px solid $accent-color;
  }

  .update-avatar-btn {
    padding: 0.5rem 1rem;
    background-color: $accent-color;
    color: white;
    border: none;
    border-radius: $border-radius;
    cursor: pointer;

    &:hover {
      background-color: darken($accent-color, 10%);
    }
  }
}

.user-info {
  h1 {
    margin: 0 0 0.5rem;
    color: $text-color;
    font-size: 2em;
  }

  .username {
    color: $accent-color;
    margin-bottom: 0.5rem;
    font-size: 1.1em;
  }

  .email {
    color: $text-color;
    margin-bottom: 0.5rem;
    opacity: 0.8;
  }

  .member-since {
    font-size: 0.9rem;
    color: $text-color;
    opacity: 0.6;
  }
}

.hidden-input {
  display: none;
}

@media (max-width: 768px) {
  .profile-header {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .avatar-section {
    margin: 0 auto;
  }
}
</style>
