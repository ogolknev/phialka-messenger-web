<template>
  <div class="user-select tile">
    <TextInput v-model="prompt" class="user-search" placeholder="Search..."></TextInput>

    <div class="user-list">
      <UserCard
        class="user-card selected"
        v-for="user of Array.from(selectedUserMap.values())"
        :key="user.id"
        :user="user"
        @click="() => unselectUser(user)"
      ></UserCard>
      <UserCard
        class="user-card"
        v-for="user of users.filter((user) => !selectedUserMap.has(user.id))"
        :key="user.id"
        :user="user"
        @click="() => selectUser(user)"
      ></UserCard>
    </div>

    <div class="button-container">
      <DefaultButton @click="submit">Submit</DefaultButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserCard, type User } from '@/entities'
import { DefaultButton, TextInput } from '@/shared'
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { searchUsers } from '../api'
import { debounce } from 'lodash'

const users = ref<User[]>([])
const { initSelected = [] } = defineProps<{ initSelected?: User[] }>()
const selectedUserMap = reactive(new Map<User['id'], User>())
const prompt = ref<string>('')
const emit = defineEmits<{ submitSelected: [invited: User[], kicked: User[]] }>()

function selectUser(user: User) {
  selectedUserMap.set(user.id, user)
}

function unselectUser(user: User) {
  selectedUserMap.delete(user.id)
}

function submit() {
  const invited: User[] = []
  const kicked: User[] = []

  for (const user of initSelected) {
    if (!selectedUserMap.has(user.id)) {
      kicked.push(user)
    }
  }

  for (const user of selectedUserMap.values()) {
    if (!initSelected.includes(user)) {
      invited.push(user)
    }
  }

  emit('submitSelected', invited, kicked)
}

const searching = ref(false)
let searchingAbortController: AbortController | undefined
async function search(prompt: string) {
  if (!prompt.trim()) {
    users.value = []
    return
  }
  if (searchingAbortController) {
    searchingAbortController.abort()
  }
  searching.value = true

  try {
    searchingAbortController = new AbortController()
    users.value = await searchUsers(prompt, { signal: searchingAbortController.signal })
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === 'AbortError') console.info('User search aborted')
    }
  } finally {
    searching.value = false
  }
}

const debouncedSearch = debounce(search, 300)

watch(prompt, () => {
  debouncedSearch(prompt.value)
})

onMounted(() => {
  initSelected.forEach((user) => selectedUserMap.set(user.id, user))
})

onBeforeUnmount(() => {
  debouncedSearch.cancel()
})
</script>

<style scoped>
.user-search {
  margin-bottom: var(--gap-size-m);
}

.user-select {
  padding: var(--gap-size-m);
  max-height: 60%;
  overflow: hidden;
  display: flex;
  flex-flow: column;
}

.user-list {
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap-size-xs);
  overflow-y: auto;
  margin-bottom: var(--gap-size-m);
}

.user-card {
  cursor: pointer;
}

.user-card.selected {
  border-color: var(--clr-accent);
  color: var(--clr-accent);
}
</style>
