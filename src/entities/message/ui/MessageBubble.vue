<template>
  <div class="card bg-neutral-900 p-2 flex gap-2 items-stretch">
    <div class="flex items-end">
      <UIImage class="rounded-full size-8" :src="author?.photo?.url || FALLBACK_AVATAR_SOURCE" />
    </div>
    <span class="wrap-anywhere whitespace-pre-line leading-snug">{{ message.content }}</span>
  </div>
</template>

<script setup lang="ts">
import { UIImage } from "@/shared";
import type { Message } from "../model"
import { User, useUserStore } from "@/entities/user";
import { onMounted, ref } from "vue";

const FALLBACK_AVATAR_SOURCE =
  "https://img.icons8.com/?size=100&id=ABBSjQJK83zf&format=png&color=a3a3a3"

const { message } = defineProps<{ message: Message }>()

const userStore = useUserStore()
const author = ref<User | null>(null)

onMounted(async () => {
  author.value = await userStore.getUserById(message.authorId)
  console.log(author.value)
})
</script>
