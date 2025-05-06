<script setup lang="ts">
import { useUserStore } from '@/entities/user'
import type { Message } from '../model'
import { DefaultThumbnail } from '@/shared'
import { computed, onMounted, ref } from 'vue'
import type { User } from '@/entities/user/@x/message'
import { useProfileStore } from '@/entities/profile'

const { message } = defineProps<{ message: Message }>()
const userStore = useUserStore()
const profileStore = useProfileStore()
const author = ref<User>()

const isOwnMessage = computed(() => profileStore.profile.id === message.authorId)

onMounted(async () => {
  if (isOwnMessage.value) author.value = profileStore.profile
  else author.value = await userStore.getUserById(message.authorId)
})
</script>

<template>
  <div class="message-card tile" :class="{ own: isOwnMessage }">
    <span class="content-text">{{ message.content }}</span>
    <DefaultThumbnail class="author-photo" :src="author?.photo?.url"></DefaultThumbnail>
    <span class="author-name">{{ author?.name }}</span>
    <span class="send-time">{{ message.createdAt?.toLocaleTimeString() }}</span>
  </div>
</template>

<style scoped>
.message-card {
  padding: var(--gap-size-m);
  max-width: 40%;
  display: grid;
  grid-template-columns: 2rem 1fr;
  grid-template-rows: 1fr 2rem;
  gap: var(--gap-size-s);
}

.message-card {
  background: var(--clr-bg);
}

.message-card {
  background: var(--clr-bg-light);
}

.content-text {
  grid-column: 1 / 4;
  font-size: var(--font-size-s);
}

.author-photo {
  grid-row: 2;
}

.author-name {
  align-self: center;
  grid-row: 2;
  color: var(--clr-fg-dark);
  font-size: var(--font-size-xs);
}

.send-time {
  align-self: end;
  grid-row: 2;
  color: var(--clr-fg-dark);
  font-size: var(--font-size-xxs);
}
</style>
