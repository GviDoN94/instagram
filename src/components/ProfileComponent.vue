<template>
  <BaseContainer>
    <div class="profile-container">
      <UserBar
        username="qwetqw"
        :userInfo="{
          posts: 5,
          followers: 400,
          following: 300,
        }"
      />
      <ImageGallery
        :posts="[
          {
            id: 1,
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW1p196FdFnjs53-qod0Iv6TbQwPWf3M4yZTRbJHH9KQ&s',
          },
          {
            id: 2,
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW1p196FdFnjs53-qod0Iv6TbQwPWf3M4yZTRbJHH9KQ&s',
          },
        ]"
      />
    </div>
  </BaseContainer>
</template>

<script setup>
  import BaseContainer from '@/components/BaseContainer.vue';
  import UserBar from '@/components/UserBar.vue';
  import ImageGallery from './ImageGallery.vue';
</script>

<style scoped>
  .profile-container {
    display: flex;
    flex-direction: column;
    padding: 20px 0;
  }
</style>
