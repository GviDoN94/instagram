<script setup>
  import NavBar from '@/components/NavBar.vue';
  import { RouterView } from 'vue-router';
  import { onMounted } from 'vue';
  import { useUserStore } from './stores/users';

  const { user, getUser } = useUserStore();

  onMounted(() => {
    getUser();
  });
</script>

<template>
  <main>
    <NavBar />
    <RouterView />
  </main>
</template>

<style scoped></style>
