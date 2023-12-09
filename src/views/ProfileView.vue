<script setup>
  import ProfileComponent from '@/components/ProfileComponent.vue';
</script>

<template>
  <main>
    <ProfileComponent :key="$route.params.username" />
  </main>
</template>
