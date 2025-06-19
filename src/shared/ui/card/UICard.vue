<template>
  <article class="card flex flex-col bg-neutral-900 px-6 py-5">
    <header v-if="$slots.header">
      <slot name="header"></slot>
      <UIDevider></UIDevider>
    </header>
    <div>
      <slot></slot>
    </div>
    <footer v-if="$slots.footer">
      <UIDevider></UIDevider>
      <slot name="footer"></slot>
    </footer>
  </article>
</template>

<script setup lang="ts">
import UIDevider from "../devider/UIDevider.vue"
</script>
