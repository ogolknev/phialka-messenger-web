<template>
  <article class="card p-4 bg-neutral-900 flex flex-col">
    <header v-if="$slots.header">
      <slot name="header"></slot>
      <UIDevider></UIDevider>
    </header>
    <div>
      <slot name="default"></slot>
    </div>
    <footer v-if="$slots.footer">
      <UIDevider></UIDevider>
      <slot name="footer"></slot>
    </footer>
  </article>
</template>

<script setup lang="ts">
import UIDevider from '../devider/UIDevider.vue'
</script>
