<template>
  <ACard
    hoverable
    class="card"
  >
    <template #cover>
      <img
        :alt="post.username"
        :src="`${VITE_BASE_PHOTO_URL}${post.url}`"
      />
    </template>
    <ACardMeta :title="post.username">
      <template #description>{{ post.caption }}</template>
    </ACardMeta>
  </ACard>
</template>

<script setup>
  defineProps(['post']);

  const { VITE_BASE_PHOTO_URL } = import.meta.env;
</script>

<style scoped>
  .card {
    margin-bottom: 20px;
    width: 240px;
  }
</style>
