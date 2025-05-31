<template>
  <div>
    <UserSelect
      v-if="users.length"
      :init-selected="users"
      @submit-selected="serverUsersEdit"
    ></UserSelect>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/entities'
import { getServerUsers } from '@/entities'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { UserSelect } from '@/widgets'
import { inviteUserToServer } from '../api'

const users = ref<User[]>([])
const route = useRoute()
const router = useRouter()

async function serverUsersEdit(invited: User[]) {
  await Promise.all(
    invited.map((user) => {
      console.log(`User invited: ${user.name}`)
      return inviteUserToServer({ serverId: route.params.id as string, userId: user.id })
    }),
  )

  router.back()
}

onMounted(async () => {
  users.value = await getServerUsers(route.params.id as string)
})
</script>
