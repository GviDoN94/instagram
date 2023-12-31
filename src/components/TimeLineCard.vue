<template>
  <ACard
    hoverable
    class="card"
  >
    <template #cover>
      <img
        :alt="post.username"
        :src="`https://qpctjwkbdisulqkzzsxc.supabase.co/storage/v1/object/public/images/${post.url}`"
      />
    </template>
    <ACardMeta :title="post.username">
      <template #description>{{ post.caption }}</template>
    </ACardMeta>
  </ACard>
</template>

<script setup>
  defineProps(['post']);
</script>

<style scoped>
  .card {
    margin-bottom: 20px;
    width: 240px;
  }
</style>
