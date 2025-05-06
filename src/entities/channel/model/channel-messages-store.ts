import type { Message } from '@/entities/message/@x/channel'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { getChannelMessages } from '../api'

export const useChannelMessagesStore = defineStore('channel-messages', () => {
  const messagesMap = reactive<{ [channelId: string]: Map<string, Message> }>({})
  const LOAD_COUNT = 30

  const messages = computed(() => {
    const result: Record<string, Message[]> = {}
    for (const channelId in messagesMap) {
      result[channelId] = getSortedMessages(channelId)
    }
    return result
  })

  const lastMessages = computed(() => {
    const result: Record<string, Message> = {}
    for (const channelId in messages) {
      result[channelId] = messages.value[channelId]?.slice(-1)[0]
    }
    return result
  })

  function resetMessages() {
    for (const channelId in messagesMap) {
      delete messagesMap[channelId]
    }
  }

  const isLoadMessagesRunning = reactive<{ [channelId: string]: boolean }>({})
  async function loadMessages(channelId: string) {
    if (isLoadMessagesRunning[channelId]) return
    isLoadMessagesRunning[channelId] = true

    try {
      const response = await getChannelMessages({
        channelId,
        pagination: { count: LOAD_COUNT },
      })

      messagesMap[channelId] = new Map()
      insertMessages(channelId, response)
    } finally {
      isLoadMessagesRunning[channelId] = false
    }
  }

  const isLoadOldMessagesRunning = reactive<{ [channelId: string]: boolean }>({})
  async function loadOldMessages(channelId: string) {
    if (isLoadOldMessagesRunning[channelId]) return
    isLoadOldMessagesRunning[channelId] = true

    try {
      const sorted = getSortedMessages(channelId)
      if (!sorted.length) return

      const sequence = Math.max(sorted[0].sequence - LOAD_COUNT, 0)
      const count = sorted[0].sequence - sequence
      if (!count) return
      const receivedMessages = await getChannelMessages({
        channelId,
        pagination: { sequence, count },
      })

      insertMessages(channelId, receivedMessages)
    } finally {
      isLoadOldMessagesRunning[channelId] = false
    }
  }

  const isLoadNewMessagesRunning = reactive<{ [channelId: string]: boolean }>({})
  async function loadNewMessages(channelId: string) {
    if (isLoadNewMessagesRunning[channelId]) return
    isLoadNewMessagesRunning[channelId] = true

    try {
      const sorted = getSortedMessages(channelId)
      if (!sorted) return

      const lastMessage = sorted.slice(-1)[0]
      const sequence = lastMessage ? lastMessage.sequence + 1 : undefined
      const count = LOAD_COUNT
      const receivedMessages = await getChannelMessages({
        channelId,
        pagination: { sequence, count },
      })

      insertMessages(channelId, receivedMessages)
      return receivedMessages.length
    } finally {
      isLoadNewMessagesRunning[channelId] = false
    }
  }

  function insertMessages(channelId: string, incoming: Message[]) {
    ensureMap(channelId)
    const map = messagesMap[channelId]
    for (const msg of incoming) {
      if (!map.has(msg.id)) {
        map.set(msg.id, msg)
      }
    }
  }

  function ensureMap(channelId: string) {
    if (!messagesMap[channelId]) {
      messagesMap[channelId] = new Map<string, Message>()
    }
  }

  function getSortedMessages(channelId: string) {
    const map = messagesMap[channelId]
    return map ? Array.from(map.values()).sort((a, b) => a.sequence - b.sequence) : []
  }

  return {
    messages,
    lastMessages,
    isLoadMessagesRunning,
    isLoadOldMessagesRunning,
    isLoadNewMessagesRunning,
    resetMessages,
    loadMessages,
    loadOldMessages,
    loadNewMessages,
  }
})
