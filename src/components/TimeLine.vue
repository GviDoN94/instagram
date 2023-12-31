<template>
  <BaseContainer>
    <div v-if="!loadingUser">
      <CardsBlock v-if="user" />
      <LogInMessage v-else />
    </div>
    <div
      v-else
      class="timeline-spinner"
    >
      <ASpin />
    </div>
  </BaseContainer>
</template>

<script setup>
  import BaseContainer from '@/components/BaseContainer.vue';
  import CardsBlock from '@/components/CardsBlock.vue';
  import LogInMessage from '@/components/LogInMessage.vue';
  import { useUserStore } from '../stores/users';
  import { storeToRefs } from 'pinia';

  const userStore = useUserStore();

  const { user, loadingUser } = storeToRefs(userStore);
</script>

<style>
  .timeline-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
  }

  .timeline-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
  }
</style>
