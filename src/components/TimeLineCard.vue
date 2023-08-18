<script setup>
  defineProps(['post']);
</script>

<template>
  <ACard
    hoverable
    class="card"
  >
    <template #cover>
      <img
        :alt="post.username"
        :src="post.url"
      />
    </template>
    <ACardMeta :title="post.username">
      <template #description>{{ post.caption }}</template>
    </ACardMeta>
  </ACard>
</template>

<style scoped>
  .card {
    margin-bottom: 20px;
    width: 240px;
  }
</style>
