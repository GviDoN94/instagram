<template>
  <div class="image-gallery-container">
    <img
      v-for="post in posts"
      :key="post.id"
      :src="`https://qpctjwkbdisulqkzzsxc.supabase.co/storage/v1/object/public/images/${post.url}`"
    />
  </div>
</template>

<script setup>
  defineProps(['posts']);
</script>

<style scoped>
  .image-gallery-container {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
  }

  img {
    margin: 5px;
    width: 200px;
  }
</style>
